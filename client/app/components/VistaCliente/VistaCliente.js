import React, { Component } from 'react';
import 'whatwg-fetch';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
    
  const routes = [
      {
        path: "/agenda",
        exact: true,
        sidebar: () => <a href="#">Agenda</a>,
        main: () => <a href="#">Agenda</a>
      },
      {
        path: "/nutritionalBlog",
        sidebar: () => <a href="#">Nutrirional Blog</a>,
        main: () => <a href="#">Nutritional Blog</a>
      },
      {
        path: "/catalogueNutriologist",
        sidebar: () => <a href="#">Nutriologist Catalogue</a>,
        main: () => <a href="#">Nutriologist Catalogue</a>
      },
      {
        path: "/charts",
        exact: true,
        sidebar: () => <a href="#">Charts</a>,
        main: () => <a href="#">Charts</a>
      },
      {
        path: "/diet",
        exact: true,
        sidebar: () => <a href="#">Diet</a>,
        main: () => <a href="#">Diet</a>
      }
    ]

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
    // console.log(this.state.isActive)
    // console.log('+===========+')
    // console.log(localStorage.getItem('AssignedNutriologist'))
    // console.log('=============')
    // console.log(localStorage.getItem('Rol'));
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
    this.setState({
      items: [
        {
          path: "/agenda",
          exact: true,
          sidebar: () => <a href="#">Agenda</a>,
          main: () => <a href="#">Agenda</a>
        },
        {
          path: "/nutritionalBlog",
          sidebar: () => <a href="#">Nutrirional Blog</a>,
          main: () => <a href="#">Nutritional Blog</a>
        },
        {
          path: "/catalogueNutriologist",
          sidebar: () => <a href="#">Nutriologist Catalogue</a>,
          main: () => <a href="#">Nutriologist Catalogue</a>
        },
        {
          path: "/charts",
          exact: true,
          sidebar: () => <a href="#">Charts</a>,
          main: () => <a href="#">Charts</a>
        },
        {
          path: "/diet",
          exact: true,
          sidebar: () => <a href="#">Diet</a>,
          main: () => <a href="#">Diet</a>
        }
      ]
    }, function() {
      console.log(this.state.items)
    })
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

    var ClientsData = Array.from(this.state.items);

    return (
      
      
           
<Router>
  {/* <div id="wrapper"> */}

           {/* <div id="sidebar-wrapper">
               <ul className="sidebar-nav"> */}
                   {/* <li className="sidebar-brand">
                       <a href="#">
                           Main Menu
                       </a>
                   </li> */}
                   {/* <ul style={{ listStyleType: "none", padding: 0 }}>

                <li>
                  <Link to="/Agenda#">Agenda</Link>
                </li>
                <li>
                  <Link to="/nutritionalblog">Nutrirional Blog</Link>
                </li>
                <li>
                  <Link to="/catalogueNutriologist">Nutriologist Catalogue</Link>
                </li>
                <li>
                  <Link to="/charts">Charts</Link>
                </li>
                <li>
                  <Link to="/diet">Diet</Link>
                </li>
                </ul>
               </ul>
           </div> */}
           
           <div id="page-content-wrapper">
           <div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              padding: "10px",
              width: "40%",
              background: "#f0f0f0"
            }}
          >

            
    
            {routes.map((route, index) => (
              // You can render a <Route> in as many places
              // as you want in your app. It will render along
              // with any other <Route>s that also match the URL.
              // So, a sidebar or breadcrumbs or anything else
              // that requires you to render multiple things
              // in multiple places at the same URL is nothing
              // more than multiple <Route>s.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.sidebar}
              />
            ))}
          </div>
    
          <div style={{ flex: 1, padding: "10px" }}>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </div>
        </div>
          
{/* </div>   */}
           </div>
           {/* {
             
             $("#menu-toggle").click(function(e) {
                 e.preventDefault();
                 $("#wrapper").toggleClass("toggled");
             })
           
           } */}
   
      

       </div>
               

</Router>
    );
  }
}

export default VistaCliente;
