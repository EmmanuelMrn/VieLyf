import React, { Component } from "react";
import swal from 'sweetalert2';

import "whatwg-fetch";
import { getFromStorage } from "../../utils/storage";
import { Link } from "react-router-dom";

class Diet extends Component {
  constructor() {
    super();
    this.validation=[];
    this.state = {
      isLoading: true,
      tokendiet: "",
      currentPatientId: "",
      NutritionistAccount: false,
      State:"",
      tokenuser:"",
      goDiet:"Loading",

      breakfastMilk: "",
      breakfastVeg: "",
      breakfastFruit: "",
      breakfastCereal: "",
      breakfastMeat: "",
      breakfastFat: "",
      breakfastSugar: "",

      lunchMilk: "",
      lunchVeg: "",
      lunchFruit: "",
      lunchCereal: "",
      lunchMeat: "",
      lunchFat: "",
      lunchSugar: "",

      dinnerMilk: "",
      dinnerVeg: "",
      dinnerFruit: "",
      dinnerCereal: "",
      dinnerMeat: "",
      dinnerFat: "",
      dinnerSugar: "",

      collationMilk: "",
      collationVeg: "",
      collationFruit: "",
      collationCereal: "",
      collationMeat: "",
      collationFat: "",
      collationSugar: ""
    };
    this.onEditDiet = this.onEditDiet.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
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
    //Get the user selected
    const objClientSelected = getFromStorage('myClient');
    //Get the current UserID on session
    const objUserInSession = getFromStorage('the_main_app');
    fetch('/api/accounts/GetUserFromUserSession?token='+ objUserInSession.token)
        .then(res => res.json())
        .then(json => {
          this.setState({
            tokenuser:json.userId
          });

          if (localStorage.getItem('Rol') == "Nutriologo"){
            this.setState({
              NutritionistAccount:true
            })
            console.log("nutriologo"+objClientSelected._id)
            this.CheckIfImAPatient(objClientSelected._id)
          }else{
            this.setState({
              NutritionistAccount:false
            })
            console.log("no nutriologo"+this.state.tokenuser)
            this.CheckIfImAPatient(this.state.tokenuser)
          }
            
        });
    
    

  }
  CheckIfImAPatient(currentUserId) {
    //Check for an existing relationship on Patient
    fetch("/api/accounts/GetUser?token=" + currentUserId)
      .then(res => res.json())
      .then(json => {
        if (json.doc==null) {
          console.log("no tiene dieta"+currentUserId);
          fetch('/api/account/GetClientFromUnregistered/'+currentUserId, {method:'GET'})
          .then(res => res.json())
          .then (Unregistered=> {
            console.log(Unregistered)
            if (Unregistered.data!=null){
              console.log("si tiene dieta")
              console.log(Unregistered.data)
              this.setState({
                currentPatientId: Unregistered.data._id
              });
              this.GetDiets(this.state.currentPatientId);
            }else{
              swal({
                title:'Your diet is not avalibe yet',
                text:'Please come latter',
                type:'warning',
                onClose: () => {
                  window.location='/vistaprincipal'
                }
              })
            }
          })
        } else {
          this.setState({
            currentPatientId: json.doc._id
          });
          this.GetDiets(this.state.currentPatientId);
        }
      });
  }

