import React, { Component } from "react";
import "whatwg-fetch";
import { Link } from "react-router-dom";
var vista = "";
import { getFromStorage, setInStorage } from "../../utils/storage";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
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
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      fetch("/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
            if (localStorage.hasOwnProperty("email")) {
              fetch(
                "/api/account/isnutriologist?token=" +
                  localStorage.getItem("email")
              )
                .then(res => res.json())
                .then(isnutriologit => {
                  if (isnutriologit.success) {
                    //                    setInStorage("userrole", { token: "Nutriologist" });

                    window.location = "/vistacliente";
                    //window.location=('/vistanutriologo');
                  } else {
                    //window.location = "/vistaprincipal";
                    //                  setInStorage("userrole", { token: "Client" });

                    window.location = "/vistacliente";
                  }
                });
            } else {
              this.setState({
                isLoading: false
              });
            }
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
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
        localStorage.setItem("email", json.Email);
        if (json.success) {
          setInStorage("the_main_app", { token: json.token._id });
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
                localStorage.setItem("Auth", loginEmail);
                window.location = "/vistacliente";
                //  window.location = "/vistanutriologo";
                localStorage.setItem("Rol", "Nutriologo");
              } else {
                var getuser;
                fetch("/api/account/getuseremail?token=" + loginEmail)
                  .then(res => res.json())
                  .then(json2 => {
                    localStorage.setItem('clientID', json2[0]._id);
                    fetch("/api/accounts/getuser?token=" + json2[0]._id)
                      .then(res => res.json())
                      .then(json3 => {
                        fetch(
                          "/api/account/getuserbyid?token=" +
                            json3.Nutritionist_id
                        )
                          .then(res => res.json())
                          .then(json4 => {
                            console.log("hola");
                            console.log(json4);
                            localStorage.setItem(
                              "AssignedNutriologist",
                              json4[0].Email
                            );
                          });
                      });
                  });
                localStorage.setItem("Rol", "Cliente");
                //    window.localtion = "/vistaprincipal";
                window.location = "/vistacliente";
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
      loginEmail: ""
    });
  }

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
      .then(json6 => {
        if (json6.success) {
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
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    if (!token) {
      return (
        <div>
          <div>
            {loginError ? <p>{loginError}</p> : null}
            <h1>Log In</h1>
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
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.onLogin}
            >
              Log In
            </button>
          </div>
        </div>
      );
    }

    return <div />;
  }
}

export default Login;
