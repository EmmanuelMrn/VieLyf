import React, { Component,Children } from 'react';
import 'whatwg-fetch';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Card,CardTitle,CardText } from 'reactstrap';
import {
  setClientInStorage,
  getFromStorage,
} from '../../utils/storage';

class Transition extends Component {
  constructor() {
    super();

    this.state = {
        clientsId:[],
        clientsDataRegistered:[],
        clientsData:[],
        currentUserId:'',
        isLoading: true,
        NutritionistAccount: false,
        modal: false,
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: 0,
    };
    this.toggle = this.toggle.bind(this);
    this.handleClickSubmmit = this.handleClickSubmmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
 
  componentDidMount() {
    const obj = getFromStorage('the_main_app');

      fetch('/api/accounts/GetUserFromUserSession?token='+ obj.token)
        .then(res => res.json())
        .then(json => {
          this.setState({
            currentUserId:json.userId
          });
            this.GetMyClients(this.state.currentUserId);
        });
}
 
 toggle() {
  this.setState({
    modal: !this.state.modal
  });
}

handleInputChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}

handleClickSubmmit(e) {
  e.preventDefault();
  this.onAdd();
  this.toggle();
}

ActionLink(client) {
  function handleClick(e) {
    e.preventDefault();
    setClientInStorage('myClient', client);
    window.location=('/diet');
  }

  function handleClickC(e){
    e.preventDefault();
    setClientInStorage('myClient',client);
    window.location=('/corporalanalysis');
  }

  return (
    <div>
    <button  className="btn btn-success mt-3 ml-3"  id={client} onClick={handleClick} >Diet</button>
    <button  className="btn btn-success mt-3 ml-3"  id={client} onClick={handleClickC} >Corporral Analysis</button>
    </div>
  );
}

GetMyClients(CurrentUserId){

  fetch('/api/accounts/GetMyClients?Nutritionist='+CurrentUserId, {method:'GET'})
  .then(res => res.json())
  .then (json=> {
      this.setState({
        clientsId:json.map(function(item) {
          return item.Client_id;
        })
      });

      this.GetMyClientsUser(this.state.clientsId,CurrentUserId);
    
  });
}

GetMyClientsUser(ClientsId,CurrentUserId){
  console.log(this.state.currentUserId)
  fetch('/api/accounts/GetMyClientsUser?Clients='+ClientsId, {method:'GET'})
  .then(res => res.json())
  .then (Registered=> {
    if (Registered.err){
      fetch('/api/account/GetClientsUnregistered/'+CurrentUserId, {method:'GET'})
      .then(res => res.json())
      .then (Unregistered=> {
          this.setState({
            clientsData:Unregistered.data
          });
      });
    }
  else{
      fetch('/api/account/GetClientsUnregistered/'+CurrentUserId, {method:'GET'})
      .then(res => res.json())
      .then (Unregistered=> {
          this.setState({
            clientsData:Registered.concat(Unregistered.data)
          });
      });
    }
  });

}

onAdd() {
  fetch("/api/account/addClient", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Nutritionist_id: this.state.currentUserId,
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Email: this.state.Email,
      Phone: this.state.Phone,
    })
  })
  this.GetMyClients(this.state.currentUserId);
  this.setState({
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: 0,
  })
}

render(){
  var ClientsData = Array.from(this.state.clientsData);
  var that=this;
  return(
    <div>
      <h1>Clients</h1>
      <div className="row"> 
      <div className="m-2" id="cardSpace"> 
      <div  className="card card text-white " id="newClient">
              <div className="card-header" >New Clients</div>
                  <div>
                      <button className="btn btn-secondary"  id="buttonSize" onClick={this.toggle}>
                        <img
                          className=" img-fluid"
                          src="https://www.australshippingagency.com/wp-content/themes/wpmetro/images/icon_social.png"
                          alt="card image"
                          onClick={this.toggle}
                          id="bttnAdd"
                        />
                      </button>
                      <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>New clients format</ModalHeader>
                        <ModalBody>
                          <form>
                          <div className="form-group">
                              <label for="InputFirstName">First Name</label>
                              <input type="text" className="form-control" 
                              placeholder="Enter First Name"
                              name="FirstName"
                              value={this.state.FirstName}
                              onChange={this.handleInputChange}
                              />
                            </div>
                            <div className="form-group">
                              <label for="InputLastName">Last Name</label>
                              <input type="text" className="form-control"  
                              placeholder="Enter Last Name"
                              name="LastName"
                              value={this.state.LastName}
                              onChange={this.handleInputChange}/>
                            </div>
                            <div className="form-group">
                              <label for="InputEmail">Email address</label>
                              <input type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="form-control"  aria-describedby="emailHelp" 
                              placeholder="Enter email"
                              name="Email"
                              value={this.state.Email}
                              onChange={this.handleInputChange}/>
                              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                              <label for="InputPhone">Phone</label>
                              <input type="text" className="form-control"  
                              placeholder="+1 (555)555-5555"
                              name="Phone"
                              value={this.state.Phone}
                              
                              
                              onChange={this.handleInputChange}
                              />
                            </div>
                              
                          </form>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.handleClickSubmmit} >Submmit</Button>{' '}
                          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </div>   
                </div>
              </div>
            
      {ClientsData.map(function(client,index){
      return(
        <div key={client._id} className="client">
          <div  className="col m-2" id="cardSpace">
            <div
              className="image-flip"
              ontouchstart="this.classList.toggle('hover');"                                 
            >
              <div className="mainflip">
                <div className="frontside" >
                  <div className="card  text-white " id="cardClient" >
                    <div className="card-body text-center">
                        <img
                          className=" img-fluid mt-5"
                          src="http://getdrawings.com/img/user-silhouette-icon-2.png"
                          alt="card image"
                        />
                        <br />
                      <h4 className="card-title mt-2">{client.FirstName+' '+ client.LastName}</h4>
                    </div>
                  </div>
                </div>
                <div className="backside">
                  <div className="card" id="cardClient">
                    <div className="card-body text-center mt-4">
                      <h4 className="card-title">Client Information</h4>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Email: {client.Email}</li>
                        <li className="list-group-item">Phone: {client.Phone}</li>
                      </ul>
                      {that.ActionLink(client)} 
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>         
          )
        })}
        
        </div>
      </div>
    )
  }
}

export default Transition;