import React, { Component } from "react";
import "whatwg-fetch";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  ReactAgenda,
  ReactAgendaCtrl,
  guid,
  getUnique,
  getLast,
  getFirst,
  Modal
} from "react-agenda";

import { getFromStorage, setInStorage } from "../../utils/storage";

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

class VistaCliente extends Component {
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
      startDate: new Date()
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
    console.log("test");
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
        console.log(name + value);
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
    console.log(name);
  }
  componentDidMount() {
    console.log("Hello");
    console.log(localStorage.getItem("Rol"));
    console.log("=============");
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
      console.log(localStorage.getItem("AssignedNutriologist"));
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
    window.location = "/";
  }

  agendaModal() {
    console.log("============");
    console.log("Abrir modal");
    console.log("============");
    this.setState({ showModal: true });
    console.log();
  }

  handleItemSize(items, item) {
    this.setState({ items: items });
  }

  handleItemChange(items, item) {
    console.log("testfqefqefq");
    this.setState({ items: items });
  }

  onDelete() {
    const { signUpEmail } = this.state;
    fetch("/api/account/deleteaccount?token=" + signUpEmail + "");
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
  }

  Profile(){
    var user = this.state.UserProfile
    return(

    <div class="container">
        <div class="row">

            <div class="col-4">
        		<div class="col-md-6" align="center">
                <br />
                    <img height='120px' src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"/>
        		</div>
        		<div class="col-md-6">
                    <p class="text-center"><strong>{user.FirstName} {user.LastName}</strong></p>
	        		<p class="text-center"><em>UserName: {user.Email}</em></p>
        		</div>

        		<div class="col-md-8">
        			<br />
        			<ul class="list-group list-primary">
                <a class="list-group-item">First Name: {user.FirstName}</a>
        				<a class="list-group-item">Last Name: {user.LastName}</a>
        				<a class="list-group-item">Phone: {user.Phone}</a>
        				<a class="list-group-item">Email: {user.Email}</a>
        				<a class="list-group-item">Role: {user.Role}</a>
    				</ul>
    			</div>   
            </div>

            
            <div class="col-8">
                <br />
                <div class="col-md-12" align="center">
                    <h3 align="center">Profile <p><small>Profile's Content</small></p></h3>
                </div>
                <br />
                <div class="card text-center">
                    <div class="card-header">
                        Featured
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Content</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                    <div class="card-footer text-muted">
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
    if (localStorage.getItem("Rol") == "Nutriologo") {
      return (
        <div>
          <h1>Cuenta Nutriólogo </h1>
          Hello nutriologo
          <div className="row">
            <div className="col-md-3">
              <div className="btn-group-vertical">
                <button type="button" className="btn btn-dark">
                  Calendario
                </button>
                <Link to="/transition" className="btn btn-dark">
                  Crear Dieta
                </Link>
                <Link to="/agenda" className="btn btn-dark">
                  Agenda
                </Link>
                {/* <br/> */}
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={this.logout}
                >
                  Cerrar sesion
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
                <ul class="list-group list-primary">
                  <a class="list-group-item">First Name: {user.FirstName} {user.LastName}</a>
                  <a class="list-group-item">Phone: {user.Phone}</a>
                  <a class="list-group-item">Email: {user.Email}</a>
    				    </ul>
              </div>
            </div>

            <div className="col-md-3 right_sidebar_area">
              <aside className="right_widget r_news_widget">
                <div className="r_w_title">
                  <h3>Noticias recientes</h3>
                </div>
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
                          Aceptar
                        </button>
                        <button
                          type="button"
                          name=""
                          className="btn btn-dark"
                          onClick={function aceptar() {
                            fetch(
                              "/api/account/deleteagenda?token=" + client._id
                            );
                          }}
                        >
                          Denegar
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
          <h1>Cuenta Cliente</h1>
          <div className="row">
            <div className="col-md-3">
              <div className="btn-group-vertical">
                <Link to="/charts" className="btn btn-dark">
                  Análisis Corporal
                </Link>
                <Link to="/diet" className="btn btn-dark">
                  Calendario de Dieta
                </Link>
                <button type="button" className="btn btn-dark">
                  Progreso
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={this.agendaModal}
                >
                  Agendar Cita
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
                <p>Nombre: </p>
                <p>Edad: </p>
                <p>Estatura: </p>
                <p>Peso: </p>
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
                  type="button"
                  className="btn btn-dark"
                  onClick={this.onEditProfile}
                >
                  Salvar cambios
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={this.onDelete}
                >
                  Eliminar cuenta
                </button>
                <button onClick={this.toggleModal}>Cancelar</button>
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
      return <div>no session found</div>;
    }
  }
}

export default VistaCliente;
