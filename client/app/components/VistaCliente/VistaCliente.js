import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ReactAgenda , ReactAgendaCtrl, guid , getUnique , getLast , getFirst } from 'react-agenda';
import Modal from 'react-modal';

import {
  getFromStorage,
  setClientInStorage
} from '../../utils/storage';

var now = new Date();

require('moment/locale/es.js');
    var colors= {
      'color-1':"rgba(102, 195, 131 , 1)" ,
      "color-2":"rgba(242, 177, 52, 1)" ,
      "color-3":"rgba(235, 85, 59, 1)" ,
      "color-4":"rgba(70, 159, 213, 1)",
      "color-5":"rgba(170, 59, 123, 1)"
    }

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       :'#b9cb34'
  }
};

class VistaCliente extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNutriologist: false,
      isLoading: true,
      token: '',
      Name: "",
      isActive: false,
      signUpError: '',
      loginError: '',
      loginEmail: '',
      loginPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      items:[],
      token: '',
      selected:[],
      cellHeight:(60 / 4),
      showModal:false,
      locale:"fr",
      rowsPerHour:4,
      numberOfDays:4,
      Relation:'',
      startDate: new Date()
    }
    this.handleRangeSelection = this.handleRangeSelection.bind(this)
    this.handleItemEdit = this.handleItemEdit.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
    this._openModal = this._openModal.bind(this)
    this._closeModal = this._closeModal.bind(this)
    this.addNewEvent = this.addNewEvent.bind(this)
    this.removeEvent = this.removeEvent.bind(this)
    this.editEvent = this.editEvent.bind(this)
    this.changeView = this.changeView.bind(this)
    this.handleCellSelection = this.handleCellSelection.bind(this)
    this.onEditProfile = this.onEditProfile.bind(this);
    this.logout = this.logout.bind(this);
    this.agendaModal = this.agendaModal.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

onDelete(){
    const {signUpEmail} = this.state;
    fetch('/api/account/deleteaccount?token='+signUpEmail+'')
  }

removeEvent(items , item){

    this.setState({ items:items});
}

addNewEvent (items , newItems){
  this.setState({showModal:false ,selected:[] , items:items});
  this._closeModal();
}

editEvent (items , item){
  this.setState({showModal:false ,selected:[] , items:items});
  this._closeModal();
}

changeView (days , event ){
this.setState({numberOfDays:days})
}

_openModal(){
    this.setState({showModal:true})
  }

_closeModal(e){
    if(e){
      e.stopPropagation();
      e.preventDefault();
    }
    console.log('test');
      this.setState({showModal:false})
  }

handleRangeSelection (selected) {
    this.setState({selected:selected , showCtrl:true})
    this._openModal();
    
  }

handleItemEdit(item, openModal) {
    if(item && openModal === true){
      this.setState({selected:[item] })
      return this._openModal();
    }
  }

  handleCellSelection(item, openModal) {
    if(this.state.selected && this.state.selected[0] === item){
      return  this._openModal();
    }
       this.setState({selected:[item] })
  }

zoomIn(){
var num = this.state.cellHeight + 15
    this.setState({cellHeight:num})
}

zoomOut(){
    var num = this.state.cellHeight - 15
    this.setState({cellHeight:num})
} 

toggleModal() {
    this.setState({
      isActive:!this.state.isActive,
      signUpEmail:'',
      signUpFirstName:'',
      signUpLastName:'',
      signUpPassword:''
    })
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
    console.log(localStorage.getItem('AssignedNutriologist'))
    console.log('=============')
    console.log(localStorage.getItem('Rol'));
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      console.log(token);
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
            //get user
            fetch('/api/accounts/GetUserFromUserSession?token='+token)
            .then(res => res.json())
            .then(json => {
              console.log(json)
              this.GetMyClientsUser(json.userId)
              console.log(json.userId);
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
          console.log(json)
          
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  handleDateRangeChange (startDate, endDate) {
    this.setState({startDate:startDate })

}


GetMyClientsUser(ClientsId){
    fetch('/api/accounts/GetMyClientsUser?Clients='+ClientsId, {method:'GET'})
    .then(res => res.json())
    .then (json=> {
        json.map(function(client,index){
        setClientInStorage('myClient', client);
        });
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
    localStorage.removeItem('the_main_app');
    localStorage.removeItem('email');
    localStorage.removeItem('Auth');
    localStorage.removeItem('Rol');
    window.location=('/login');
  }

  agendaModal() {
    console.log("============");
    console.log("Abrir modal");
    console.log("============");
    this.setState({showModal:true})
    console.log()
  }

  handleItemSize(items , item){
    this.setState({items:items})
  }

  handleItemChange(items , item){
    console.log('testfqefqefq');
    this.setState({items:items})
  }

  render() {

    const {
      isLoading,
      token,
      loginError,
      loginEmail,
      loginPassword,
      Name
    } = this.state;
    
    return (
      <div>
        <h1>Cuenta Cliente</h1>
        <div className="row">
            <div className="col-md-3">
                <div className="btn-group-vertical">
                    <button type="button" className="btn btn-dark">Página principal</button>
                    <Link to="/charts" className="btn btn-dark">Análisis Corporal</Link>
                    <Link to="/diet" className="btn btn-dark">Calendario de Dieta</Link>
                    <button type="button" className="btn btn-dark">Progreso</button>
                    <button type="button" className="btn btn-dark" onClick={this.agendaModal}>Agendar Cita</button>
                </div>
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

          <div className="col-md-3">
            <button type="button" className="btn btn-dark" onClick={this.toggleModal}>Account Settings</button><br/>
            <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal}style ={customStyles}>
              <p>Edit profile</p>
              <input
                type="firstName"
                name="signUpFirstName"
                placeholder="First Name"
                value={this.state.signUpFirstName}
                onChange={this.handleInputChange}
              />
              <br />
              <input
                type="lastName"
                name="signUpLastName"
                placeholder="Last Name"
                value={this.state.signUpLastName}
                onChange={this.handleInputChange}
              />
              <br />
              <input
                type="email"
                name="signUpEmail"
                placeholder="Email"
                value={this.state.signUpEmail}
                onChange={this.handleInputChange}
              />
              <br />

              <input
                type="password"
                name="signUpPassword"
                placeholder="Password"
                value={this.state.signUpPassword}
                onChange={this.handleInputChange}
              />

              <br />
              <button
                type="button"
                className="btn btn-dark"
                onClick={this.onEditProfile}>
                Save changes
              </button>
              <button type="button" className="btn btn-dark" onClick={this.onDelete}>Delete account</button>
              <button onClick={this.toggleModal}>Cancel</button>
            </Modal>
          </div>
        
        <button type="button" className="btn btn-dark" onClick={this.logout}>
          Logout
        </button>
      </div>

      
    );
  }
}

export default VistaCliente;
