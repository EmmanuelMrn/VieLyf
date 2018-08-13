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
    const { loginEmail, loginPassword } = this.state;
   
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
          // .id!?
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
                console.log(loginEmail)
                fetch('/api/account/getuseremail?token='+loginEmail)
                .then(res => res.json())
                .then(json2 => {
                  console.log("Entro a getuseremail")
                  console.log(loginEmail)
                  localStorage.setItem('clientID', json2[0]._id);
                  fetch('/api/accounts/getuser?token='+json2[0]._id)
                  .then(res => res.json())
                  .then(json3 => {
                    console.log("Entro a getuser")
                    console.log(json2[0]._id)
                    fetch('/api/account/getuserbyid?token='+json3.doc.Nutritionist_id)
                    .then(res => res.json())
                    .then(json4 => {
                      console.log("Entro a getuserbyid")
                      console.log(json2[0]._id)
                      console.log(json4[0].Email)
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
          <div className="container container2">
            <div className="row">
              <div className="col-md-4 login-sec">
                <h2 className="text-center" style={{color: '#00c851'}}>Welcome back!</h2>
                <form className="login-form">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Username</label>
                    <input type="text" name="loginEmail" value={loginEmail} onChange={this.handleInputChange} className="form-control" placeholder=""/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                    <input type="password" name="loginPassword" value={loginPassword} onChange={this.handleInputChange} className="form-control" placeholder=""/>                    
                  </div>
                  <div className="form-check">
                      {/* <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"/>
                        <small>Remember Me</small>
                      </label> */}
                    <button type="button" className="btn btn-login float-center" onClick={this.onLogin}>Submit</button>
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
                            <h2>Solutions for health</h2>
                            <h5 style={{color: '#e5c885', backgroundColor: '#fff'}}>In Vielyf we have the determination to create the best software for you and your needs.</h5>
                        </div>	
                      </div>
                    </div>
                    {/* width="1100px" height="500px" */}
                    <div className="carousel-item">
                    <img className="d-block img-fluid"  src="/assets/img/img2.png" alt="First slide"/>
                      <div className="carousel-caption d-none d-md-block">
                        <div className="banner-text">
                            <h2>Solutions for life</h2>
                            <h5 style={{color: '#9e6d4a', backgroundColor: '#fff'}}>And Yes, it is posible, and No, it isn't easy.</h5>
                        </div>	
                      </div>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block img-fluid" width="1100px" height="500px" src="/assets/img/img3.png" alt="First slide"/>
                      <div className="carousel-caption d-none d-md-block">
                        <div className="banner-text">
                            <h2>Solutions for you</h2>
                            <h5 style={{color: '#95b3cf', backgroundColor: '#fff'}}>We offer you the best technologies for the best life quality.</h5>
                        </div>	
                      </div>
                    </div>
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