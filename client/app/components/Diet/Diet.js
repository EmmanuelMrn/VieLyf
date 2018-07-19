
//\/\/\/\/IN MAINTENANCE/\/\/\/\/\/\/

import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  
  getEmailFromStorage,
  setEmailInStorage,
  getFromStorage,
} from '../../utils/storage';

var currentPatientId="";
var currentDietId="";
var currentUserId="";
var Patient_ID="5b4c5636a74fc20b34477658";

class Diet extends Component {
  constructor() {
    super();

    this.state = {
        isLoading: true,
        Client_id:"",
        Nutritionist_id:"",
        tokendiet: "",
        userstoken: "",
        prueba:"",
        patients:"",
        NutritionistAccount: false,
        
  
        breakfastMilk:'',
        breakfastVeg:'',
        breakfastFruit:'',
        breakfastCereal:'',
        breakfastMeat:'',
        breakfastFat:'',
        breakfastSugar:'',
        
        lunchMilk:'',
        lunchVeg:'',
        lunchFruit:'',
        lunchCereal:'',
        lunchMeat:'',
        lunchFat:'',
        lunchSugar:'',
        
        dinnerMilk:'',
        dinnerVeg:'',
        dinnerFruit:'',
        dinnerCereal:'',
        dinnerMeat:'',
        dinnerFat:'',
        dinnerSugar:'',
        
        collationMilk:'',
        collationVeg:'',
        collationFruit:'',
        collationCereal:'',
        collationMeat:'',
        collationFat:'',
        collationSugar:''

    };

    this.onEditDiet = this.onEditDiet.bind(this);

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
    //Get the current UserID on session
    const obj = getFromStorage('the_main_app');
    const {token} = obj;
      
      fetch('/api/accounts/GetUserFromUserSession?token='+token)
        .then(res => res.json())
        .then(json => {
          this.setState({
            userstoken:json.userId,//CHECK THIS
          });
            currentUserId = json.userId;//Actually using this vvvv
            
            //Check for the role usign the currentUserID on session
            fetch('/api/accounts/IsNutritionist?token='+currentUserId)
            .then(res => res.json())
            .then(json => {
              //if (is a nutritionist)
              if(json.success){
                //Go directly to a especific patient whit a dummy patient
                //Here has to be the option to select an especifict client 
                this.GetMyPatient(Patient_ID);
              } else {
                //check for my own diet if exist
                this.GetMyUser(currentUserId);
              }   
              this.setState({
                NutritionistAccount:json.success,
              });
              
            });
        });
    }

GetMyUser(currentUserId){
//Check for an existing relationship on Patient
fetch('/api/accounts/GetUser?token='+currentUserId)
.then(res => res.json())
.then(json => {
    this.setState({
      patients:json._id,
    }); 
    currentPatientId = json._id ;
    this.GetMyPatient(currentPatientId);
   });
  }

GetMyPatient(currentPatientId){
 //Check for the diet 
        fetch('/api/accounts/GetPatient?token='+currentPatientId)
        .then(res => res.json())
        .then(json => {
            this.setState({
              tokendiet:json._id
            });
            currentDietId = json._id ;
            this.GetMyDiets(currentDietId);
          });
        
  }

GetMyDiets(currentDietId){
//Get the especific diet for that client
fetch('/api/accounts/GetDiet?token='+currentDietId)
.then(res => res.json())
.then(json => {

    this.setState({
      breakfastMilk:json.breakfastMilk,
      breakfastVeg:json.breakfastVeg ,
      breakfastFruit:json.breakfastFruit ,
      breakfastCereal:json.breakfastCereal ,
      breakfastMeat:json.breakfastMeat ,
      breakfastFat:json.breakfastFat ,
      breakfastSugar:json.breakfastSugar ,
      
      lunchMilk:json.lunchMilk ,
      lunchVeg:json.lunchVeg ,
      lunchFruit:json.lunchFruit ,
      lunchCereal:json.lunchCereal ,
      lunchMeat:json.lunchMeat ,
      lunchFat:json.lunchFat ,
      lunchSugar:json.lunchSugar ,
      
      dinnerMilk:json.dinnerMilk ,
      dinnerVeg:json.dinnerVeg ,
      dinnerFruit:json.dinnerFruit ,
      dinnerCereal:json.dinnerCereal ,
      dinnerMeat:json.dinnerMeat ,
      dinnerFat:json.dinnerFat ,
      dinnerSugar:json.dinnerSugar ,
      
      collationMilk:json.collationMilk ,
      collationVeg:json.collationVeg ,
      collationFruit:json.collationFruit ,
      collationCereal:json.collationCereal ,
      collationMeat:json.collationMeat ,
      collationFat:json.collationFat ,
      collationSugar:json.collationSugar 
    });
  
});
  }
  onEditDiet(){
    const {
        tokendiet,

        breakfastMilk,
        breakfastVeg,
        breakfastFruit,
        breakfastCereal,
        breakfastMeat,
        breakfastFat,
        breakfastSugar,
        
        lunchMilk,
        lunchVeg,
        lunchFruit,
        lunchCereal,
        lunchMeat,
        lunchFat,
        lunchSugar,
        
        dinnerMilk,
        dinnerVeg,
        dinnerFruit,
        dinnerCereal,
        dinnerMeat,
        dinnerFat,
        dinnerSugar,
        
        collationMilk,
        collationVeg,
        collationFruit,
        collationCereal,
        collationMeat,
        collationFat,
        collationSugar
    } = this.state;
    fetch('/api/accounts/ModifyDiet', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        
        tokendiet:tokendiet,
        breakfastMilk:breakfastMilk,
        breakfastVeg:breakfastVeg,
        breakfastFruit:breakfastFruit,
        breakfastCereal:breakfastCereal,
        breakfastMeat:breakfastMeat,
        breakfastFat:breakfastFat,
        breakfastSugar:breakfastSugar,
        
        lunchMilk:lunchMilk,
        lunchVeg:lunchVeg,
        lunchFruit:lunchFruit,
        lunchCereal:lunchCereal,
        lunchMeat:lunchMeat,
        lunchFat:lunchFat,
        lunchSugar:lunchSugar,
        
        dinnerMilk:dinnerMilk,
        dinnerVeg:dinnerVeg,
        dinnerFruit:dinnerFruit,
        dinnerCereal:dinnerCereal,
        dinnerMeat:dinnerMeat,
        dinnerFat:dinnerFat,
        dinnerSugar:dinnerSugar,
        
        collationMilk:collationMilk,
        collationVeg:collationVeg,
        collationFruit:collationFruit,
        collationCereal:collationCereal,
        collationMeat:collationMeat,
        collationFat:collationFat,
        collationSugar:collationSugar,
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success == false) {
          this.setState({
            isLoading: false,
          });
        } 
      });
  }
  renderTitle() {
    if(this.state.NutritionistAccount) {
      return (
        <p>Edit Diet</p>
      );
    } else {
      return (
        <p>View Diet</p>
      );
    }
  }
  renderButtom() {
    if(this.state.NutritionistAccount) {
      return (
        <button type="button" className="btn btn-dark" onClick={this.onEditDiet}>Edit Diet</button>
      );
    }
  }
  render() {
    const {
        isLoadingue,
        Client_id,
        Nutritionist_id,
        tokendiet,
        userstoken,
        patient,
        Nutritionist,
        Flag,
  
        breakfastMilk,
        breakfastVeg,
        breakfastFruit,
        breakfastCereal,
        breakfastMeat,
        breakfastFat,
        breakfastSugar,
        
        lunchMilk,
        lunchVeg,
        lunchFruit,
        lunchCereal,
        lunchMeat,
        lunchFat,
        lunchSugar,
        
        dinnerMilk,
        dinnerVeg,
        dinnerFruit,
        dinnerCereal,
        dinnerMeat,
        dinnerFat,
        dinnerSugar,
        
        collationMilk,
        collationVeg,
        collationFruit,
        collationCereal,
        collationMeat,
        collationFat,
        collationSugar
    } = this.state;
    

    return (
    <div className="col-md-4">
    {this.renderTitle()}
    <br/>
    <br/>
    <b>Break Fast|   </b>
    <b>Lunch |  </b>
    <b>Dinner  | </b>
    <b>Collation</b>
    <br/>
    <input
      type="breakfastMilk"
      size="4"
      name = "breakfastMilk"
      placeholder="breakfastMilk"
      value={breakfastMilk}
      onChange={this.handleInputChange}
    />
    <input
      type="lunchMilk"
      size="4"
      name = "lunchMilk"
      placeholder="lunchMilk"
      value={lunchMilk}
      onChange={this.handleInputChange}
    />
    <input
      type="dinnerMilk"
      size="4"
      name = "dinnerMilk"
      placeholder="dinnerName"
      value={dinnerMilk}
      onChange={this.handleInputChange}
    />
    <input
      type="collationMilk"
      size="4"
      name = "collationMilk"
      placeholder="collationMilk"
      value={collationMilk}
      onChange={this.handleInputChange}
    /><b>Milk</b><br />

    <input
      type="breakfastVeg"
      size="4"
      name = "breakfastVeg"
      placeholder="breakfastVeg"
      value={breakfastVeg}
      onChange={this.handleInputChange}
    />
    <input
      type="lunchVeg"
      size="4"
      name = "lunchVeg"
      placeholder="lunchVeg"
      value={lunchVeg}
      onChange={this.handleInputChange}
    />
    <input
      type="dinnerVeg"
      size="4"
      name = "dinnerVeg"
      placeholder="dinnerName"
      value={dinnerVeg}
      onChange={this.handleInputChange}
    />
    <input
      type="collationVeg"
      size="4"
      name = "collationVeg"
      placeholder="collationVeg"
      value={collationVeg}
      onChange={this.handleInputChange}
    /><b>Vegetable</b><br />
    
    <input
      type="breakfastFruit"
      size="4"
      name = "breakfastFruit"
      placeholder="breakfastFruit"
      value={breakfastFruit}
      onChange={this.handleInputChange}
    />
    <input
      type="lunchFruit"
      size="4"
      name = "lunchFruit"
      placeholder="lunchFruit"
      value={lunchFruit}
      onChange={this.handleInputChange}
    />
    <input
      type="dinnerFruit"
      size="4"
      name = "dinnerFruit"
      placeholder="dinnerName"
      value={dinnerFruit}
      onChange={this.handleInputChange}
    />
    <input
      type="collationFruit"
      size="4"
      name = "collationFruit"
      placeholder="collationFruit"
      value={collationFruit}
      onChange={this.handleInputChange}
    /><b>Fruit</b><br />
    <input
      type="breakfastCereal"
      size="4"
      name = "breakfastCereal"
      placeholder="breakfastCereal"
      value={breakfastCereal}
      onChange={this.handleInputChange}
    />
    <input
      type="lunchCereal"
      size="4"
      name = "lunchCereal"
      placeholder="lunchCereal"
      value={lunchCereal}
      onChange={this.handleInputChange}
    />
    <input
      type="dinnerCereal"
      size="4"
      name = "dinnerCereal"
      placeholder="dinnerName"
      value={dinnerCereal}
      onChange={this.handleInputChange}
    />
    <input
      type="collationCereal"
      size="4"
      name = "collationCereal"
      placeholder="collationCereal"
      value={collationCereal}
      onChange={this.handleInputChange}
    /><b>Cereal</b><br />
    <input
      type="breakfastMeat"
      size="4"
      name = "breakfastMeat"
      placeholder="breakfastMeat"
      value={breakfastMeat}
      onChange={this.handleInputChange}
    />
    <input
      type="lunchMeat"
      size="4"
      name = "lunchMeat"
      placeholder="lunchMeat"
      value={lunchMeat}
      onChange={this.handleInputChange}
    />
    <input
      type="dinnerMeat"
      size="4"
      name = "dinnerMeat"
      placeholder="dinnerName"
      value={dinnerMeat}
      onChange={this.handleInputChange}
    />
    <input
      type="collationMeat"
      size="4"
      name = "collationMeat"
      placeholder="collationMeat"
      value={collationMeat}
      onChange={this.handleInputChange}
    /><b>Meat</b><br />
    <input
      type="breakfastFat"
      size="4"
      name = "breakfastFat"
      placeholder="breakfastFat"
      value={breakfastFat}
      onChange={this.handleInputChange}
    />
    <input
      type="lunchFat"
      size="4"
      name = "lunchFat"
      placeholder="lunchFat"
      value={lunchFat}
      onChange={this.handleInputChange}
    />
    <input
      type="dinnerFat"
      size="4"
      name = "dinnerFat"
      placeholder="dinnerName"
      value={dinnerFat}
      onChange={this.handleInputChange}
    />
    <input
      type="collationFat"
      size="4"
      name = "collationFat"
      placeholder="collationFat"
      value={collationFat}
      onChange={this.handleInputChange}
    /><b>Fat</b><br />
    <input
      type="breakfastSugar"
      size="4"
      name = "breakfastSugar"
      placeholder="breakfastSugar"
      value={breakfastSugar}
      onChange={this.handleInputChange}
    />
    <input
      type="lunchSugar"
      size="4"
      name = "lunchSugar"
      placeholder="lunchSugar"
      value={lunchSugar}
      onChange={this.handleInputChange}
    />
    <input
      type="dinnerSugar"
      size="4"
      name = "dinnerSugar"
      placeholder="dinnerName"
      value={dinnerSugar}
      onChange={this.handleInputChange}
    />
    <input
      type="collationSugar"
      size="4"
      name = "collationSugar"
      placeholder="collationSugar"
      value={collationSugar}
      onChange={this.handleInputChange}
    /><b>Sugar</b><br /><br />
    {this.renderButtom()}
  </div>
  
    );
  }
}

export default Diet;