  GetDiets(currentPatientId) {
    console.log(currentPatientId)
    fetch("/api/accounts/GetDiet?token=" + currentPatientId)
      .then(res => res.json())
      .then(json => {
        if (json.doc == null){
          console.log("nulo")
          this.setState({
            goDiet:"NotFound"
          });
      }else{
          this.setState({
            tokendiet: currentPatientId,
            breakfastMilk: json.doc.breakfastMilk,
            breakfastVeg: json.doc.breakfastVeg,
            breakfastFruit: json.doc.breakfastFruit,
            breakfastCereal: json.doc.breakfastCereal,
            breakfastMeat: json.doc.breakfastMeat,
            breakfastFat: json.doc.breakfastFat,
            breakfastSugar: json.doc.breakfastSugar,
  
            lunchMilk: json.doc.lunchMilk,
            lunchVeg: json.doc.lunchVeg,
            lunchFruit: json.doc.lunchFruit,
            lunchCereal: json.doc.lunchCereal,
            lunchMeat: json.doc.lunchMeat,
            lunchFat: json.doc.lunchFat,
            lunchSugar: json.doc.lunchSugar,
  
            dinnerMilk: json.doc.dinnerMilk,
            dinnerVeg: json.doc.dinnerVeg,
            dinnerFruit: json.doc.dinnerFruit,
            dinnerCereal: json.doc.dinnerCereal,
            dinnerMeat: json.doc.dinnerMeat,
            dinnerFat: json.doc.dinnerFat,
            dinnerSugar: json.doc.dinnerSugar,
  
            collationMilk: json.doc.collationMilk,
            collationVeg: json.doc.collationVeg,
            collationFruit: json.doc.collationFruit,
            collationCereal: json.doc.collationCereal,
            collationMeat: json.doc.collationMeat,
            collationFat: json.doc.collationFat,
            collationSugar: json.doc.collationSugar,
            goDiet:"Found"
          });
      }
      });
  }
  onEditDiet() {
    fetch("/api/accounts/ModifyDiet", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tokendiet: this.state.currentPatientId,
        breakfastMilk: this.state.breakfastMilk,
        breakfastVeg: this.state.breakfastVeg,
        breakfastFruit: this.state.breakfastFruit,
        breakfastCereal: this.state.breakfastCereal,
        breakfastMeat: this.state.breakfastMeat,
        breakfastFat: this.state.breakfastFat,
        breakfastSugar: this.state.breakfastSugar,

        lunchMilk: this.state.lunchMilk,
        lunchVeg: this.state.lunchVeg,
        lunchFruit: this.state.lunchFruit,
        lunchCereal: this.state.lunchCereal,
        lunchMeat: this.state.lunchMeat,
        lunchFat: this.state.lunchFat,
        lunchSugar: this.state.lunchSugar,

        dinnerMilk: this.state.dinnerMilk,
        dinnerVeg: this.state.dinnerVeg,
        dinnerFruit: this.state.dinnerFruit,
        dinnerCereal: this.state.dinnerCereal,
        dinnerMeat: this.state.dinnerMeat,
        dinnerFat: this.state.dinnerFat,
        dinnerSugar: this.state.dinnerSugar,

        collationMilk: this.state.collationMilk,
        collationVeg: this.state.collationVeg,
        collationFruit: this.state.collationFruit,
        collationCereal: this.state.collationCereal,
        collationMeat: this.state.collationMeat,
        collationFat: this.state.collationFat,
        collationSugar: this.state.collationSugar
      })
    })
    .then(res => res.json())
    .then(json => {
      if(json.err){
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }
        
      }); 
  }
  renderTitle() {
    if (this.state.NutritionistAccount) {
      return <p>Edit Diet</p>;
    } else {
      return <p>View Diet</p>;
    }
  }
  renderButtom() {
    if (this.state.NutritionistAccount) {
      return (
        <div style={{marginLeft:"70%",marginTop:"10px",}}>
        <button
          type="submit"
          className="btn btn-dark"
          onClick={this.checkValidation}
        >
          Edit Diet
        </button>
        </div>
      );
    }
  }
  checkValidation()
{
  for (var i=0; i < this.validation.length; i++){
    if (this.validation[i].validity.valid==true){
      console.log("checked: "+i)
      if (i==(this.validation.length) - 1)
      {console.log("All checked"); this.onEditDiet()}
    }else{
      console.log("no checked: "+i)
      break;
    }
  }
}

