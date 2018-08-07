<<<<<<< HEAD
import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
=======
import React, { Component } from "react";
import "whatwg-fetch";
import { Link } from "react-router-dom";
import moment from "moment";

import { getFromStorage, setInStorage } from "../../utils/storage";
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63

class VistaNutriologo extends Component {
  constructor(props) {
    super(props);

    this.state = {
<<<<<<< HEAD
      items:[],
      isNutriologist: false,
      isLoading: true,
      token: '',
      signUpError: '',
      loginError: '',
      loginEmail: '',
      loginPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
=======
      items: [],
      isNutriologist: false,
      isLoading: true,
      token: "",
      signUpError: "",
      loginError: "",
      loginEmail: "",
      loginPassword: "",
      signUpEmail: "",
      signUpPassword: "",
      signUpFirstName: "",
      signUpLastName: "",
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
      isToggleOn: true
    };

    this.onEditProfile = this.onEditProfile.bind(this);
    this.logout = this.logout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
<<<<<<< HEAD
  
=======

>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
<<<<<<< HEAD
    console.log('+===========+')
    console.log(localStorage.getItem('AssignedNutriologist'))
    console.log('=============')
    console.log(localStorage.getItem('Rol'));
    fetch('/api/account/agendaarrayaproved?token='+localStorage.getItem('Auth'), {method:'GET'})
      .then(res => res.json())
      .then(json1 => {
        this.setState({
          items : json1,
        });
      });
    // console.log(localStorage.getItem('Rol'));
    const obj = getFromStorage('the_main_app');
=======
    fetch(
      "/api/account/agendaarrayaproved?token=" + localStorage.getItem("Auth"),
      { method: "GET" }
    )
      .then(res => res.json())
      .then(json1 => {
        this.setState({
          items: json1
        });
      });
    // console.log(localStorage.getItem('Rol'));
    const obj = getFromStorage("the_main_app");
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
    // console.log(obj)
    if (obj && obj.token) {
      const { token } = obj;
      // console.log(token);
<<<<<<< HEAD
    //   Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json  => {
=======
      //   Verify token
      fetch("/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
<<<<<<< HEAD
              isLoading: false,
=======
              isLoading: false
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
            });
          }
        });
    } else {
      this.setState({
<<<<<<< HEAD
        isLoading: false,
=======
        isLoading: false
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
      });
    }
    // console.log(token);
  }

<<<<<<< HEAD

  onEditProfile() {
    const {signUpEmail, signUpFirstName, signUpLastName, signUpPassword} = this.state;
      fetch('/api/account/editprofile?token='+signUpEmail+'&token2='+signUpFirstName+'&token3='+signUpLastName+'&token4='+signUpPassword+'')
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
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
=======
  onEditProfile() {
    const {
      signUpEmail,
      signUpFirstName,
      signUpLastName,
      signUpPassword
    } = this.state;
    fetch(
      "/api/account/editprofile?token=" +
        signUpEmail +
        "&token2=" +
        signUpFirstName +
        "&token3=" +
        signUpLastName +
        "&token4=" +
        signUpPassword +
        ""
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            token,
            isLoading: false
          });
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
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("/api/account/logout?token=" + token)
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
<<<<<<< HEAD
              token: '',
=======
              token: "",
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
              isLoading: false
            });
          } else {
            this.setState({
<<<<<<< HEAD
              isLoading: false,
=======
              isLoading: false
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
            });
          }
        });
    } else {
      this.setState({
<<<<<<< HEAD
        isLoading: false,
      });
    }
    localStorage.removeItem('the_main_app');
    localStorage.removeItem('email');
    localStorage.removeItem('Auth');
    localStorage.removeItem('Rol');
    window.location=('/login')
  }

  aceptar() { 
=======
        isLoading: false
      });
    }
    localStorage.removeItem("the_main_app");
    localStorage.removeItem("email");
    localStorage.removeItem("Auth");
    localStorage.removeItem("Rol");
    window.location = "/login";
  }

  aceptar() {
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
<<<<<<< HEAD
    console.log(name)
=======
    console.log(name);
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
<<<<<<< HEAD
    console.log(isToggleOn)
  }

  negar() { 
  }
=======
    console.log(isToggleOn);
  }

  negar() {}
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63

  render() {
    const {
      isLoading,
      token,
      loginError,
      loginEmail,
      loginPassword,
<<<<<<< HEAD
      items
    } = this.state;

    var ClientsData = Array.from(this.state.items);
    
=======
      items,
      Name
    } = this.state;
    //if()
    var ClientsData = Array.from(this.state.items);

