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

import HelloWorld from './components/HelloWorld/HelloWorld';
import CorporalAnalysis from './components/CorporalAnalysis/CorporalAnalysis';

import './styles/styles.scss';
import ChartsPage from './components/App/ChartsPage/ChartsPage';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/helloworld" component={HelloWorld}/>
        <Route path ="/corporalanalysis" component={CorporalAnalysis}/>
        <Route path="/charts" component={ChartsPage}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
