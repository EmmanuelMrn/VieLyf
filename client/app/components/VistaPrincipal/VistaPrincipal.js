import React, { Component } from "react";
import "whatwg-fetch";
import { getFromStorage, setInStorage } from "../../utils/storage";
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
      isLoading: true,
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
    
    this.handleInputChange = this.handleInputChange.bind(this);
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
    var nutriId = localStorage.getItem('Client_id');
    var nutriFirst = localStorage.getItem('ClientFirst');
    var nutriLast = localStorage.getItem('ClientLast');
    var nutriUser = localStorage.getItem('ClientUsername');
    var nutriEmail = localStorage.getItem('ClientEmail');
    var nutriPhone = localStorage.getItem('ClientPhone');

     return(
     <div className="container">
         <div className="row">
         
             <div className="col-4" align="center">
             <div className="col-md-6" align="center">
                 <br />
                  <img height='120px' src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"/>
             </div>
             <div className="col-md-6" align="center">
               <p className="text-center"><strong>{nutriFirst} {nutriLast}</strong></p>
               <p className="text-center"><em>UserName: {nutriUser}</em></p>
             </div>
 
             <div className="col-md-8" align="center">
               <ul className="list-group list-primary">
                 <a className="list-group-item">First Name: {nutriFirst}</a>
                 <a className="list-group-item">Last Name: {nutriLast}</a>
                 <a className="list-group-item">Email: {nutriEmail}</a>
                 <a className="list-group-item">Phone: {nutriPhone}</a>
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
  var clientId = localStorage.getItem('Client_id');
  var clientFirst = localStorage.getItem('ClientFirst');
  var clientLast = localStorage.getItem('ClientLast');
  var clientUser = localStorage.getItem('ClientUsername');
  var clientEmail = localStorage.getItem('ClientEmail');
  var clientPhone = localStorage.getItem('ClientPhone');
  return(
  <div className="container">
      <div className="row">
      
          <div className="col-4" align="center">
          <div className="col-md-6" align="center">
              <br />
              <img height='120px' src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"/>
          </div>
          <div className="col-md-6" align="center">
            <p className="text-center"><strong>{clientFirst} {clientLast}</strong></p>
            <p className="text-center"><em>UserName: {clientUser}</em></p>
          </div>

          <div className="col-md-8" align="center">
            <ul className="list-group list-primary">
              <a className="list-group-item">First Name: {clientFirst}</a>
              <a className="list-group-item">Last Name: {clientLast}</a>
              <a className="list-group-item">Email: {clientEmail}</a>
              <a className="list-group-item">Phone: {clientPhone}</a>
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
    var ClientsData = Array.from(this.state.items);
    if (localStorage.getItem('Rol') == "Nutriologo") {
      return (
        <div>
            {this.ProfileNutritionist()}
        </div>
      );
    } else if (localStorage.getItem('Rol') == "Cliente") {
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