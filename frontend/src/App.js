import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Route, Switch, useLocation, useParams } from 'react-router-dom';

import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";

import Navigation from "./components/Navigation";
import NavigationRed from "./components/Navigation/NavBar-Red";
import NavigationLitter from "./components/Navigation/NavBar-Litter";

import Splashpage from "./components/Splashpage";

import LitterForm from "./components/LitterForm";
import EditLitterForm from "./components/LitterForm/EditLitterForm";
import LitterPage from "./components/LitterPage";
import Litters from "./components/Litters";


import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  const litter = useSelector(state => state.litter?.litter);

  // console.log('LOCATION', location);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  let navBar;

  const path = location.pathname;

  if (path === '/login' || path === '/signup') {
    // console.log('LOGIN PAGE');
    navBar = (<NavigationRed isLoaded={isLoaded} />)
  } else if (path == `/litter/${litter?.id}`) {
    // console.log('SPLASHPAGE');
    navBar = (<NavigationLitter isLoaded={isLoaded} />)

  } else {
    // console.log('SPLASHPAGE');
    navBar = (<Navigation isLoaded={isLoaded} />)
  }

  return (
    <>
      {navBar}
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Splashpage />
          </Route>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route exact path='/litter'>
            <LitterForm />
          </Route>
          <Route exact path='/litter-edit'>
            <EditLitterForm />
          </Route>
          <Route exact path='/litters'>
            <Litters />
          </Route>
          <Route exact path='/litter/:id'>
            <LitterPage />
          </Route>
        </Switch>
      )}
    </>
  )
}

export default App;