MilkInputs(){
  return(
    <div >
       <div className="row" id="marginDiet">
    <div className="col InputsDiet" >
    <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[0] = input }}
        name="breakfastMilk"
        min="0" max="4" step="1"
        value={this.state.breakfastMilk}
        onChange={this.handleInputChange}
        required
      />
      </div>
      
      <div className="col InputsDiet">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[1] = input }}
        name="lunchMilk"
        min="0" max="4" step="1"
        value={this.state.lunchMilk}
        onChange={this.handleInputChange}
        required
      />
      </div>
      <div className="col InputsDiet">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[2] = input }}
        name="dinnerMilk"
        min="0" max="4" step="1"
        value={this.state.dinnerMilk}
        onChange={this.handleInputChange}
        required
      />
      </div>
      <div className="col InputsDiet">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[3] = input }}
        name="collationMilk"
        min="0" max="4" step="1"
        value={this.state.collationMilk}
        onChange={this.handleInputChange}
        required
      />
      </div>
      </div>
      </div>
      );
}
VegetableInputs(){
  return(
    <div className="contiainer">
  <div className="row" id="marginDiet">
      <div className="col InputsDiet">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[4] = input }}
        name="breakfastVeg"
        min="0" max="4" step="1"
        value={this.state.breakfastVeg}
        onChange={this.handleInputChange}
        required
      />
      </div>
      <div className="col InputsDiet">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[5] = input }}
        name="lunchVeg"
        min="0" max="4" step="1"
        value={this.state.lunchVeg}
        onChange={this.handleInputChange}
        required
      />
      </div>
      <div className="col InputsDiet">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[6] = input }}
        name="dinnerVeg"
        min="0" max="4" step="1"
        value={this.state.dinnerVeg}
        onChange={this.handleInputChange}
        required
      />
      </div>
      <div className="col InputsDiet">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[7] = input }}
        name="collationVeg"
        min="0" max="4" step="1"
        value={this.state.collationVeg}
        onChange={this.handleInputChange}
        required
      />
      </div>
      </div>
      </div>
);
      
}
FruitInputs(){
  return(
    <div >
      <div className="row" id="marginDiet">
       <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[8] = input }}
          name="breakfastFruit"
          min="0" max="4" step="1"
          value={this.state.breakfastFruit}
          onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[9] = input }}
          name="lunchFruit"
          min="0" max="4" step="1"
          value={this.state.lunchFruit}
          onChange={this.handleInputChange}
          required
        />
        </div>
      <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[10] = input }}
          name="dinnerFruit"
          min="0" max="4" step="1"
          value={this.state.dinnerFruit}
          onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[11] = input }}
          name="collationFruit"
          min="0" max="4" step="1"
          value={this.state.collationFruit}
          onChange={this.handleInputChange}
          required
        />
      </div>
    </div>
  </div>
  );
}
CerealInputs(){
  return(
    <div >
      <div className="row" id="marginDiet">
       <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[12] = input }}
          name="breakfastCereal"
          min="0" max="4" step="1"
          value={this.state.breakfastCereal}
          onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[13] = input }}
          name="lunchCereal"
          min="0" max="4" step="1"
          value={this.state.lunchCereal}
          onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[14] = input }}
          name="dinnerCereal"
          min="0" max="4" step="1"
          value={this.state.dinnerCereal}
          onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[15] = input }}
          name="collationCereal"
          min="0" max="4" step="1"
          value={this.state.collationCereal}
          onChange={this.handleInputChange}
          required
        />
      </div>
    </div>
  </div>
  );
}
MeatInputs(){
  return(
    <div >
      <div className="row" id="marginDiet">
       <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[16] = input }}
          name="breakfastMeat"
          min="0" max="4" step="1"
          value={this.state.breakfastMeat}
          onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[17] = input }}
          name="lunchMeat"
          min="0" max="4" step="1"
          value={this.state.lunchMeat}
          onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[18] = input }}
          name="dinnerMeat"
          min="0" max="4" step="1"
          value={this.state.dinnerMeat}
          onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[19] = input }}
          name="collationMeat"
          min="0" max="4" step="1"
          value={this.state.collationMeat}
          onChange={this.handleInputChange}
          required
        />
      </div>
    </div>
  </div>
  );
}
FatsInputs(){
  return(
    <div >
      <div className="row" id="marginDiet">
       <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[20] = input }}
          name="breakfastFat"
          min="0" max="4" step="1"
          value={this.state.breakfastFat}
          onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[21] = input }}
          name="lunchFat"
          min="0" max="4" step="1"
          value={this.state.lunchFat}
          onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[22] = input }}
          name="dinnerFat"
          min="0" max="4" step="1"
          value={this.state.dinnerFat}
          onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[23] = input }}
          name="collationFat"
          min="0" max="4" step="1"
          value={this.state.collationFat}
          onChange={this.handleInputChange}
          required
        />
      </div>
    </div>
  </div>
  );
}
BonusInputs(){
  return(
    <div >
      <div className="row" id="marginDiet">
       <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[24] = input }}
          name="breakfastSugar"
          min="0" max="4" step="1"
          value={this.state.breakfastSugar}
          onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[25] = input }}
          name="lunchSugar"
          min="0" max="4" step="1"
          value={this.state.lunchSugar}
          onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[26] = input }}
          name="dinnerSugar"
          min="0" max="4" step="1"
          value={this.state.dinnerSugar}
          onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="col InputsDiet">
        <input
          className="form-control"
          type="number"
          id="inputSize"
          ref = { (input) => {this.validation[27] = input }}
          name="collationSugar"
          min="0" max="4" step="1"
          value={this.state.collationSugar}
          onChange={this.handleInputChange}
          required 
        />
      </div>
    </div>
  </div>
  );
}
MilkTable(){
  return(
    <div>
      <table className="table table-striped">
        
        <tbody >
        <tr>
            <td>Whole Milk</td>
            <td>1 cup (240ml)</td>
            <td>Reconstituted milk</td>
            <td>1 cup</td>
          </tr>
          <tr>
            <td>Half-fat milk</td>
            <td>1 cup (240ml)</td>
            <td>Skimmed milk powder</td>
            <td>¼ cup=4C</td>
          </tr>
          <tr>
            <td>Skimmed milk</td>
            <td>1 ¼ cup</td>
            <td>Fat-free yogurt</td>
            <td>½ cup</td>
          </tr>
          <tr>
            <td>Evaporated milk</td>
            <td>½ cup</td>
          </tr>
        </tbody>
      </table>
    </div>
   );
  }
