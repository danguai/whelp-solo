import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Route, Switch, useLocation, useParams } from 'react-router-dom';

import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";

import Navigation from "./components/Navigation";
import NavigationRed from "./components/Navigation/NavBar-Red";
import NavigationLitter from "./components/Navigation/NavBar-Litter";

import Footer from "./components/Footer";

import Splashpage from "./components/Splashpage";

import LitterForm from "./components/LitterForm";
import EditLitterForm from "./components/LitterForm/EditLitterForm";
import LitterPage from "./components/LitterPage";
// import Litters from "./components/Litters";

import PuppyForm from "./components/PuppyForm";
import EditPuppyForm from "./components/PuppyForm/EditPuppyForm";
import AddImageForm from "./components/PuppyForm/AddImages";
import EditImageForm from "./components/PuppyForm/EditImage";
import PuppyPage from "./components/PuppyPage";
// import Puppies from "./components/Puppies";

import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  const litter = useSelector(state => state.litter?.litter);

  // console.log('LITTER APP', litter);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  let navBar;

  const path = location.pathname;

  if (path === '/login' || path === '/signup') {
    navBar = (<NavigationRed isLoaded={isLoaded} />)
  } else if (path == '/') {
    navBar = (<Navigation isLoaded={isLoaded} />)
  } else {
    navBar = (<NavigationLitter isLoaded={isLoaded} />)
  }

  return (
    <>
      {navBar}
      <Footer isLoaded={isLoaded} />
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
          {/* <Route exact path='/litters'>
            <Litters />
          </Route> */}
          <Route exact path='/litter/:litterId'>
            <LitterPage />
          </Route>
          <Route exact path='/litter/:litterId/new-puppy'>
            <PuppyForm />
          </Route>
          <Route exact path='/litter/:litterId/puppies/:puppyId'>
            <PuppyPage />
          </Route>
          <Route exact path='/litter/:litterId/puppies/:puppyId/puppy-edit'>
            <EditPuppyForm />
          </Route>
          <Route exact path='/litter/:litterId/puppies/:puppyId/add-image'>
            <AddImageForm />
          </Route>
          <Route exact path='/litter/:litterId/puppies/:puppyId/images/:imageId/edit-image'>
            <EditImageForm />
          </Route>
        </Switch>
      )}
    </>
  )
}

export default App;
