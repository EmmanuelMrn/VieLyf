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
import Diet from './components/Diet/Diet';
import Charts from './components/Charts/Charts';
import Home from './components/Home/Home';
//import Cards from './components/Cards/CardExample';
import Login from './components/Home/Login';
import Signup from './components/Home/Signup';
import Agenda from './components/Agenda/Agenda';
import NotFound from './components/App/NotFound';
import NutritionalBlog from './components/Home/NutritionalBlog';
import Dieta from "./components/VistaCliente/Dieta";
import VistaCliente from './components/VistaCliente/VistaCliente';
import VistaNutriologo from './components/VistaNutriologo/VistaNutriologo';
import CatalogueNutriologist from './components/Home/CatalogueNutriologist';
import DisponibilitySchedule from './components/Home/DisponibilitySchedule';
import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/diet" component={Diet}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/agenda" component={Agenda}/>
        <Route path="/charts" component={Charts}/>
        {/* <Route path="/cards" component={Cards}/> */}
        <Route path="/vistacliente" component={VistaCliente}/>
        <Route path="/nutritionalBlog" component={NutritionalBlog}/>
        <Route path="/vistanutriologo" component={VistaNutriologo}/>
        <Route path="/catalogueNutriologist" component={CatalogueNutriologist}/>
        <Route path="/disponibilitySchedule" component={DisponibilitySchedule}/>
        <Route path="/diet" component={Diet}/>
        <Route path="/Dieta" component={Dieta} />
        <Route path ="/corporalanalysis" component={CorporalAnalysis}/>
        <Route path="/charts" component={ChartsPage}/>

        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));