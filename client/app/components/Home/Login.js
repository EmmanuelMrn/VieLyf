import React, { Component } from "react";
import "whatwg-fetch";

var vista = "";

import { getFromStorage, setInStorage } from "../../utils/storage";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      _id: "",
      signUpError: "",
      loginError: "",
      loginEmail: "",
      loginPassword: "",
      signUpEmail: "",
      signUpPassword: "",
      signUpFirstName: "",
      signUpLastName: ""
    };

    this.onLogin = this.onLogin.bind(this);
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
      fetch("/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            }.then(() => {
              window.location=('/vistaprincipal')
            }));
          }
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
    fetch('/api/account/getuseremail?token='+localStorage.getItem('email'), {method:'GET'})
        .then(res => res.json())
        .then(userdata => {
          localStorage.setItem('Client_ID', userdata[0]._id);  
          localStorage.setItem('ClientFirst', userdata[0].FirstName);  
      });
  }

  onLogin() {
    const { loginEmail, loginPassword } = this.state;
   
    this.setState({
      isLoading: true
    });

    fetch("/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Email: loginEmail,
        Password: loginPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('email', json.Email);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          setInStorage('El_token', {token:json.token} );
          this.setState({
            loginError: json.message,
            isLoading: false, 
            loginPassword: "",
            token: json.token
          });
          fetch("/api/account/isnutriologist?token=" + loginEmail)
            .then(res => res.json())
            .then(json1 => {
              if (json1.success) {
                localStorage.setItem('Auth', loginEmail);
                fetch('/api/account/getuseremail?token='+loginEmail)
                .then(res => res.json())
                .then(json2 => {
                  localStorage.setItem('Client_id', json2[0]._id);
                  localStorage.setItem('ClientLast', json2[0].LastName);
                  localStorage.setItem('ClientFirst', json2[0].FirstName);
                  localStorage.setItem('ClientEmail', json2[0].Email);
                  localStorage.setItem('ClientPhone', json2[0].Phone);
                  localStorage.setItem('ClientUsername', json2[0].UserName);
                }).then(() => {
                  localStorage.setItem('Rol', 'Nutriologo');
                  window.location = "/vistaprincipal";
                  alertify.success("Welcome!");
                })
              } else {
                fetch('/api/account/getuseremail?token='+loginEmail)
                .then(res => res.json())
                .then(json2 => {
                  localStorage.setItem('ClientLast', json2[0].LastName);
                  localStorage.setItem('ClientFirst', json2[0].FirstName);
                  localStorage.setItem('Client_id', json2[0]._id);
                  localStorage.setItem('ClientEmail', json2[0].Email);
                  localStorage.setItem('ClientPhone', json2[0].Phone);
                  localStorage.setItem('ClientUsername', json2[0].UserName);
                  fetch('/api/accounts/getuser?token='+json2[0]._id)
                  .then(res => res.json())
                  .then(json3 => {
                    if (json3.doc != null) {
                      fetch('/api/account/getuserbyid?token='+json3.doc.Nutritionist_id)
                      .then(res => res.json())
                      .then(json4 => {
                      localStorage.setItem('AssignedNutriologist', json4[0].Email)
                      localStorage.setItem('clientID', json2[0]._id);
                    
                      }).then( ()=> {
                        localStorage.setItem('Rol', 'Cliente');  
                        window.location=('/vistaprincipal');
                        alertify.success("Welcome!");
                      })
                    } else {
                      localStorage.setItem('Rol', 'Cliente');  
                      window.location=('/vistaprincipal');
                      alertify.success("Welcome!");
                    }
                  })       
                })
              }
            });      
        } else {
          this.setState({
            loginError: json.message,
            isLoading: false
          });
        }
      });
    this.setState({
      loginEmail: "",
      loginPassword: ""
    });
  }
 
  render() {
    const {
      isLoading,
      token,
      loginError,
      loginEmail,
      loginPassword
    } = this.state;

    let userMessage
    if (!loginError || loginError == 'Valid sign in') {
      userMessage = (
        <span>
          <h2 className="text-center" style={{color: '#00c851'}}>Welcome Back!</h2>
        </span>
      )
    } else {
      userMessage = (
        <h2 className="text-center" style={{color: 'red'}}>{loginError}</h2>
      )
    }

    return (
      <div>
        <section className="login-block" style={{padding: '90px'}}>
          <div className="container container2">
            <div className="row">
              <div className="col-md-4 login-sec">
                {userMessage}
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
                    <button type="button" className="btn btn-login float-center" onClick={this.onLogin}>
                      Log in
                    </button>
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
                            <h5 style={{color: '#e5c885', backgroundColor: 'rgb(255,255,255,.3)'}}>In Vielyf we have the determination to create the best software for you and your needs.</h5>
                        </div>	
                      </div>
                    </div>
                    {/* width="1100px" height="500px" */}
                    <div className="carousel-item">
                    <img className="d-block img-fluid"  src="/assets/img/img2.png" alt="First slide"/>
                      <div className="carousel-caption d-none d-md-block">
                        <div className="banner-text">
                            <h2>Solutions for life</h2>
                            <h5 style={{color: '#9e6d4a', backgroundColor: 'rgb(255,255,255,.3)'}}>And Yes, it is posible, and No, it isn't easy.</h5>
                        </div>	
                      </div>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block img-fluid" width="1100px" height="500px" src="/assets/img/img3.png" alt="First slide"/>
                      <div className="carousel-caption d-none d-md-block">
                        <div className="banner-text">
                            <h2>Solutions for you</h2>
                            <h5 style={{color: '#95b3cf', backgroundColor: 'rgb(255,255,255,.3)'}}>We offer you the best technologies for the best life quality.</h5>
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
