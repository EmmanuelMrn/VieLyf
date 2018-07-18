import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class VistaCliente extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      signUpLastName: ''
    };

    this.onEditProfile = this.onEditProfile.bind(this);
    this.logout = this.logout.bind(this);

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
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      console.log(token);
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
    window.location=('/login');
  }

  render() {
    const {
      isLoading,
      token,
      loginError,
      loginEmail,
      loginPassword
    } = this.state;

    
    return (
      <div>
        <h1>Cuenta Cliente</h1>
        <div className="row">
            <div className="col-md-3">
                <div className="btn-group-vertical">
                    <button type="button" className="btn btn-dark">Página principal</button>
                    <Link to="/charts" className="btn btn-dark">Análisis Corporal</Link>
                    <Link to="/diet" className="btn btn-dark">Calendario de Dieta</Link>
                    <button type="button" className="btn btn-dark">Progreso</button>
                </div>
            </div>

            <div className="col-md-6 img1">
                <div className="col-md-3">
                  <img height='120px' src='https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg' alt='Imagen1' />
                </div>
                <div className="col-md-3">
                  <p>Nombre: </p>
                  <p>Edad: </p>
                  <p>Estatura: </p>
                  <p>Peso: </p>
                </div>
            </div>
      
            <div className="col-md-3">
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
            </div>
          </div>
          <button type="button" className="btn btn-dark" onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default VistaCliente;
