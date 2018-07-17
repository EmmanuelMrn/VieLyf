import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class Home extends Component {
  constructor() {
    super();

    this.state = {
    };

  }


  render() {
    const {

    } = this.state;
    return(
    <div className="container">
      <h1>Welcome to VieLyf!</h1>
      <div align="center" className="col-md-12">
        <img height='300px' width='100%' src='/assets/img/imagen2.png' alt='Imagen2'/>
      </div>
    </div>);
  }
}

export default Home;
