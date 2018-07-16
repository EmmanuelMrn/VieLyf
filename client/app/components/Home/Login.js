import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
var vista = ('');
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

    this.onLogin = this.onLogin.bind(this);
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
      // Verify token
      fetch('/api/account/verify?token=' + token)
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
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onLogin() {

    const {
      loginEmail,
      loginPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        
        Email: loginEmail,
        Password: loginPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            loginError: json.message,
            isLoading: false,
            loginPassword: '',
            loginEmail: '',
            token: json.token,
          });
          
        } else {
          this.setState({
            loginError: json.message,
            isLoading: false,
          });
          console.log(loginPassword);
        }
      });

      fetch('/api/account/isnutriologist?token='+loginEmail)
        .then(res => res.json())
        .then(json1 => {
          console.log(json1.success)
          if(json1.success){
            console.log(loginEmail);
            vista = ('Nutritionist');
          } else {
            vista = ('Client');
          }
          
          console.log(json1)
        });
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
  }

  render() {
    const {
      isLoading,
      token,
      loginError,
      loginEmail,
      loginPassword
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div>
          <div>
            {
              (loginError) ? (
                <p>{loginError}</p>
              ) : (null)
            }
            <p>Log In</p>
            <input
              name="loginEmail"
              type="text"
              placeholder="Email"
              value={loginEmail}
              onChange={this.handleInputChange}
            />
            <br />
            <input
              type="password"
              name="loginPassword"
              placeholder="Password"
              value={loginPassword}
              onChange={this.handleInputChange}
            />
            <br />
            <button type="button" className="btn btn-dark" onClick={this.onLogin}>Log In</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1>{vista}</h1>
        <div className="row">
            <div className="col-md-3">
                <div className="btn-group-vertical">
                    <button type="button" className="btn btn-dark">Página principal</button>
                    <button type="button" className="btn btn-dark">Análisis Corporal</button>
                    <Link to ="/diet" className="btn btn-dark">Calendario de dieta</Link>
                    <button type="button" className="btn btn-dark">Progreso</button>
                </div>
            </div>

            <div className="col-md-6">
                <p>Perfil</p>
                <Link to="/disponibilitySchedule" className="btn btn-dark">Disponibilidad de Horario</Link>
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

export default Login;