>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
    return (
      <div>
        <h1>Cuenta Nutriólogo</h1>
        <div className="row">
<<<<<<< HEAD
            <div className="col-md-3">
                <div className="btn-group-vertical">
                    <Link to="/vistanutriologo" className="btn btn-dark">Página principal</Link>
                    <button type="button" className="btn btn-dark">Calendario</button>
                    <Link to="/transition" className="btn btn-dark">Crear Dieta</Link>
                    <Link to="/agenda" className="btn btn-dark">Agenda</Link>
                    {/* <br/> */}
                    <button type="button" className="btn btn-dark" onClick={this.logout}>Cerrar sesion</button>            
                </div>
            </div>

            <div className="col-md-6 img1">
                <div className="col-md-3">
                  <img height='120px' src='https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg' alt='Imagen1' />
                </div>
                <div className="col-md-3">
                  <p>Nombre: </p>
                  <p>Título: </p>
                  <p>Telefóno: </p>
                  <p>Correo: </p>
                </div>
            </div> 


     
        <div className="col-md-3 right_sidebar_area">
              <aside className="right_widget r_news_widget">
                  <div className="r_w_title">
                      <h3>Noticias recientes</h3>
                  </div>
                  <div className="news_inner">
                  { ClientsData.map(function(client, aceptar, negar, handleClick, isToggleOn){
                    var dia = new Date(client.startDateTime).getDay();
                    var anio = new Date(client.startDateTime).getFullYear();
                    var monthMinusOneName =  moment().subtract(new Date(client.startDateTime).getMonth(), "month").startOf("month").format('MMMM');
                    var diferencia = new Date(client.startDateTime).getHours() - new Date(client.endDateTime).getHours();
                    console.log(moment.duration(diferencia, "hours").humanize())
                      return( 
                        <div key={client._id} className="news_item">
                            <a><h4>{client.name}</h4></a>
                            <a><h6>{"Para: "+dia+ " de " + monthMinusOneName + " del " + anio}</h6></a>
                            <a><h6>{"Con una duracion de "+moment.duration(diferencia, "hours").humanize()}</h6></a>
                            <button type="button" id='hide' name="" className="btn btn-dark" onClick={function aceptar() {
                              fetch("/api/account/editagenda?token="+client._id)
                            }}>Aceptar</button>
                            <button type="button" name="" className="btn btn-dark" onClick={function aceptar() {
                              fetch('/api/account/deleteagenda?token='+client._id)
                            }}>Denegar</button>
                        </div>
                        
                        )
                    })}
                    </div>
                    </aside>
                          </div>

          </div>  
=======
          <div className="col-md-3">
            <div className="btn-group-vertical">
              <Link to="/vistanutriologo" className="btn btn-dark">
                Página principal
              </Link>
              <button type="button" className="btn btn-dark">
                Calendario
              </button>
              <Link to="/transition" className="btn btn-dark">
                Crear Dieta
              </Link>
              <Link to="/agenda" className="btn btn-dark">
                Agenda
              </Link>
              {/* <br/> */}
              <button
                type="button"
                className="btn btn-dark"
                onClick={this.logout}
              >
                Cerrar sesion
              </button>
            </div>
          </div>

          <div className="col-md-6 img1">
            <div className="col-md-3">
              <img
                height="120px"
                src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                alt="Imagen1"
              />
            </div>
            <div className="col-md-3">
              <p>Nombre: </p>
              <p>Título: </p>
              <p>Telefóno: </p>
              <p>Correo: </p>
            </div>
          </div>

          <div className="col-md-3 right_sidebar_area">
            <aside className="right_widget r_news_widget">
              <div className="r_w_title">
                <h3>Noticias recientes</h3>
              </div>
              <div className="news_inner">
                {ClientsData.map(function(
                  client,
                  aceptar,
                  negar,
                  handleClick,
                  isToggleOn
                ) {
                  var dia = new Date(client.startDateTime).getDay();
                  var anio = new Date(client.startDateTime).getFullYear();
                  var monthMinusOneName = moment()
                    .subtract(
                      new Date(client.startDateTime).getMonth(),
                      "month"
                    )
                    .startOf("month")
                    .format("MMMM");
                  var diferencia =
                    new Date(client.startDateTime).getHours() -
                    new Date(client.endDateTime).getHours();
                  console.log(moment.duration(diferencia, "hours").humanize());
                  return (
                    <div key={client._id} className="news_item">
                      <a>
                        <h4>{client.name}</h4>
                      </a>
                      <a>
                        <h6>
                          {"Para: " +
                            dia +
                            " de " +
                            monthMinusOneName +
                            " del " +
                            anio}
                        </h6>
                      </a>
                      <a>
                        <h6>
                          {"Con una duracion de " +
                            moment.duration(diferencia, "hours").humanize()}
                        </h6>
                      </a>
                      <button
                        type="button"
                        id="hide"
                        name=""
                        className="btn btn-dark"
                        onClick={function aceptar() {
                          fetch("/api/account/editagenda?token=" + client._id);
                        }}
                      >
                        Aceptar
                      </button>
                      <button
                        type="button"
                        name=""
                        className="btn btn-dark"
                        onClick={function aceptar() {
                          fetch(
                            "/api/account/deleteagenda?token=" + client._id
                          );
                        }}
                      >
                        Denegar
                      </button>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
      </div>
    );
  }
}

<<<<<<< HEAD
export default VistaNutriologo;
=======
export default VistaNutriologo;
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