VegetableTable(){
    return(
      <div>
        <table className="table table-striped">
          <tbody>
          <tr>
            <td>Beetroot</td>
            <td>½ cup</td>
            <td>Vegetable juice</td>
            <td>½ cup</td>
          </tr>
          <tr>
            <td>Pea</td>
            <td>½ cup</td>
            <td>Soybean sprouts</td>
            <td>½ cup</td>
          </tr>
          <tr>
            <td>Carrot</td>
            <td>½ cup</td>
            <td>Squash</td>
            <td>½ cup</td>
          </tr>
          <tr>
            <td>Onion</td>
            <td>½ cup</td>
            <td>Tomato juice</td>
            <td>½ cup</td>
          </tr>
          </tbody>
        </table>
      </div>
     );
  }
FruitsTable(){
    return(
      <div>
        <table className="table table-striped">
          <tbody>
          <tr>
            <td>Vulgar</td>
            <td>2 pieces</td>
            <td>Guava</td>
            <td>2 pieces</td>
            <td>Orange juice</td>
            <td>½ cup</td>
          </tr>
          <tr>
            <td>Pineapple</td>
            <td>1 cup</td>
            <td>Cherries</td>
            <td>10 pieces</td>
            <td>Plum</td>
            <td>2 pieces</td>
          </tr>
          <tr>
            <td>Fig</td> 
            <td>1 piece</td>
            <td>Apple juice</td>
            <td>½ cup</td>
            <td>Watermelon</td>
            <td>1 ½ cup</td>
          </tr>
          <tr>
            <td>Jicama</td>
            <td>1 cup</td>
            <td>Prune</td>
            <td>2 pieces</td>
            <td>Tangerine</td>
            <td>1 pieces</td>
          </tr>
          <tr>
            <td>Cantaloupe</td>
            <td>1 ½ cup</td>
            <td>Grapefruit</td>
            <td>½ piece</td>
            <td>Fruit salad</td>
            <td>1 cup</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>2 pieces</td>
            <td>Chinese mango</td>
            <td>½ piece</td>
            <td>Papaya</td>
            <td>1 cup</td>
          </tr>
          <tr>
            <td>Grapefruit juice</td>
            <td>½ cup</td>
            <td>Peach</td>
            <td>1 piece</td>
            <td>Apple</td>
            <td>1 piece</td>
          </tr>
          <tr>
            <td>Pear</td>
            <td>1 piece</td>
            <td>Kiwi</td>
            <td>1 piece</td>
            <td>Quince</td>
            <td>½ cup</td>
          </tr>
          <tr>
            <td>Strawberry</td>
            <td>1 cup</td>
            <td>Grape juice</td>
            <td>¼ cup</td>
            <td>Raisins</td>
            <td>2 C</td>
          </tr>
          <tr>
            <td>Tuna</td>
            <td>2 pieces</td>
            <td>Coconut water</td>
            <td>1 cup</td>
            <td>Pomegranate</td>
            <td>1 piece</td>
          </tr>
          <tr>
            <td>Orange</td>
            <td>1 pieces</td>
            <td>Banana</td>
            <td>½ piece</td>
            <td>Grape</td>
            <td>12 pieces</td>
          </tr>
          </tbody>
        </table>
      </div>
     );
  }
