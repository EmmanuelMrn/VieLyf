import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class VistaNutriologo extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      isToggleOn: true
    };

    this.onEditProfile = this.onEditProfile.bind(this);
    this.logout = this.logout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    fetch('/api/account/agendaarrayaproved?token='+localStorage.getItem('Auth'), {method:'GET'})
      .then(res => res.json())
      .then(json1 => {
        this.setState({
          items : json1,
        });
      });
    // console.log(localStorage.getItem('Rol'));
    const obj = getFromStorage('the_main_app');
    // console.log(obj)
    if (obj && obj.token) {
      const { token } = obj;
      // console.log(token);
    //   Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json  => {
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
    } else {
      this.setState({
        isLoading: false,
      });
    }
    // console.log(token);
  }


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

  aceptar() { 
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(name)
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
    console.log(isToggleOn)
  }

  negar() { 
  }

  render() {
    const {
      isLoading,
      token,
      loginError,
      loginEmail,
      loginPassword,
      items
    } = this.state;

    var ClientsData = Array.from(this.state.items);
    
    return (
      <div>
        <h1>Cuenta Nutriólogo</h1>
        <div className="row">
            <div className="col-md-3">
                <div className="btn-group-vertical">
                    <Link to="/vistanutriologo" className="btn btn-dark">Página principal</Link>
                    <button type="button" className="btn btn-dark">Calendario</button>
                    <Link to="/diet" className="btn btn-dark">Crear Dieta</Link>
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
                            {/* <button type="button" name="qfefqf" className="btn btn-dark" onClick={aceptar}>Aceptar</button>
                            <button type="button" name="qfefqf" className="btn btn-dark" onClick={negar}>Negar</button> */}
                             <button onClick={handleClick}>
                            test
                            </button> 
                        </div>
                        
                        )
                    })}
                    </div>
                    </aside>
                          </div>

           

            {/* <div className="col-md-3">
                <p>Edit profile</p>
                <input
                  type="firstName"
                  name="signUpFirstName"
                  placeholder="First Name"
                  value={this.state.signUpFirstName}
                  onChange={this.handleInputChange}
                /><br />
                <input
                  type="lastName"
                  name="signUpLastName"
                  placeholder="Last Name"
                  value={this.state.signUpLastName}
                  onChange={this.handleInputChange}
                /><br />
                <input
                  type="email"
                  name="signUpEmail"
                  placeholder="Email"
                  value={this.state.signUpEmail}
                  onChange={this.handleInputChange}
                /><br />
                <input
                  type="password"
                  name="signUpPassword"
                  placeholder="Password"
                  value={this.state.signUpPassword}
                  onChange={this.handleInputChange}
                /><br />
                <button type="button" className="btn btn-dark" onClick={this.onEditProfile}>Save changes</button>
            </div> */}
          </div>  
      </div>
    );
  }
}

export default VistaNutriologo;