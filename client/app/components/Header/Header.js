import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import moment, { min } from 'moment';
// import 'moment/locale/fr';
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
// import { link } from 'fs';

require('moment/locale/en-gb.js');
    var colors= {
      'color-1':"rgba(102, 195, 131 , 1)" ,
      "color-2":"rgba(242, 177, 52, 1)" ,
      "color-3":"rgba(235, 85, 59, 1)" ,
      "color-4":"rgba(70, 159, 213, 1)",
      "color-5":"rgba(170, 59, 123, 1)",
      "color-6":"rgb(160, 163, 167)",
    }


class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      isActive: false,
      items:[],
      notify:[], 
    };

    this.logout = this.logout.bind(this);
    this.updatethings = this.updatethings.bind(this);

  }

  componentDidMount() {
    console.log(localStorage.getItem('clientID'))
    console.log('Header')
    console.log(localStorage.getItem('AssignedNutriologist'))
    this.updatethings();
    if (localStorage.hasOwnProperty('the_main_app')) {
      this.setState({isActive: true}, 
      )
    }
    // this.updatethings();
    this.interval = setInterval(()=> this.updatethings(),1000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }
  
  updatethings(){
    fetch('/api/account/agendaarrayaproved?token='+localStorage.getItem('Auth'), {method:'GET'})
      .then(res => res.json())
      .then(json1 => {
        this.setState({
          items : json1,
        }, function() {
          
        });
      });
    fetch('/api/account/getnotifications?token='+localStorage.getItem('clientID'), {method:'GET'})
      .then(res => res.json())
      .then(json2 => {
        this.setState({
          notify : json2
        }, function() {
          
        });
      });
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
    localStorage.removeItem('clientID');
    localStorage.removeItem('AssignedNutriologist');
    window.location=('/login')
  }
  
  render() {
    const {
      isLoading,
      isActive,
    } = this.state;

    function update() {
      this.updatethings;
    }

    if (isActive && localStorage.getItem('Rol')=="Cliente") {
      return (
        <header>
          <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
            <a className="navbar-brand mr-1" href="/">VieLyf</a>
            <a href="#menu-toggle" className="btn " id="menu-toggle" 
            onClick={ function(e) {
              e.preventDefault();
              $("#wrapper").toggleClass("toggled")
              } }><i className="fa fa-bars" ></i></a>
              <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div className="input-group">
                  <input style={{border: '1px solid #fff'}} type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2"/>
                  <div className="input-group-append">
                    <button className="btn" type="button">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
              <a style={{color:'#0676f8'}} className="toggle" onClick={
                function(e) {
                  $(".sidebar").toggleClass('active');
                  }
                    } ><i style={{color:'#0676f8'}} className="fa fa-bell"></i></a>
              <ul className="navbar-nav ml-auto ml-md-0">
                
                <li className="nav-item dropdown no-arrow">
                  <a style={{color:'#0676f8'}} className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-user-circle fa-fw"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" onClick={this.logout}>Logout</a>       
                  </div>
                </li>
              </ul>
              </nav>
           <div className="sidebar">
                  <h2>Notifications</h2>
                  <div className="news_inner">
                  { this.state.items.map(function(client, aceptar, negar, handleClick, isToggleOn){
                    var dia = new Date(client.startDateTime).getDate();
                    var anio = new Date(client.startDateTime).getFullYear();
                    var monthMinusOneName =  moment().subtract(new Date(client.startDateTime).getMonth(), "month").startOf("month").format('MMMM');
                    var diferencia = new Date(client.startDateTime).getHours() - new Date(client.endDateTime).getHours();
                      return( 
                        <div style={{color: '#fff'}} key={client._id} className="news_item">
                            <a><h4>{client.name}</h4></a>
                            <a><h6>{"Para: "+dia+ " de " + monthMinusOneName + " del " + anio}</h6></a>
                            <a><h6>{"Con una duracion de "+moment.duration(diferencia, "hours").humanize()}</h6></a>
                            <button type="button" id='hide' name="" className="btn btn-dark" onClick={function aceptar() {
                              fetch("/api/account/editagenda?token="+client._id)
                            }}>Aceptar</button>
                            <button type="button" name="" className="btn btn-dark" onClick={function aceptar() {
                              fetch('/api/account/deleteagenda?token='+client._id)
                                $(".cancel").click(function () {
                                  console.log("toggling visibility");
                                    $(this).parent().toggleClass('gone');
                                });
                              
                            }}>Denegar</button>
                            <div className="cancel" onClick={
                      function(e) {
                        $(".cancel").click(function () {
                          console.log("toggling visibility");
                            $(this).parent().toggleClass('gone');
                        });
                      }
                    } >✕</div>
                        </div>
                        )
                    })}
                    { this.state.notify.map(function(client){
                      var datetime = new Date(client.date)
                      var monthMinusOneName =  moment().subtract(new Date(client.startDateTime).getMonth(), "month").startOf("month").format('MMMM');
                        return( 
                          <div style={{color: '#fff', backgroundColor:"#66c383"}} key={client._id} className="news_item notibox">
                              <a><h6 style={{fontSize: ".9rem", textAlign: 'center'}}>{monthMinusOneName +", "+ datetime.getDate() + " at "+ datetime.getHours() +":"+ datetime.getMinutes()}</h6></a>
                              <a><h5>{client.title}</h5></a>
                              <a><h6>{client.text}</h6></a>
                              <div style={{marginRight: '30px'}} className="cancel" onClick={function aceptar() {
                                fetch('/api/account/removenotification?token='+client._id)
                                .then(res => res.json())
                                .then(json => {
                                })

                              }}>✓</div>
                              <div className="cancel" onClick={function aceptar() {
                                fetch('/api/account/removenotification?token='+client._id).then(() => {
                                  window.location=(client.ref)
                                })
                              }}>↱</div>                           
                          </div>
                          )
                    })}
                    </div>
               </div>
              <div id="wrapper">
                <div id="sidebar-wrapper">
                  <ul className="sidebar-nav">
                      <li className="sidebar-brand">
                          <a href="/vistaprincipal">
                              Profile
                          </a>
                      </li>
                      <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li>
                      <Link to="/agenda" onClick={ $('#menu-toggle').click() }>Diary</Link>
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
            </header>
      )
    } else if (isActive && localStorage.getItem('Rol')=="Nutriologo") {
      return (
        <header>
          <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
            <a className="navbar-brand mr-1" href="/">VieLyf</a>
            <a href="#menu-toggle" style={{transition: ''}} className="btn" id="menu-toggle" 
            onClick={ function(e) {
              e.preventDefault();
              $("#wrapper").toggleClass("toggled")
              } }><i className="fa fa-bars" ></i></a>
              <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div className="input-group">
                  <input style={{border: '1px solid #fff'}} type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2"/>
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
              <a style={{color:'#0676f8'}} className="btn" onClick={
                      function(e) {
                            $(".sidebar").toggleClass('active');
                        }
                    } ><i style={{color:'#0676f8'}} className="fa fa-bell"></i></a>
              <ul className="navbar-nav ml-auto ml-md-0">
                <li className="nav-item dropdown no-arrow">
                  <a style={{color:'#0676f8'}} className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-user-circle fa-fw"></i>
                  </a>
                  <div style={{}} className="dropdown-menu mydropdown" aria-labelledby="userDropdown">
                    <a className="dropdown-item mydropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" onClick={this.logout} >Logout</a>       
                  </div>
                </li>
              </ul>
            </nav>
              
            <div className="sidebar">
                  <h2>Notifications</h2>
                  <div className="news_inner">
                  { this.state.items.map(function(client){
                    var datetime = new Date(client.requestDate)
                    var dia = new Date(client.startDateTime).getDate();
                    var hour = new Date(client.startDateTime);
                    var minutes = new Date(client.startDateTime).getMinutes();
                    if (minutes.toString().length <= 1) {
                      minutes = '0'+ minutes.toString();
                    } 
                    var day =  moment().subtract(new Date(client.requestDate).getDay()).startOf("day").format('dddd')
                    var daydate =  moment().subtract(new Date(client.requestDate).getDay()).startOf("day").format('dddd')
                    var monthMinusOneName =  moment().subtract(new Date(client.startDateTime).getMonth()).startOf("month").format('MMMM');
                    var diferencia = new Date(client.startDateTime).getHours() - new Date(client.endDateTime).getHours();
                      return(
                        <div style={{color: '#fff'}} key={client._id} className="news_item notibox">
                            <a><h6 style={{fontSize: ".9rem", textAlign: 'center'}}>{ day+ ", " +monthMinusOneName +", "+ datetime.getDate() + " at "+ datetime.getHours() +":"+ datetime.getMinutes()}</h6></a>
                            <a><h4>{client.name}</h4></a>
                            <a><h6>{"Requested for " + daydate + ", " + monthMinusOneName + ", " + dia + ", at " + hour.getHours() + ":" + minutes + " from " + client.createdBy + " with a duration of "+moment.duration(diferencia, "hours").humanize()}</h6></a>
                            <a><h6>{}</h6></a>
                            <div style={{marginRight: '30px'}} className="cancel" onClick={function aceptar() {
                              fetch("/api/account/editagenda?token="+client._id)
                              .then((res => json())
                              .then(
                                fetch("/api/account/createnotification", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json"
                                  },
                                  body: JSON.stringify({
                                    text: "Your appointment for "+ new Date(client.startDateTime).getDate() + " of " + monthMinusOneName + " at " + new Date(client.startDateTime).getHours() + ":" + minutes +" have been accepted",
                                    ref: "/agenda",
                                    date: new Date(),
                                    from: localStorage.getItem('clientID'),
                                    to: client.createdByID,
                                    title: "Your nutriologist says",
                                  })
                                })
                              ))
                            }}>✓</div>
                            <div className="cancel" onClick={function aceptar() {
                              fetch('/api/account/deleteagenda?token='+client._id);
                              fetch("/api/account/createnotification", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                  text: "Your appointment for "+ new Date(client.startDateTime).getDate() + " of " + monthMinusOneName + " at " + new Date(client.startDateTime).getHours() + new Date(client.startDateTime).getMinutes() +" have been rejected",
                                  ref: "/agenda",
                                  date: new Date(),
                                  from: localStorage.getItem('clientID'),
                                  to: client.createdByID,
                                  title: "Your nutriologist says",
                                })
                              })
                            }}>✕</div>
                        </div>
                        )
                  })}
                    { this.state.notify.map(function(client){
                      
                      var datetime = new Date(client.date)
                      var monthMinusOneName =  moment().subtract(new Date(client.startDateTime).getMonth(), "month").startOf("month").format('MMMM');
                        return( 
                          <div style={{color: '#fff', backgroundColor:"#66c383"}} key={client._id} className="news_item notibox">
                              <a><h6 style={{fontSize: ".9rem", textAlign: 'center'}}>{monthMinusOneName +", "+ datetime.getDate() + " at "+ datetime.getHours() +":"+ datetime.getMinutes()}</h6></a>
                              <a><h5>{client.title}</h5></a>
                              <a><h6>{client.text}</h6></a>
                              <div style={{marginRight: '30px'}} className="cancel" onClick={function aceptar() {
                                fetch('/api/account/removenotification?token='+client._id)
                              }}>✓</div>
                              <div className="cancel" onClick={function aceptar() {
                                fetch('/api/account/removenotification?token='+client._id).then(() => {
                                  window.location=(client.ref)
                                })
                              }}>↱</div>                           
                          </div>
                          )
                    })}
                    </div>
               </div>
              <div id="wrapper">
                <div id="sidebar-wrapper">
                  <ul className="sidebar-nav">
                      <li className="sidebar-brand">
                          <a href="/vistaprincipal">
                                Profile
                          </a>
                      </li>
                      <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li>
                      <Link to="/transition" onClick={ $('#menu-toggle').click() }>Clients</Link>
                    </li>
                    <li>
                      <Link to="/agenda" onClick={ $('#menu-toggle').click() }>Diary</Link>
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
               <Link to="/nutritionalBlog" className="text-white">Nutritional Blog</Link>
               <Link to="/catalogueNutriologist" className="text-white">Nutritionist Catalogue</Link>
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