CerealTable(){
    return(
      <div>
        <table className="table table-striped">
            
          <tbody>
          <tr>
              <td>Cooked rice</td>
              <td>½ cup</td>
              <td>Salty cookie</td>
              <td>6 pieces</td>
              <td>Cooked lentils</td>
              <td>½ cup</td>
          </tr>

          <tr>
              <td>Cooked pasta</td>
              <td>½ cup</td>
              <td>Corn Bran Flakes</td>
              <td>½ cup</td>
              <td>Habanera cookies</td>
              <td>5 pieces</td>
          </tr>

          <tr>
              <td>White bread</td>
              <td>1 slice</td>
              <td>Corn tortilla</td>
              <td>1 piece</td>
              <td>All bran</td>
              <td>½ cup</td>
          </tr>

          <tr>
              <td>Cooked chickpea</td>
              <td>½ cup</td>
              <td>Baked potato</td>
              <td>½ piece</td>
              <td>ground bread</td>
              <td>¼ cup</td>
          </tr>

          <tr>
              <td>Oats</td>
              <td>2 tablespoon</td>
              <td>Corn on the cob</td>
              <td>1 medium piece</td>
              <td>Cooked beans</td>
              <td>¼ cup</td>
          </tr>

          <tr>
              <td>Granola</td>
              <td>½ cup</td>
              <td>Cooked broad beans</td>
              <td>½ cup</td>
              <td>Cornstarch</td>
              <td>2 tablespoon</td>
          </tr>
          </tbody>
        </table>
      </div>
     );
  }
MeatTable(){
    return(
      <div>
        <table className="table table-striped">
          <tbody>
          <tr>
            <td>Chicken, Duck, Turkey</td>
            <td>30 grams</td>
            <td>Liver</td>
            <td>30 grams</td>
            <td>Ham</td>
            <td>2 slices</td>
            
        </tr>
        <tr>
            <td>Manchego, asadero, chihuahua, amarillo, swiss, american cheese</td>
            <td>2 slices</td>
            <td>Steak</td>
            <td>30 grams</td>
            <td>Fish</td>
            <td>30 grams</td>
            
        </tr>
        <tr>
            <td>Hamburger</td>
            <td>Half piece</td>
            <td>Ostion and Clam</td>
            <td>30 grams</td>
            <td>Cottage Cheese and Ricotta</td>
            <td>1/4 Cup</td>
            
        </tr>
        <tr>
            <td>Feta Cheese</td>
            <td>3 Cups</td>
            <td>Roast beef</td>
            <td>2 Slices</td>
            <td>Shrimp</td>
            <td>5 pieces</td>
            

        </tr>
        <tr>
            <td>Tuna in water</td>
            <td>Half can</td>
            <td>Pork</td>
            <td>30 grams</td>
            <td>Egg whites</td>
            <td>2 Pieces</td>
            
        </tr>

        <tr>
            <td>Sausage</td>
            <td>1 Piece</td>
            <td>Surimi</td>
            <td>1 Bar</td>
            <td>Egg</td>
            <td>1 Piece</td>
        </tr>
        <tr>
            <td>Panela Cheese</td>
            <td>40 grams</td>
            <td>Parmesan Cheese</td>
            <td>3 Cups</td>
        </tr>

          </tbody>
        </table>
      </div>
     );
  }
