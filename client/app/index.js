import React from "react";
import { render } from "react-dom";
import "moment/locale/es";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import App from "./components/App/App";
import Diet from "./components/Diet/Diet";
import Charts from "./components/Charts/Charts";
import Home from "./components/Home/Home";
import Login from "./components/Home/Login";
import Signup from "./components/Home/Signup";
import Agenda from "./components/Agenda/Agenda";
import NotFound from "./components/App/NotFound";
import Transition from "./components/Diet/Transition";
import NutritionalBlog from "./components/Home/nutritionalBlog";
import VistaPrincipal from "./components/VistaPrincipal/VistaPrincipal";
import CorporalAnalysis from "./components/CorporalAnalysis/CorporalAnalysis";
import CatalogueNutriologist from "./components/Home/CatalogueNutriologist";
import DisponibilitySchedule from "./components/Home/DisponibilitySchedule";
import ResultadoBusqueda from "./components/Home/ResultadoBusqueda";
import SearchBar from "./components/Home/SearchBar";
import Profile from './components/Profile/Profile';
import AgendaClient from './components/Agenda/AgendaClient';
import UnregisteredAnalysis from './components/UnregisteredAnalysis/UnregisteredAnalysis';
import "./styles/styles.scss";

render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/diet" component={Diet} />
        <Route path="/corporalanalysis" component={CorporalAnalysis}/>
        <Route path="/signup" component={Signup} />
        <Route path="/agenda" component={Agenda} />
        <Route path="/agendaclient" component={AgendaClient} />
        <Route path="/charts" component={Charts} />
        <Route path="/transition" component={Transition} />
        <Route path="/corporalanalysis" component={CorporalAnalysis} />        
        <Route path="/vistaprincipal" component={VistaPrincipal} />

        <Route path="/nutritionalBlog" component={NutritionalBlog} />
        <Route
          path="/catalogueNutriologist"
          component={CatalogueNutriologist}
        />
        <Route
          path="/disponibilitySchedule"
          component={DisponibilitySchedule}
        />
        <Route path="/ResultadoBusqueda" component={ResultadoBusqueda} />
        <Route path="/SearchBar" component={SearchBar} />
        <Route path="/profile" component={Profile} />
        <Route path="/hiddenAnalysis" component={UnregisteredAnalysis}/>
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>,
  document.getElementById("app")
);
