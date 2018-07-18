// import React from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => (
//   
// );

// export default Header;

import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class Header extends Component {
  constructor() {
    super();

    this.state = {
    };

  }


  render() {
    const {

    } = this.state;
    return(
    
      <header>
           <nav className="navbar bg-dark text-white">
             <Link to="/" className="navbar-brand text-white">VieLyf</Link>      
               <Link to="/nutritionalBlog" className="text-white">Blog nutricional</Link>
               <Link to="/catalogueNutriologist" className="text-white">Catálogo de nutriólogos</Link>
             <div>
               <Link to="/signup" className="navbar-brand text-white">Sign up</Link>
               <Link to="/login" className="navbar-brand text-white">Log in</Link>
             </div>
           </nav>
         </header>
    );
  }
}

export default Header;