FatsTable(){
    return(
      <div>
        <table className="table table-striped">
          <tbody>
          <tr>
            <td>Oil</td>
            <td>1 Cup</td>
            <td>Almonds</td>
            <td>10 Pieces</td>
            <td>Cream Cheese</td>
            <td>1 Cup</td>
        </tr>
        <tr>
            <td>Olives</td>
            <td>5 Pieces</td>
            <td>Chorizo</td>
            <td>1 Cup</td>
            <td>Peanuts</td>
            <td>18 Pieces</td>

        </tr>
        <tr>
            <td>Dressing</td>
            <td>2 Cups</td>
            <td>Cream</td>
            <td>2 Cups</td>
            <td>Pistachio</td>
            <td>4 seeds</td>

        </tr>
        <tr>
            <td>Avocado</td>
            <td>1/4 Piece</td>
            <td>Whole nuts</td>
            <td>5 pieces</td>
            <td>Pine nuts</td>
            <td>4 seeds</td>

        </tr>
        <tr>
            <td>Mayonaise</td>
            <td>1 Cup</td>
            <td>Sunflower seeds</td>
            <td>1 Cup</td>
            <td>Shredded coconut</td>
            <td>1 Cup</td>
        </tr>

        <tr>
            <td>Light Mayonaise</td>
            <td>2 Cups</td>
            <td>Peanut Butter</td>
            <td>1 Cup</td>
            <td>Turkey Bacon</td>
            <td>3 Slices</td>
        </tr>

        <tr>
            <td>Margarine</td>
            <td>1 Cup</td>
            <td>Pork Bacon</td>
            <td>1 Slice </td>
        </tr>
          </tbody> 
        </table>
      </div>
     );
  }
  SugarTable(){
    return(
      <div>
        <table className="table table-striped">
          <tbody>
          <tr>
            <td>Sugar</td>
            <td>1 Cup</td>
            <td>Milk Cajeta</td>
            <td>1 Cup</td>
            <td>Flavored Jelly</td>
            <td>1/2 Cup</td>
        </tr>
        <tr>
            <td>Honey</td>
            <td>1 Cup</td>
            <td>Fruit in syrup</td>
            <td>1/2 Cup</td>
            <td>Jelly</td>
            <td>1 Cup</td>
            

        </tr>
        <tr>
            <td>Ketchup</td>
            <td>3 Cups</td>
            <td>Hard Candy</td>
            <td>2 Pieces</td>
            <td>Light Beer</td>
            <td>1 Cup and a half</td>
            

        </tr>
        <tr>
            <td>Water Ice Cream</td>
            <td>1/2 Cup</td>
            <td>Cajeta Lollipop</td>
            <td>1 Piece</td>
            <td>Soft drink</td>
            <td>1/2 Cup</td>
        </tr>
        <tr>
            <td>Powdered Chocolate</td>
            <td>1 Cup</td>
            <td>Condensed Milk</td>
            <td>1 Cup</td>
            <td>Gummys</td>
            <td>2 Pieces</td>

        </tr>
        <tr>
          <td>Wine</td>
          <td>1/2 Cup</td>
        </tr>
          </tbody>
        </table>
      </div>
     );
  }
