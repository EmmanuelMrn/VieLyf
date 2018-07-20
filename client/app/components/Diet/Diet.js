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
  }
CheckIfImAPatient(currentUserId){
    //Check for an existing relationship on Patient
    fetch('/api/accounts/GetUser?token='+currentUserId)
    .then(res => res.json())
    .then(json => {
        this.setState({
          patients:json._id,
        }); 
        currentPatientId = json._id ;
        //this.GetMyPatient(currentPatientId);
       });
      }
    }

    export default Diet;