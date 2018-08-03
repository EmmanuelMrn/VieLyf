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
              <div id="wrapper1">
                <div id="sidebar-wrapper1">
                  <ul className="sidebar-nav1">
                      <li className="sidebar-brand1">
                          <a href="/vistacliente">
                              test
                          </a>
                      </li>
                      <ul style={{ listStyleType: "none", padding: 0 }}>
                    
                    <li>
                      <Link to="/agenda" onClick={ $('#menu-toggle').click() }>Agenda</Link>
                    </li>
                    </ul>
                  </ul>
                </div>
              </div>
              
              <div id="wrapper">
                <div id="sidebar-wrapper">
                  <ul className="sidebar-nav">
                      <li className="sidebar-brand">
                          <a href="/vistacliente">
                              Profile
                          </a>
                      </li>
                      <ul style={{ listStyleType: "none", padding: 0 }}>
                    
                    <li>
                      <Link to="/agenda" onClick={ $('#menu-toggle').click() }>Agenda</Link>
                    </li>
                    <li>
                      <Link id="nutri" to="/nutritionalblog" onClick={ $('#menu-toggle').click() }>Nutrirional Blog</Link>
                    </li>
                    <li>
                      <Link to="/catalogueNutriologist" onClick={ $('#menu-toggle').click() }>Nutriologist Catalogue</Link>
                    </li>
                    <li>
                      <Link to="/charts" onClick={ $('#menu-toggle').click() }>Charts</Link>
                    </li>
                    <li>
                      <Link to="/diet" onClick={ $('#menu-toggle').click() }>Diet</Link>
                    </li>
                    </ul>
                  </ul>
                </div>
              </div>
              <a href="#menu-toggle" className="btn " id="menu-toggle" 
            onClick={ function(e) {
              $(".toggle").click(function () {
                console.log("toggling sidebar");
                  $(".sidebar").toggleClass('active');
              
              });
              $(".cancel").click(function () {
                console.log("toggling visibility");
                  $(this).parent().toggleClass('gone');
              
              });
            } }><i className="fa fa-bars"></i></a>
              <div class="toggle"><div class="ico" onClick={
                    $(".sidebar").toggleClass('active')
                
                
                // $(".cancel").click(function () {
                //   console.log("toggling visibility");
                //     $(this).parent().toggleClass('gone');
                
                // });
              }>↻</div></div>
              
                <div class="sidebar">
                  <h2>Notifications</h2>
                  <div class="notibox">
                    Wash the Car
                    <div class="cancel">✕</div>
                  </div>
                  <div class="notibox">
                    Do Laundry
                    <div class="cancel">✕</div>
                  </div>
                  <div class="notibox">
                    Feed the Cat
                    <div class="cancel">✕</div>
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
{/* <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a> */}