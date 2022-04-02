import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Route, Switch, useLocation } from 'react-router-dom';

import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import NavigationRed from "./components/Navigation/NavBar-Red";
import Splashpage from "./components/Splashpage";
import Litter from "./components/Litter";


import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  // console.log('LOCATION', location);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  let navBar;

  const path = location.pathname;

  if (path === '/login' || path === '/signup') {
    // console.log('LOGIN PAGE');
    navBar = (<NavigationRed />)
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
          <Route path='/litter'>
            <Litter />
          </Route>
        </Switch>
      )}
    </>
  )
}

export default App;
