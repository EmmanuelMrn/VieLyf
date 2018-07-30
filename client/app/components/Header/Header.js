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
      isActive: false,
    };

  }

  componentDidMount() {
    if (localStorage.hasOwnProperty('the_main_app')) {
      this.setState({isActive: true}, function() {
      })
    }
  }

  render() {
    const {
      isActive,
    } = this.state;
    if (isActive) {
      return (
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="javascript:void(0)">VieLyf</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navb">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                <Link to="/nutritionalBlog" className="text-white">Nutritional Blog</Link>
                  {/* <a className="nav-link">Nutritional Blog</a> */}
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                <button className="btn btn-success my-2 my-sm-0" type="button">Search</button>
              </form>
              <ul>
              <li  class="nav-item dropdown">
                <a style={{padding: '0rem 0rem', color: '#fff'}} class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                <i className='fa fa-user-circle-o'></i>
                  Account
                </a>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">Sign Out</a>
                  <a class="dropdown-item" href="#">My Profile</a>
                  <a class="dropdown-item" href="#">Contact Us</a>
                </div>
              </li>
              </ul>
            </div>
          </nav>

        </header>
      )
    } else {

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
}

export default Header;
