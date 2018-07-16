import React from 'react';
import { render } from 'react-dom';
import 'moment/locale/es';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';
import Login from './components/Home/Login';
import Signup from './components/Home/Signup';
import Agenda from './components/Agenda/Agenda';
import CatalogueNutriologist from './components/Home/CatalogueNutriologist';
import NutritionalBlog from './components/Home/NutritionalBlog';
import DisponibilitySchedule from './components/Home/DisponibilitySchedule';
import Diet from './components/Diet/Diet';

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/agenda" component={Agenda}/>
        <Route path="/catalogueNutriologist" component={CatalogueNutriologist}/>
        <Route path="/nutritionalBlog" component={NutritionalBlog}/>
        <Route path="/disponibilitySchedule" component={DisponibilitySchedule}/>
        <Route path="/diet" component={Diet}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));

