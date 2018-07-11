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
      <p>Welcome to VieLyf!</p>
    </div>);
  }
}

export default Home;
