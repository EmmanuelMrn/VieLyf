import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class VistaNutriologo extends Component {
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
    console.log(localStorage.getItem('Rol'));
    const obj = getFromStorage('the_main_app');
    console.log(obj)
    if (obj && obj.token) {
      const { token } = obj;
      console.log(token);
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
        <h1>Cuenta Nutriólogo</h1>
        <div className="row">
            <div className="col-md-3">
                <div className="btn-group-vertical">
                    <Link to="/vistanutriologo" className="btn btn-dark">Página principal</Link>
                    <button type="button" className="btn btn-dark">Calendario</button>
                    <Link to="/diet" className="btn btn-dark">Crear Dieta</Link>
                    <Link to="/agenda" className="btn btn-dark">Agenda</Link>
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

            <div class="col-md-3 right_sidebar_area">
              <aside class="right_widget r_news_widget">
                  <div class="r_w_title">
                      <h3>Noticias recientes</h3>
                  </div>
                  <div class="news_inner">
                      <div class="news_item">
                          <a href="#"><h4>In order to succeed, we must first believe that we can.</h4></a>
                          <a href="#"><h6>October 7, 2017</h6></a>
                      </div>
                      <div class="news_item">
                          <a href="#"><h4>The way to get started is to quit talking and begin doing.</h4></a>
                          <a href="#"><h6>October 7, 2017</h6></a>
                      </div>
                      <div class="news_item">
                          <a href="#"><h4>In order to succeed, we must first believe that we can.</h4></a>
                          <a href="#"><h6>October 7, 2017</h6></a>
                      </div>
                      <div class="news_item">
                          <a href="#"><h4>The way to get started is to quit talking and begin doing.</h4></a>
                          <a href="#"><h6>October 7, 2017</h6></a>
                      </div>
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
          <button type="button" className="btn btn-dark" onClick={this.logout}>Logout</button>    
      </div>
      
    );
  }
}

export default VistaNutriologo;