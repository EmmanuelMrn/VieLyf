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
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
            if (localStorage.hasOwnProperty('email')) {
              fetch('/api/account/isnutriologist?token='+localStorage.getItem('email'))
              .then(res => res.json())
              .then(isnutriologit => {
                if(isnutriologit.success){
                  window.location=('/vistanutriologo');
                } else {
                  window.location=('/vistacliente');
                }
              });
            } else {
              this.setState({
                isLoading: false,
              });
            }  
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
        localStorage.setItem('email', json.Email)
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            loginError: json.message,
            isLoading: false,
            loginPassword: '',
            token: json.token,
          });
          fetch('/api/account/isnutriologist?token='+ loginEmail)
            .then(res => res.json())
            .then(json1 => {
              if(json1.success){
                localStorage.setItem('Auth', loginEmail)
                window.location=('/vistanutriologo');
                localStorage.setItem('Rol', 'Nutriologo'); 
              } else {
                var getuser;
                fetch('/api/account/getuseremail?token='+loginEmail)
                .then(res => res.json())
                .then(json2 => {
                  fetch('/api/accounts/getuser?token='+json2[0]._id)
                  .then(res => res.json())
                  .then(json3 => {
                    fetch('/api/account/getuserbyid?token='+json3.Nutritionist_id)
                    .then(res => res.json())
                    .then(json4 => {
                      localStorage.setItem('AssignedNutriologist', json4[0].Email)
                    })
                  })       
                })
                localStorage.setItem('Rol', 'Cliente');  
                window.location=('/vistacliente');
              }
            });    
        } else {
          this.setState({
            loginError: json.message,
            isLoading: false,
          });
        }
      });
      this.setState({
        loginEmail: '',
      });
  }

  onEditProfile() {
    const {signUpEmail, signUpFirstName, signUpLastName, signUpPassword} = this.state;
      fetch('/api/account/editprofile?token='+signUpEmail+'&token2='+signUpFirstName+'&token3='+signUpLastName+'&token4='+signUpPassword+'')
        .then(res => res.json())
        .then(json6 => {
          if (json6.success) {
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

    // if (!token) {
    //   return (
        
        





        
    //   );
    // }

    return (
      <div>
        <section className="login-block">
          <div className="container">
            <div className="row">
              <div className="col-md-4 login-sec">
                <h2 className="text-center">Login Now</h2>
                <form className="login-form">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Username</label>
                    <input type="text" className="form-control" placeholder=""/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                    <input type="password" className="form-control" placeholder=""/>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input"/>
                      <small>Remember Me</small>
                    </label>
                    <button type="submit" className="btn btn-login float-right">Submit</button>
                  </div>
                </form>
              </div>
              <div className="col-md-8 banner-sec">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                  <ol className="carousel-indicators">
                      <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                  </ol>
                  <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                    <img className="d-block img-fluid" width="1100px" height="500px" src="/assets/img/img 1.png" alt="First slide"/>
                      <div className="carousel-caption d-none d-md-block">
                        <div className="banner-text">
                            <h2>Solutions for helth</h2>
                            <h5 style={{color: #fff}}>In Vielyf we have the determination to create the best software for you and your needs</h5>
                        </div>	
                      </div>
                    </div>
                    {/* <div className="carousel-item">
                    <img className="d-block img-fluid" width="1100px" height="500px" src="https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Second slide"/>
                      <div className="carousel-caption d-none d-md-block">
                        <div className="banner-text">
                            <h2>This is Heaven</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                        </div>	
                      </div>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block img-fluid" width="1100px" height="500px" src="https://images.pexels.com/photos/204686/pexels-photo-204686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Third slide"/>
                      <div className="carousel-caption d-none d-md-block">
                        <div className="banner-text">
                            <h2>This is Heaven</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                        </div>	
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> 
      </div> 
    );
  }
}

export default Login;

// {document.write(new Date().getFullYear())}

// <div>
        //   <div>
        //     {
        //       (loginError) ? (
        //         <p>{loginError}</p>
        //       ) : (null)
        //     }
        //     <h1>Log In</h1>
        //     <input
        //       name="loginEmail"
        //       type="text"
        //       placeholder="Email"
        //       value={loginEmail}
        //       onChange={this.handleInputChange}
        //     />
        //     <br />
        //     <input
        //       type="password"
        //       name="loginPassword"
        //       placeholder="Password"
        //       value={loginPassword}
        //       onChange={this.handleInputChange}
        //     />
        //     <br />
        //     <button type="button" className="btn btn-dark" onClick={this.onLogin}>Log In</button>
        //   </div>
        // </div>