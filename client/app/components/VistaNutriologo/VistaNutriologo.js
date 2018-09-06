import React, { Component } from "react";
import "whatwg-fetch";
import { Link } from "react-router-dom";
import moment from "moment";

import { getFromStorage, setInStorage } from "../../utils/storage";

class VistaNutriologo extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    console.log(localStorage.getItem('Client_id'))
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
    // console.log(obj)
    if (obj && obj.token) {
      const { token } = obj;
      // console.log(token);
      //   Verify token
      fetch("/api/account/verify?token=" + token)
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
    } else {
      this.setState({
        isLoading: false
      });
    }
    // console.log(token);
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
    localStorage.removeItem("the_main_app");
    localStorage.removeItem("email");
    localStorage.removeItem("Auth");
    localStorage.removeItem("Rol");
    window.location = "/login";
    alertify.warning("Closed session");
  }

  aceptar() {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(name);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
    console.log(isToggleOn);
  }

  negar() {}

  render() {
    const {
      isLoading,
      token,
      loginError,
      loginEmail,
      loginPassword,
      items,
      Name
    } = this.state;
    //if()
    var ClientsData = Array.from(this.state.items);

    return (
      <div>
        <h1>Cuenta Nutriólogo</h1>
        <div className="row">
          <div className="col-md-3">
            <div className="btn-group-vertical">
              <button type="button" className="btn btn-dark">
                Calendar
              </button>
              <Link to="/transition" className="btn btn-dark">
                Create diet
              </Link>
              <Link to="/agenda" className="btn btn-dark">
                Diary
              </Link>
              {/* <br/> */}
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
              <p>Name: </p>
              <p>Title: </p>
              <p>Phone: </p>
              <p>Email: </p>
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default VistaNutriologo;
