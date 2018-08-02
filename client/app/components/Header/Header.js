import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
// import { link } from 'fs';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      isActive: false,
    };

    this.logout = this.logout.bind(this);

  }

  componentDidMount() {
    if (localStorage.hasOwnProperty('the_main_app')) {
      this.setState({isActive: true}, function() {
      })
    }
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
    localStorage.removeItem('the_main_app');
    localStorage.removeItem('email');
    localStorage.removeItem('Auth');
    localStorage.removeItem('Rol');
    window.location=('/login')
  }
  render() {
    const {
      isLoading,
      isActive,
    } = this.state;

    function alerta() {
      if (localStorage.getItem('Role')=="Nutriologist") {
        return (
          <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fa fa-bell fa-fw"></i>
              <span className="badge badge-danger"></span>
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
              {/* <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a> */}
            </div>
          </li>
        )
      }
    }

    if (isActive) {
      return (
        <header>
          <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
            <a className="navbar-brand mr-1" href="index.html">VieLyf</a>
            <a href="#menu-toggle" className="btn " id="menu-toggle" 
            onClick={ function(e) {
              e.preventDefault();
              $("#wrapper").toggleClass("toggled")
              } }><i className="fa fa-bars"></i></a>
              <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2"/>
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
              <ul className="navbar-nav ml-auto ml-md-0">
                {alerta()}
                <li className="nav-item dropdown no-arrow">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-user-circle fa-fw"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Logout</a>
                    <button type="button" className="btn btn-dark" onClick={this.logout}>Cerrar sesion</button>            
                  </div>
                </li>
              </ul>

              </nav>
              <div id="wrapper">

           <div id="sidebar-wrapper">
               <ul className="sidebar-nav">
                   {/* <li className="sidebar-brand">
                       <a href="#">
                           Main Menu
                       </a>
                   </li> */}
                   <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <Link onClick={ function(e) {
              e.preventDefault();
              $("#wrapper").toggleClass("toggled")
              return false;
              }  } href="/Agenda"  >Agenda</Link>
                </li>
                <li>
                  <Link to="/nutritionalblog">Nutrirional Blog</Link>
                </li>
                <li>
                  <Link to="/catalogueNutriologist">Nutriologist Catalogue</Link>
                </li>
                <li>
                  <Link to="/charts">Charts</Link>
                </li>
                <li>
                  <Link to="/diet">Diet</Link>
                </li>
                </ul>
               </ul>
           </div>
           </div>
          
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
