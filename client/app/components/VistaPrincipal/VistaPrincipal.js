import React, { Component } from "react";
import "whatwg-fetch";
import { getFromStorage, setInStorage } from "../../utils/storage";
import Modal from 'react-modal';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

require("moment/locale/es.js");

class VistaPrincipal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: "",
      isActive: false,
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
      items: [],
      token: "",
      UserProfile:[],
       goProfile:"Loading"
    };
    this.onEditProfile = this.onEditProfile.bind(this);
    this.logout = this.logout.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value
      },
      function() {
      }
    );
  }

  /*
  aceptar() {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  */

  componentDidMount() {
    console.log(localStorage.getItem('ClientInfo'))
    console.log(localStorage.getItem('clientID'));
    var UserNameRequest=(window.location.pathname).slice(9);
    this.UserProfile(UserNameRequest);
    fetch("/api/account/getuserbyid?token=5b5f3bbe15c2a80434feb939",//+localStorage.getItem('clientID'),
  {method:'GET'})
  .then(res => res.json())
  .then(json=>{
    this.setState({
      Name:json[0].FirstName,
      Age:json[0].Phone,

    })
  })
    console.log(localStorage.getItem('AssignedNutriologist'))
    console.log(localStorage.getItem("Rol"));
    if (localStorage.getItem("Rol") == "Nutriologo") {
      console.log("true nutriologo");
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
    } else {
      console.log(this.state.isActive);
    }
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      console.log(token);
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
    window.location = "/";
    alertify.warning("Closed session");
  }

  onDelete() {
    const { signUpEmail } = this.state;
    fetch("/api/account/deleteaccount?token=" + signUpEmail + "");
    this.toggleModal();
    alertify.error("Your account was deleted");
  }

  toggleModal() {
    this.setState({
      isActive: !this.state.isActive,
      signUpEmail: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpPassword: ""
    });
  }

  onEditProfile() {
    this.toggleModal();
    console.log(this.state.signUpEmail);
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
      alertify.success("Edited profile");
  }
  
  UserProfile(UserNameRequest){
    fetch('/api/account/getUserByUserName?PathName='+UserNameRequest)
   .then(res => res.json())
   .then (json=> {
       if (json.doc == null){
           this.setState({
             goProfile:"NotFound"
           });
       }else{
         this.setState({
             UserProfile:json.doc,
             goProfile:"Found"
           });
       }
       
   });
  }
 
  ProfileNutritionist(){
     var user = this.state.UserProfile;
     return(
     <div className="container">
         <div className="row">
         
             <div className="col-4">
             <div className="col-md-6" align="center">
                 <br />
                     <img height='120px' src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"/>
             </div>
             <div className="col-md-6">
                     <p className="text-center"><strong>{user.FirstName} {user.LastName}</strong></p>
               <p className="text-center"><em>UserName: {user.Email}</em></p>
             </div>
 
             <div className="col-md-8">
               <br />
               <ul className="list-group list-primary">
                         <a className="list-group-item">First Name: {user.FirstName}</a>
                 <a className="list-group-item">Last Name: {user.LastName}</a>
                 <a className="list-group-item">Phone: {user.Phone}</a>
                 <a className="list-group-item">Email: {user.Email}</a>
                 <a className="list-group-item">Role: {user.Role}</a>
             </ul>
           </div>   
             </div>
 
             
             <div className="col-8">
                 <br />
                 <div className="col-md-12" align="center">
                     <h3 align="center">Nutritionist Account<p><small>Profile's Content</small></p></h3>
                 </div>
                 <br />
                 <div className="card text-center">
                     <div className="card-header">
                         Featured
                     </div>
                     <div className="card-body">
                         <h5 className="card-title">Content</h5>
                         <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                         <a href="#" className="btn btn-primary">Go somewhere</a>
                     </div>
                     <div className="card-footer text-muted">
                         2 days ago
                     </div>
                 </div>
             </div>
             </div>           
     </div>
     )
  }

  ProfileClient(){
  var user = this.state.UserProfile;
  return(
  <div className="container">
      <div className="row">
      
          <div className="col-4">
          <div className="col-md-6" align="center">
              <br />
                  <img height='120px' src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"/>
          </div>
          <div className="col-md-6">
                  <p className="text-center"><strong>{user.FirstName} {user.LastName}</strong></p>
            <p className="text-center"><em>UserName: {user.Email}</em></p>
          </div>

          <div className="col-md-8">
            <br />
            <ul className="list-group list-primary">
                      <a className="list-group-item">First Name: {user.FirstName}</a>
              <a className="list-group-item">Last Name: {user.LastName}</a>
              <a className="list-group-item">Phone: {user.Phone}</a>
              <a className="list-group-item">Email: {user.Email}</a>
              <a className="list-group-item">Role: {user.Role}</a>
          </ul>
        </div>   
          </div>

          
          <div className="col-8">
              <br />
              <div className="col-md-12" align="center">
                  <h3 align="center">Client Account<p><small>Profile's Content</small></p></h3>
                  
              </div>
              <br />
              <div className="card text-center">
                  <div className="card-header">
                      Featured
                  </div>
                  <div className="card-body">
                      <h5 className="card-title">Content</h5>
                      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                      <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                  <div className="card-footer text-muted">
                      2 days ago
                  </div>
              </div>
          </div>
          </div>           
  </div>
  )
  }

  /*modalEdit(){
    const prueba = this.state.goProfile;
    console.log(this.state.Name);
    const {
      isLoading,
      token,
      loginError,
      loginEmail,
      loginPassword,
      items,
      Name
    } = this.state;
    var ClientsData = Array.from(this.state.items);

    return(
      <div>
      {this.state.isActive ? (
        <Modal onRequestClose={this.toggleModal} style={customStyles}>
          <p>Edit profile</p>
          <input
            type="firstName"
            name="signUpFirstName"
            placeholder="Nombre"
            value={this.state.signUpFirstName}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            type="lastName"
            name="signUpLastName"
            placeholder="Apellido"
            value={this.state.signUpLastName}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            type="email"
            name="signUpEmail"
            placeholder="Correo electronico"
            value={this.state.signUpEmail}
            onChange={this.handleInputChange}
          />
          <br />

          <input
            type="password"
            name="signUpPassword"
            placeholder="Contraseña"
            value={this.state.signUpPassword}
            onChange={this.handleInputChange}
          />

          <br />
          <button
          id="btnEdit"
          type="button"
          className="btn btn-dark"
          onClick={this.onEditProfile}>
            Submit changes
          </button>

          <button
            type="button"
            className="btn btn-dark"
            onClick={this.onDelete}>
              Delete Account
          </button>
          <button onClick={this.toggleModal}>Cancel</button>
        </Modal>
      ) : (
        ""
      )}
      </div>
    );
  }
  */

  render() {
    const prueba = this.state.goProfile;
    console.log(this.state.Name);
    const {
      isLoading,
      token,
      loginError,
      loginEmail,
      loginPassword,
      items,
      Name
    } = this.state;
    var ClientsData = Array.from(this.state.items);
    if (localStorage.getItem("Rol") == "Nutriologo") {
      return (
        <div>
            {this.ProfileNutritionist()}
        </div>
      );
    } else if (localStorage.getItem("Rol") == "Cliente") {
      return (
        <div>
            {this.ProfileClient()}               
        </div>
      );
    } else {
      return <div>No session found</div>;
    }
  }
}

export default VistaPrincipal;