import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';
import Signin from './components/Home/Signin';
import Signup from './components/Home/Signup';
import CatalogueNutriologist from './components/Home/CatalogueNutriologist';
import NutritionalBlog from './components/Home/NutritionalBlog';

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/catalogueNutriologist" component={CatalogueNutriologist}/>
        <Route path="/nutritionalBlog" component={NutritionalBlog}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));

