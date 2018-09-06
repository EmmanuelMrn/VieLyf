import React, { Component } from "react";
import "whatwg-fetch";
import { Link } from "react-router-dom";
import moment, { min } from "moment";
import { getFromStorage, setInStorage } from "../../utils/storage";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import swal from 'sweetalert2';

require("moment/locale/en-gb.js");

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      isActive: false,
      items:[],
      notify:[],
      Nutriologist:'',
      token: "",
      Name: "",
      Customers: [],
      signUpEmail: "",
      signUpPassword: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpPhone: "",
      modal: false
    };

    this.inputsearch = this.inputsearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);

    this.logout = this.logout.bind(this);
    this.updatethings = this.updatethings.bind(this);
    this.onEditProfile = this.onEditProfile.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClickSubmmit = this.handleClickSubmmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.inputsearch();
  }

  handleClick2(e) {
    e.preventDefault();
    this.inputsearchNutritionist();
  }
  ActionLink() {
    return (
      <button
        className="btn btn-primary"
        type="button"
        onClick={this.handleClick}
      >
        <i className="fa fa-search" />
      </button>
    );
  }
  ActionLink2() {
    return (
      <button
        className="btn btn-primary"
        type="button"
        onClick={this.handleClick2}
      >
        <i className="fa fa-search" />
      </button>
    );
  }
  inputsearch() {
    fetch("/api/account/searchClient?token=" + this.state.Name)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            Customers: json.doc.map(function(item) {
              return item;
            }),
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }

        console.log(this.state.Customers);
        console.log(this.state.Customers.length);
        setInStorage("searchresults", { token: json.doc });
        window.location = "/ResultadoBusqueda";
      });
  }

  inputsearchNutritionist() {
    fetch("/api/account/searchNutritionist?token=" + this.state.Name)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            Customers: json.doc.map(function(item) {
              return item;
            }),
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }

        console.log(this.state.Customers);
        console.log(this.state.Customers.length);
        setInStorage("searchresults", { token: json.doc });
        window.location = "/ResultadoBusqueda";
      });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
  
    this.setState({
      [name]: value
    });
  }
  
  handleClickSubmmit(e) {
    e.preventDefault();
    this.onEditProfile();
    this.toggle();
  }

  componentDidMount() {
    console.log(localStorage.getItem('the_main_app'));
    console.log("Login email = " + localStorage.getItem('email'));
    console.log(localStorage.getItem('Auth'));
    this.updatethings();
    if (localStorage.hasOwnProperty('the_main_app')) {
      this.setState({ isActive: true });
    }
    fetch('/api/account/getuseremail?token=' + localStorage.getItem('AssignedNutriologist'), { method: 'GET' })
    .then(res => res.json()).then(nutri => {
      this.setState({
        Nutriologist: nutri[0].UserName
      })
    })
    this.updatethings();
    this.interval = setInterval(() => this.updatethings(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updatethings() {
    fetch(
      "/api/account/agendaarrayaproved?token=" + localStorage.getItem('Auth'),
      { method: "GET" }
    )
      .then(res => res.json())
      .then(json1 => {
        this.setState({
          items : json1,
        });
      });
    fetch('/api/account/getnotifications?token=' + localStorage.getItem('Client_id'), {method:'GET'})
      .then(res => res.json())
      .then(json2 => {
        this.setState(
          {
            notify: json2
          },
          function() {}
        );
      });
  }

  onDelete() {
    var emailDelete = localStorage.getItem('email');
    fetch("/api/account/deleteaccount?token=" + emailDelete + "");
  }

  confirmDelete(){
    alertify.confirm("Are you sure you want to delete your account?",
    function(){
      alertify.success('Your account was deleted');
      
      setTimeout(function(){
          {this.onDelete}
        
          setTimeout(function(){
          window.location=('/');
          }, 1200);
        }, 500);    
    },
    function(){
      alertify.error('Cancel');
    });
  }

  onEditProfile() {
    const {
      signUpEmail,
      signUpFirstName,
      signUpLastName,
      signUpPassword,
      signUpPhone
    } = this.state;
    var emailID = localStorage.getItem('email');
    fetch(
      "/api/account/editprofile?token=" +
        emailID +
        "&token2=" +
        signUpFirstName +
        "&token3=" +
        signUpLastName +
        "&token4=" +
        signUpPassword +
        "&token5=" +
        signUpPhone +
        ""
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            token,
            isLoading: false
          });
          alertify.success("Edited profile");
        } else {
          this.setState({
            isLoading: false
          });
        }
      }); 
  }

  logout() {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("/api/account/logout?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
    localStorage.removeItem('the_main_app');
    localStorage.removeItem('email');
    localStorage.removeItem('Auth');
    localStorage.removeItem('Rol');
    localStorage.removeItem('clientID');
    localStorage.removeItem('AssignedNutriologist');
    localStorage.removeItem('ClientLast');
    localStorage.removeItem('ClientFirst');
    localStorage.removeItem('Client_id');
    alertify.warning("Closed session");
    window.location=('/login');
  }

  render() {
    const {
      isActive,
      Nutriologist,
    } = this.state;
    let user; 
    if (localStorage.hasOwnProperty('ClientLast')) {
      user = localStorage.getItem('ClientFirst') + " " + localStorage.getItem('ClientLast');
    } else {
      user = "Usuario"
    }

    let Catalogue
    if (!localStorage.hasOwnProperty('AssignedNutriologist')) {
      Catalogue = (
        <li>
          <Link to="/catalogueNutriologist" onClick={ $('#menu-toggle').click() }>Nutriologist Catalogue</Link>
        </li>
      )
    } else {
      Catalogue = ( 
        <li>
          <Link to={"/profile/"+Nutriologist} onClick={ $('#menu-toggle').click() }>My nutriologist</Link>
        </li>
      )
    }

    if (isActive && localStorage.getItem('Rol') == "Cliente") {
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
                <input
                  style={{ border: "1px solid #fff" }}
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  value={this.state.Name}
                  onChange={this.handleInputChange}
                />
                <div className="input-group-append">{this.ActionLink2()}</div>
              </div>
            </form>
              <a href="/vistaprincipal"><h6 style={{color: '#fff', marginRight: '5px', marginTop:'6px'}}>{user}</h6></a>
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
                  <div className="dropdown-menu mydropdown" aria-labelledby="userDropdown">
                    <a className="dropdown-item mydropdown-item" href="" data-toggle="modal" onClick={this.toggle}>
                      Edit profile
                    </a>
                    <a className="dropdown-item mydropdown-item" href="" data-toggle="modal" onClick={this.logout} >Logout</a>      
                  </div>
                </li>
              </ul>
              </nav>

              <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Edit profile</ModalHeader>
              <ModalBody>
                <form>
                <div className="form-group">
                    <label for="InputFirstName">First Name</label>
                    <input type="text" className="form-control" 
                    placeholder="Enter first name"
                    name="signUpFirstName"
                    value={this.state.signUpFirstName}
                    onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="InputLastName">Last Name</label>
                    <input type="text" className="form-control"  
                    placeholder="Enter last name"
                    name="signUpLastName"
                    value={this.state.signUpLastName}
                    onChange={this.handleInputChange}/>
                  </div>
                  <div className="form-group">
                    <label for="InputPhone">Phone</label>
                    <input type="number" className="form-control"  
                    placeholder="+1 (555)555-5555"
                    name="signUpPhone"
                    value={this.state.signUpPhone}
                    onChange={this.handleInputChange}/>
                    <small id="phoneHelp" className="form-text text-muted">We'll never share your phone with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label for="InputPassword">Password</label>
                    <input type="password" className="form-control"  
                    placeholder="Enter password"
                    name="signUpPassword"
                    value={this.state.signUpPassword}
                    onChange={this.handleInputChange}
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.handleClickSubmmit}>Submmit</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
                <Button color="btn btn-danger" onClick={this.confirmDelete}>Delete account</Button>
              </Modal>

           <div className="sidebar">
                  <h2>Notifications</h2>
                  <div className="news_inner">
                  { this.state.items.map(function(client){
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
                            }}>Accept</button>
                            <button type="button" name="" className="btn btn-dark" onClick={function aceptar() {
                              fetch('/api/account/deleteagenda?token='+client._id)
                                $(".cancel").click(function () {
                                  console.log("toggling visibility");
                                    $(this).parent().toggleClass('gone');
                                });
                              
                            }}>Deny</button>
                            <div className="cancel" onClick={
                      function(e) {
                        $(".cancel").click(function () {
                          console.log("toggling visibility");
                          $(this)
                            .parent()
                            .toggleClass("gone");
                        });
                      }}
                    >
                      ✕
                    </div>
                  </div>
                );
              })}
                    { this.state.notify.map(function(client){
                      var datetime = new Date(client.date)
                      var monthMinusOneName =  moment().subtract(new Date(client.startDateTime).getMonth(), "month").startOf("month").format('MMMM');
                        if (client.text == "you have been accepted as a client! Start making a new appointment!") {
                          return( 
                            <div style={{color: '#fff', backgroundColor:"#66c383"}} key={client._id} className="news_item notibox">
                                <a><h6 style={{fontSize: ".9rem", textAlign: 'center'}}>{monthMinusOneName +", "+ datetime.getDate() + " at "+ datetime.getHours() +":"+ datetime.getMinutes()}</h6></a>
                                <a><h5>{client.title}</h5></a>
                                <a><h6>{client.text}</h6></a>
                                <div style={{marginRight: '30px'}} className="cancel" onClick={function aceptar() {
                                  localStorage.setItem('AssignedNutriologist', client.from)
                                  fetch('/api/account/removenotification?token='+client._id)
                                }}>✓</div>
                                <div className="cancel" onClick={function aceptar() {
                                  localStorage.setItem('AssignedNutriologist', client.from)
                                  fetch('/api/account/removenotification?token='+client._id).then(() => {
                                    window.location=(client.ref)
                                  })
                                }}>↱</div>                           
                            </div>
                            )
                        } else {
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
                        }
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
                    <Link
                      id="chart"
                      to="/charts"
                      onClick={$("#menu-toggle").click()}
                    >
                      Corporal Analysis
                    </Link>
                  </li>
                  <li>
                    <Link to="/diet" onClick={$("#menu-toggle").click()}>
                      Diet
                    </Link>
                  </li>
                  <li>
                    <Link to="/agenda" onClick={$("#menu-toggle").click()}>
                      Calendar
                    </Link>
                  </li>
                  <li>
                    <Link id="" to="" onClick={$("#menu-toggle").click()}>
                      Progress
                    </Link>
                  </li>
                  {Catalogue}
                  <li>
                    <Link
                      id="nutri"
                      to="/nutritionalblog"
                      onClick={$("#menu-toggle").click()}
                    >
                      Nutrirional Blog
                    </Link>
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
                <input
                  style={{ border: "1px solid #fff" }}
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  value={this.state.Name}
                  onChange={this.handleInputChange}
                />
                <div className="input-group-append">{this.ActionLink()}</div>
              </div>
            </form>
              <a href="/vistaprincipal"><h6 style={{color: '#fff', marginRight: '5px', marginTop:'6px'}}>{user}</h6></a>
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
                    <a className="dropdown-item mydropdown-item" href="" data-toggle="modal" onClick={this.toggle}>
                      Edit profile
                    </a>
                    <a className="dropdown-item mydropdown-item" href="" data-toggle="modal" onClick={this.logout} >Logout</a>       
                  </div>
                </li>
              </ul>
            </nav>
            
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Edit profile</ModalHeader>
            <ModalBody>
              <form>
              <div className="form-group">
                  <label for="InputFirstName">First Name</label>
                  <input type="text" className="form-control" 
                  placeholder="Enter first name"
                  name="signUpFirstName"
                  value={this.state.signUpFirstName}
                  onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label for="InputLastName">Last Name</label>
                  <input type="text" className="form-control"  
                  placeholder="Enter last name"
                  name="signUpLastName"
                  value={this.state.signUpLastName}
                  onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                  <label for="InputPhone">Phone</label>
                  <input type="number" className="form-control"  
                  placeholder="+1 (555)555-5555"
                  name="signUpPhone"
                  value={this.state.signUpPhone}
                  onChange={this.handleInputChange}/>
                  <small id="phoneHelp" className="form-text text-muted">We'll never share your phone with anyone else.</small>
                </div>
                <div className="form-group">
                  <label for="InputPassword">Password</label>
                  <input type="password" className="form-control"  
                  placeholder="Enter password"
                  name="signUpPassword"
                  value={this.state.signUpPassword}
                  onChange={this.handleInputChange}
                  />
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleClickSubmmit}>Submmit</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
              <Button color="btn btn-danger" onClick={this.confirmDelete}>Delete account</Button>
            </Modal>
        
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
                      if (new Date(client.startDateTime) - new Date() >= 0) {
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
                      } else {
                        fetch('/api/account/deleteagenda?token='+client._id);
                        fetch("/api/account/createnotification", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify({
                            text: "Your appointment for "+ new Date(client.startDateTime).getDate() + " of " + monthMinusOneName + " at " + new Date(client.startDateTime).getHours() + ":" + minutes +" have been not accepted (REQUEST NEVER ATTENDED)",
                            ref: "/agenda",
                            date: new Date(),
                            from: localStorage.getItem('clientID'),
                            to: client.createdByID,
                            title: "Your nutriologist says",
                          })
                        })
                         }
                  })}
                    { this.state.notify.map(function(client){
                      
                      var datetime = new Date(client.date)
                      var monthMinusOneName =  moment().subtract(new Date(client.startDateTime).getMonth(), "month").startOf("month").format('MMMM');
                      if (client.ref == '/transition') {
                        return (
                          <div style={{color: '#fff', backgroundColor:"#9e098e"}} key={client._id} className="news_item notibox">
                              <a><h6 style={{fontSize: ".9rem", textAlign: 'center'}}>{monthMinusOneName +", "+ datetime.getDate() + " at "+ datetime.getHours() +":"+ datetime.getMinutes()}</h6></a>
                              <a><h5>{client.title}</h5></a>
                              <a><h6>{client.text}</h6></a>
                              <div style={{marginRight: '30px'}} className="cancel" onClick={function aceptar() {
                                fetch('/api/account/removenotification?token='+client._id)
                                fetch('/api/account/relationup', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({
                                    "Client_id": client.from,
	                                  "Nutritionist_id": localStorage.getItem('Client_id')
                                  })
                                }).then(res => res.json())
                                .then(json => {
                                  if (json.success) {
                                    fetch("/api/account/createnotification", {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json"
                                      },
                                      body: JSON.stringify({
                                        text: "you have been accepted as a client! Start making a new appointment!",
                                        ref: "/agenda",
                                        date: new Date(),
                                        from: localStorage.getItem('email'),
                                        to: client.from,
                                        title: "Congratulations!",
                                      })
                                    }).then(
                                      fetch("/api/account/createnotification", {
                                        method: "POST",
                                        headers: {
                                          "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                          text: "Your appointment for "+ new Date(client.startDateTime).getDate() + " of " + monthMinusOneName + " at " + new Date(client.startDateTime).getHours() + ":" + minutes +" have been not accepted (REQUEST NEVER ATTENDED)",
                                          ref: "/agenda",
                                          date: new Date(),
                                          from: '',
                                          to: localStorage.getItem('clientID'),
                                          title: "Your nutriologist says",
                                        })
                                      })
                                    )
                                  } else {
                                    fetch("/api/account/createnotification", {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json"
                                      },
                                      body: JSON.stringify({
                                        text: "We cant create this relation, sorry!",
                                        ref: "#",
                                        date: new Date(),
                                        from: client.from,
                                        to: localStorage.getItem('clientID'),
                                        title: "Uups!",
                                      })
                                    })
                                  }
                                })
                              }}>✓</div>
                              <div className="cancel" onClick={function aceptar() {
                                fetch('/api/account/removenotification?token='+client._id).then(() => {
                                  window.location=(client.ref)
                                })
                              }}>↱</div>                           
                          </div>
                        )
                      } else {
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
                      }
                    })}
                    </div>
               </div>
               <div id="wrapper">
               <div id="sidebar-wrapper">
                 <ul className="sidebar-nav">
                   <li className="sidebar-brand">
                     <a href="/vistaprincipal">Profile</a>
                   </li>
                   <ul style={{ listStyleType: "none", padding: 0 }}>
                     <li>
                       <Link to="/transition" onClick={$("#menu-toggle").click()}>
                         Clients
                       </Link>
                     </li>
                     <li>
                       <Link to="/agenda" onClick={$("#menu-toggle").click()}>
                         Diary
                       </Link>
                     </li>
                     <li>
                       <Link id="" to="" onClick={$("#menu-toggle").click()}>
                         Calendar
                       </Link>
                     </li>
                   </ul>
                 </ul>
               </div>
             </div> 
            </header>
      )
    } else {
      return (
        <header>
          <nav className="navbar bg-dark text-white">
            <Link to="/" className="navbar-brand text-white">
                VieLyf
            </Link>
            <Link to="/nutritionalBlog" className="text-white">
                Nutritional Blog
            </Link>
            <Link to="/catalogueNutriologist" className="text-white">
                Nutritionist Catalogue
            </Link>
            <div>
              <Link to="/signup" className="navbar-brand text-white">
                Sign up
              </Link>
              <Link to="/login" className="navbar-brand text-white">
                Log in
              </Link>
            </div>
          </nav>
        </header>
      );
    }
  }
}

export default Header;