BonusTable(){
    return(
      <div>
        <table className="table table-striped">
          <tbody>
          <tr>
            <td>Celery</td>
            <td>Watercress</td>
            <td>Coriander</td>
            <td>Lettuce</td>
            <td>Pepper</td>
            <td>Chicken Soup</td>
            <td>Mustard</td>
        </tr>
        <tr>
            <td>Chard</td>
            <td>Broccoli</td>
            <td>Chile</td>
            <td>Nopales</td>
            <td>Romerito</td>
            <td>defatted broth</td>
            <td>Pickles</td>


        </tr>
        <tr>
            <td>Eggplant</td>
            <td>Zucchini</td>
            <td>Green Beans</td>
            <td>Cucumber</td>
            <td>Radish</td>
            <td>Sugar free Jamaica</td>
            <td>Splenda</td>


        </tr>
        <tr>
            <td>Cabbage</td>
            <td>Cauliflower</td>
            <td>Mushrooms</td>
            <td>Napa</td>
            <td>Tomatillo</td>
            <td>Coffee</td>
            <td>Diet Coke</td>
        </tr>

        <tr>
            <td>Asparagus</td>
            <td>Spinach</td>
            <td>Tomato</td>
            <td>Quelite</td>
            <td>Lemon</td>
            <td>Light Jelly</td>
            <td>Spices</td>
        </tr>
          </tbody>
        </table>
      </div>
     );
  }

  ViewStatus(){
    if(this.state.goDiet=="NotFound"){
      swal({
        title:'Public Diets are not avalible yet',
        text:'Please come latter',
        type:'warning',
        onClose: () => {
          window.location='/transition'
        }
      })
      
   }else if(this.state.goDiet=="Found"){
       return (
           <div>
               {this.MainContent()}
           </div>   
       )
   }else if(this.state.goDiet=="Loading"){
       return (
           <div>
              <h1>Loading...</h1>
           </div>   
       )
   }
 
}
MainContent(){
  return(
    <div className="container" style={{marginTop:"20px"}}>
      <div className="row">
        <div className="col-5">
        
        <div className="container">
              <div id="list-example" className="list-group">
              <div className="row">
                <div className="col-4">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Type Food</th>
                    </tr>
                  </thead>
                </table>
                  <a className="list-group-item list-group-item-action btn-label" href="#list-item-1" >Milk</a>
                  <a className="list-group-item list-group-item-action btn-label" href="#list-item-2">Vegetable</a>
                  <a className="list-group-item list-group-item-action btn-label" href="#list-item-3">Fruits</a>
                  <a className="list-group-item list-group-item-action btn-label" href="#list-item-4">Cereal</a>
                  <a className="list-group-item list-group-item-action btn-label" href="#list-item-5">Meat</a>
                  <a className="list-group-item list-group-item-action btn-label" href="#list-item-6">Fats</a>
                  <a className="list-group-item list-group-item-action btn-label" href="#list-item-7">Sugar</a>
                </div>
                <div className="col-8"  >
                <table className="table" style={{marginBottom:"26px"}}>
                  <thead>
                    <tr>
                      <th scope="col">B.Fast</th>
                      <th scope="col">Lunch</th>
                      <th scope="col">Dinner</th>
                      <th scope="col">Snak</th>
                    </tr>
                  </thead>
                </table>
                  <form>
                    {this.MilkInputs()}
                    <hr className="MarginLines"/>
                    {this.VegetableInputs()}
                    <hr className="MarginLines"/>
                    {this.FruitInputs()}
                    <hr className="MarginLines"/>
                    {this.CerealInputs()}
                    <hr className="MarginLines"/>
                    {this.MeatInputs()}
                    <hr className="MarginLines"/>
                    {this.FatsInputs()}
                    <hr className="MarginLines"/>
                    {this.BonusInputs()}
                    
                    {this.renderButtom()}
                  </form>
                </div>
              </div>
              </div>
            </div>
          
        </div>

        <div className="col-7">
        <h3 style={{marginTop:"5px"}}>Food Table</h3>
          <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">
            <h4 id="list-item-1">Milk</h4>
              {this.MilkTable()}
            <h4 id="list-item-2">Vegetable</h4>
              {this.VegetableTable()}
            <h4 id="list-item-3">Fruits</h4>
              {this.FruitsTable()}
            <h4 id="list-item-4">Cereal</h4>
              {this.CerealTable()}
            <h4 id="list-item-5">Meat</h4>
              {this.MeatTable()}
            <h4 id="list-item-6">Fats</h4>
              {this.FatsTable()}
            <h4 id="list-item-7">Sugar</h4>
              {this.SugarTable()}  
            <h4 >Bonus Food</h4>
              {this.BonusTable()}  
          </div> 
        </div>
      </div>
    </div>
  ); 
}
  render() {
    return(
      <div>
        {this.ViewStatus()}
      </div>
    );
  }
}

export default Diet;
