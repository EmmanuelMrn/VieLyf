import React, { Component,Children } from 'react';

import 'whatwg-fetch';

import {
  setClientInStorage,
  getFromStorage,
} from '../../utils/storage';

class Transition extends Component {
  constructor() {
    super();

    this.state = {
        clientsId:[],
        clientsData:[],
        currentUserId:'',
        isLoading: true,
        NutritionistAccount: false,
        isActive:null,
        activeModal:null
    };
  }

ActionLink(client) {
  function handleClick(e) {
    e.preventDefault();
    setClientInStorage('myClient', client);
    window.location=('/diet');
  }
  function handleClickC(e)
  {
    e.preventDefault();
    setClientInStorage('myClient',client);
    window.location=('/corporalanalysis');
  }
  return (
    <div>

    <a  className="btn btn-success"  id={client} onClick={handleClick} >Abrir</a>
    <a  className="btn btn-success"  id={client} onClick={handleClickC} >Corporral Analysis</a>
    </div>
  );
}
componentDidMount() {

    const obj = getFromStorage('the_main_app');
    const {token} = obj;
      
      fetch('/api/accounts/GetUserFromUserSession?token='+token)
        .then(res => res.json())
        .then(json => {
          this.setState({
            currentUserId:json.userId
          });
            
            this.GetMyClients(this.state.currentUserId);
        });
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

      this.GetMyClientsUser(this.state.clientsId);
    
  });
}

GetMyClientsUser(ClientsId){
  fetch('/api/accounts/GetMyClientsUser?Clients='+ClientsId, {method:'GET'})
  .then(res => res.json())
  .then (json=> {
    
      this.setState({
        clientsData:json
      });
      
  });
}

render(){
  
  var ClientsData = Array.from(this.state.clientsData);
  
 var that=this;
return(
  <div>
    <h1>Clientes</h1>
    <div className="row">
    { 
     ClientsData.map(function(client,index){
      return(
        <div key={client._id} className="client">

           <div className="col-sm-12" >
               <div className="card" id="cardstyle" >
                 <div className="card-body">
                     <h5 className="card-title">{client.FirstName+' '+ client.LastName}</h5>
                     {that.ActionLink(client)}             
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