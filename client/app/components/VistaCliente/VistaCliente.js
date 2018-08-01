import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ReactAgenda , ReactAgendaCtrl, guid , getUnique , getLast , getFirst , Modal } from 'react-agenda';


import {
  getFromStorage,
  setInStorage,
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
      Name: "",
      isActive: false,
      isNutriologist: false,
      isLoading: true,
      token: '',
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    console.log(this.state.isActive)
    console.log('+===========+')
    console.log(localStorage.getItem('AssignedNutriologist'))
    console.log('=============')
    console.log(localStorage.getItem('Rol'));
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      console.log(token);
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json  => {
          if (json.success) {
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
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  handleDateRangeChange (startDate, endDate) {
    this.setState({startDate:startDate })

}


  onEditProfile() {
    const {signUpEmail, signUpFirstName, signUpLastName, signUpPassword} = this.state;
      fetch('/api/account/editprofile?token='+signUpEmail+'&token2='+signUpFirstName+'&token3='+signUpLastName+'&token4='+signUpPassword+'')
        .then(res => res.json())
        .then(json => {
          if (json.success) {
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

  onDelete(){
    const {signUpEmail} = this.state;
    fetch('/api/account/deleteaccount?token='+signUpEmail+'')
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

 onEditProfile() {
   console.log(this.state.signUpEmail)
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
      
      
           <div id="wrapper">

           <div id="sidebar-wrapper">
               <ul className="sidebar-nav">
                   <li className="sidebar-brand">
                       <a href="#">
                           Main Menu
                       </a>
                   </li>
                   <li>
                       <a href="#">Agenda</a>
                   </li>
                   <li>
                       <a href="#">Corporal Analisis</a>
                   </li>
                   <li>
                       <a href="#">Dieta</a>
                   </li>
                   <li>
                       <a href="#">Nutritional Blog</a>
                   </li>
                   <li>
                       <a href="#">About</a>
                   </li>
               </ul>
           </div>
           
           <div id="page-content-wrapper">
               <div className="container-fluid">
               <div className="col-md-6 img1">
                <div className="col-md-3">
                  <img height='120px' src='https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg' alt='Imagen1' />
                </div>
                <div className="col-md-3">
                  <p>Nombre: </p>
                  <p>Título: </p>
                  <p>Telefóno: </p>
                  <p>Correo: </p>
                </div>
            </div> 

               </div>
           </div>
           {/* {
             
             $("#menu-toggle").click(function(e) {
                 e.preventDefault();
                 $("#wrapper").toggleClass("toggled");
             })
           
           } */}
   
       </div>
               


      

    );
  }
}

export default VistaCliente;
