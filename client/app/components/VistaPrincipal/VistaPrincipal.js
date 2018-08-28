import React, { Component } from "react";
import "whatwg-fetch";
import moment from "moment";
import { getFromStorage, setInStorage } from "../../utils/storage";
import {
  ReactAgenda,
  ReactAgendaCtrl,
  guid,
  getUnique,
  getLast,
  getFirst,
  Modal
} from "react-agenda";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

var now = new Date();
require("moment/locale/es.js");
var colors = {
  "color-1": "rgba(102, 195, 131 , 1)",
  "color-2": "rgba(242, 177, 52, 1)",
  "color-3": "rgba(235, 85, 59, 1)",
  "color-4": "rgba(70, 159, 213, 1)",
  "color-5": "rgba(170, 59, 123, 1)"
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#b9cb34"
  }
};

class VistaPrincipal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
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
      isToggleOn: true,
      items: [],
      token: "",
      selected: [],
      cellHeight: 60 / 4,
      showModal: false,
      locale: "fr",
      rowsPerHour: 4,
      numberOfDays: 4,
      Relation: "",
      startDate: new Date(),
      UserProfile:[],
       goProfile:"Loading"
    };
    this.handleRangeSelection = this.handleRangeSelection.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this.addNewEvent = this.addNewEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.changeView = this.changeView.bind(this);
    this.handleCellSelection = this.handleCellSelection.bind(this);
    this.onEditProfile = this.onEditProfile.bind(this);
    this.logout = this.logout.bind(this);
    this.agendaModal = this.agendaModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
    console.log(isToggleOn);
  }

  removeEvent(items, item) {
    this.setState({ items: items });
  }

  addNewEvent(items, newItems) {
    this.setState({ showModal: false, selected: [], items: items });
    this._closeModal();
  }

  editEvent(items, item) {
    this.setState({ showModal: false, selected: [], items: items });
    this._closeModal();
  }

  changeView(days, event) {
    this.setState({ numberOfDays: days });
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({ showModal: false });
  }

  handleRangeSelection(selected) {
    this.setState({ selected: selected, showCtrl: true });
    this._openModal();
  }

  handleItemEdit(item, openModal) {
    if (item && openModal === true) {
      this.setState({ selected: [item] });
      return this._openModal();
    }
  }

  handleCellSelection(item, openModal) {
    if (this.state.selected && this.state.selected[0] === item) {
      return this._openModal();
    }
    this.setState({ selected: [item] });
  }

  zoomIn() {
    var num = this.state.cellHeight + 15;
    this.setState({ cellHeight: num });
  }

  zoomOut() {
    var num = this.state.cellHeight - 15;
    this.setState({ cellHeight: num });
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

  aceptar() {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

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

  handleDateRangeChange(startDate, endDate) {
    this.setState({ startDate: startDate });
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

  agendaModal() {
    this.setState({ showModal: true });
  }

  handleItemSize(items, item) {
    this.setState({ items: items });
  }

  handleItemChange(items, item) {
    this.setState({ items: items });
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
 
 ChangeProfile(){
     if(this.state.goProfile=="NotFound"){
        return (
            <div>
               <h1>Sorry User Not Found :(</h1>
            </div>
               
        ) 
     }else if(this.state.goProfile=="Found"){
         return (
             <div>
                 {this.Profile()}
             </div>   
         )
     }else if(this.state.goProfile=="Loading"){
         return (
             <div>
                <h1>Loading...</h1>
             </div>   
         )
     }    
 }
 
 Profile(){
     var user = this.state.UserProfile
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
                     <h3 align="center">Profile usando el .js<p><small>Profile's Content</small></p></h3>
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
          <h1>Nutritionist Account</h1>
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
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={this.logout}>
                  Log out
                </button>
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
                <p>Name : </p>
                <p>Phone: </p>
                <p>Email: </p>
              </div>
            </div>

            <div className="col-md-3 right_sidebar_area">
              <aside className="right_widget r_news_widget">
                
                <div className="news_inner">
                  {ClientsData.map(function(
                    client,
                    aceptar,
                    negar,
                    handleClick,
                    isToggleOn
                  ) {
                    var dia = new Date(client.startDateTime).getDay();
                    var anio = new Date(client.startDateTime).getFullYear();
                    var monthMinusOneName = moment()
                      .subtract(
                        new Date(client.startDateTime).getMonth(),
                        "month"
                      )
                      .startOf("month")
                      .format("MMMM");
                    var diferencia =
                      new Date(client.startDateTime).getHours() -
                      new Date(client.endDateTime).getHours();
                    console.log(
                      moment.duration(diferencia, "hours").humanize()
                    );
                    return (
                      <div key={client._id} className="news_item">
                        <a>
                          <h4>{client.name}</h4>
                        </a>
                        <a>
                          <h6>
                            {"Para: " +
                              dia +
                              " de " +
                              monthMinusOneName +
                              " del " +
                              anio}
                          </h6>
                        </a>
                        <a>
                          <h6>
                            {"Con una duracion de " +
                              moment.duration(diferencia, "hours").humanize()}
                          </h6>
                        </a>
                        <button
                          type="button"
                          id="hide"
                          name=""
                          className="btn btn-dark"
                          onClick={function aceptar() {
                            fetch(
                              "/api/account/editagenda?token=" + client._id
                            );
                          }}
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          name=""
                          className="btn btn-dark"
                          onClick={function aceptar() {
                            fetch("/api/account/deleteagenda?token=" + client._id);
                          }}
                        >
                          Deny
                        </button>
                      </div>
                    );
                  })}
                </div>
              </aside>
            </div>
          </div>
        </div>
      );
    } else if (localStorage.getItem("Rol") == "Cliente") {
      return (
        <div>
          <h1>Client Account</h1>
          <div className="row">
            <div className="col-md-3">
              <div className="btn-group-vertical">
                <Link to="/charts" className="btn btn-dark">
                  Corporal Analysis
                </Link>
                <Link to="/diet" className="btn btn-dark">
                  Diet Calendar
                </Link>
                <button type="button" className="btn btn-dark">
                  Progress
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={this.agendaModal}
                >
                  Make a date
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={this.toggleModal}
                >
                  Account Settings
                </button>
                <br />
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
                <p>Name: {this.state.Name}</p>
                <p>Age: </p>
                <p>Height: </p>
                <p>Weight: </p>
              </div>
            </div>

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
          <button type="button" className="btn btn-dark" onClick={this.logout}>
            Logout
          </button>
          {this.state.showModal ? (
            <Modal clickOutside={this._closeModal}>
              <div className="modal-content">
                <ReactAgendaCtrl
                  items={this.state.items}
                  itemColors={colors}
                  selectedCells={this.state.selected}
                  Addnew={this.addNewEvent}
                  edit={this.editEvent}
                />
              </div>
            </Modal>
          ) : (
            ""
          )}
              
        </div>

      );
    } else {
      return <div>No session found</div>;
    }
  }
}

export default VistaPrincipal;
