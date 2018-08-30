import React, { Component } from "react";

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
      tokenchido:"",

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
    const objClientSelected = getFromStorage("myClient");
    //Get the current UserID on session
    const objUserInSession = getFromStorage("the_main_app");
    fetch('/api/accounts/GetUserFromUserSession?token='+ objUserInSession.token)
        .then(res => res.json())
        .then(json => {
          this.setState({
            tokenchido:json.userId
          });

          if (localStorage.getItem("Rol") == "Nutriologo"){
            this.setState({
              NutritionistAccount:true
            })
            console.log("nutriologo"+objClientSelected._id)
            this.CheckIfImAPatient(objClientSelected._id)
          }else{
            this.setState({
              NutritionistAccount:false
            })
            console.log("no nutriologo"+this.state.tokenchido)
            this.CheckIfImAPatient(this.state.tokenchido)
          }
            
        });
    
    

  }
  CheckIfImAPatient(currentUserId) {
    //Check for an existing relationship on Patient
    fetch("/api/accounts/GetUser?token=" + currentUserId)
      .then(res => res.json())
      .then(json => {
        if (json.doc==null) {
          console.log("no tiene dieta"+json);
        } else {
          this.setState({
            currentPatientId: json.doc._id
          });
          this.GetDiets(this.state.currentPatientId);
        }
      });
  }

  GetDiets(currentPatientId) {
    fetch("/api/accounts/GetDiet?token=" + currentPatientId)
      .then(res => res.json())
      .then(json => {
        this.setState({
          tokendiet: currentPatientId,
          breakfastMilk: json.breakfastMilk,
          breakfastVeg: json.breakfastVeg,
          breakfastFruit: json.breakfastFruit,
          breakfastCereal: json.breakfastCereal,
          breakfastMeat: json.breakfastMeat,
          breakfastFat: json.breakfastFat,
          breakfastSugar: json.breakfastSugar,

          lunchMilk: json.lunchMilk,
          lunchVeg: json.lunchVeg,
          lunchFruit: json.lunchFruit,
          lunchCereal: json.lunchCereal,
          lunchMeat: json.lunchMeat,
          lunchFat: json.lunchFat,
          lunchSugar: json.lunchSugar,

          dinnerMilk: json.dinnerMilk,
          dinnerVeg: json.dinnerVeg,
          dinnerFruit: json.dinnerFruit,
          dinnerCereal: json.dinnerCereal,
          dinnerMeat: json.dinnerMeat,
          dinnerFat: json.dinnerFat,
          dinnerSugar: json.dinnerSugar,

          collationMilk: json.collationMilk,
          collationVeg: json.collationVeg,
          collationFruit: json.collationFruit,
          collationCereal: json.collationCereal,
          collationMeat: json.collationMeat,
          collationFat: json.collationFat,
          collationSugar: json.collationSugar,
        });
        
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
        if (json.success == false) {
          this.setState({
            isLoading: false
          });
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
        <div>
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

  dietInputs(){
    
  return(
    <div >
       <div class="row">
    <div class="col-2">
    <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[0] = input }}
        name="breakfastMilk"
        placeholder="breakfastMilk"
        min="0" max="3" step="1"
        value={this.state.breakfastMilk}
        onChange={this.handleInputChange}
      />
      </div>
      
      <div class="col-2">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[1] = input }}
        name="lunchMilk"
        placeholder="lunchMilk"
        min="0" max="3" step="1"
        value={this.state.lunchMilk}
        onChange={this.handleInputChange}
      />
      </div>
      <div class="col-2">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[2] = input }}
        name="dinnerMilk"
        placeholder="dinnerName"
        min="0" max="3" step="1"
        value={this.state.dinnerMilk}
        onChange={this.handleInputChange}
      />
      </div>
      <div class="col-2">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[3] = input }}
        name="collationMilk"
        placeholder="collationMilk"
        min="0" max="3" step="1"
        value={this.state.collationMilk}
        onChange={this.handleInputChange}
      />
      </div>
      <div class="col-4">
      <b>Milk</b>
      </div>
      </div>
     
      <div class="row">
      <div class="col-2">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[4] = input }}
        name="breakfastVeg"
        placeholder="breakfastVeg"
        min="0" max="3" step="1"
        value={this.state.breakfastVeg}
        onChange={this.handleInputChange}
      />
      </div>
      <div class="col-2">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[5] = input }}
        name="lunchVeg"
        placeholder="lunchVeg"
        min="0" max="3" step="1"
        value={this.state.lunchVeg}
        onChange={this.handleInputChange}
      />
      </div>
      <div class="col-2">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[6] = input }}
        name="dinnerVeg"
        placeholder="dinnerName"
        min="0" max="3" step="1"
        value={this.state.dinnerVeg}
        onChange={this.handleInputChange}
      />
      </div>
      <div class="col-2">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[7] = input }}
        name="collationVeg"
        placeholder="collationVeg"
        min="0" max="3" step="1"
        value={this.state.collationVeg}
        onChange={this.handleInputChange}
      />
      </div>
      <div class="col-4">
      <b>Vegetable</b>
      </div>
      </div>
  
      <div class="row">
      <div class="col-2">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[8] = input }}
        name="breakfastFruit"
        placeholder="breakfastFruit"
        min="0" max="3" step="1"
        value={this.state.breakfastFruit}
        onChange={this.handleInputChange}
      />
      </div>
      <div class="col-2">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[9] = input }}
        name="lunchFruit"
        placeholder="lunchFruit"
        min="0" max="3" step="1"
        value={this.state.lunchFruit}
        onChange={this.handleInputChange}
      />
      </div>
      <div class="col-2">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[10] = input }}
        name="dinnerFruit"
        placeholder="dinnerName"
        min="0" max="3" step="1"
        value={this.state.dinnerFruit}
        onChange={this.handleInputChange}
      />
      </div>
      <div class="col-2">
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[11] = input }}
        name="collationFruit"
        placeholder="collationFruit"
        min="0" max="3" step="1"
        value={this.state.collationFruit}
        onChange={this.handleInputChange}
      />
      </div>
      <div class="col-4">
      <b>Fruit</b>
      </div>
      </div>
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[12] = input }}
        name="breakfastCereal"
        placeholder="breakfastCereal"
        min="0" max="3" step="1"
        value={this.state.breakfastCereal}
        onChange={this.handleInputChange}
      />
      
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[13] = input }}
        name="lunchCereal"
        placeholder="lunchCereal"
        min="0" max="3" step="1"
        value={this.state.lunchCereal}
        onChange={this.handleInputChange}
      />
      
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[14] = input }}
        name="dinnerCereal"
        placeholder="dinnerName"
        min="0" max="3" step="1"
        value={this.state.dinnerCereal}
        onChange={this.handleInputChange}
      />
      
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[15] = input }}
        name="collationCereal"
        placeholder="collationCereal"
        min="0" max="3" step="1"
        value={this.state.collationCereal}
        onChange={this.handleInputChange}
      />
      
      <b>Cereal</b>
      <br />
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[16] = input }}
        name="breakfastMeat"
        placeholder="breakfastMeat"
        min="0" max="3" step="1"
        value={this.state.breakfastMeat}
        onChange={this.handleInputChange}
      />
      
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[17] = input }}
        name="lunchMeat"
        placeholder="lunchMeat"
        min="0" max="3" step="1"
        value={this.state.lunchMeat}
        onChange={this.handleInputChange}
      />
      
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[18] = input }}
        name="dinnerMeat"
        placeholder="dinnerName"
        min="0" max="3" step="1"
        value={this.state.dinnerMeat}
        onChange={this.handleInputChange}
      />
      
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[19] = input }}
        name="collationMeat"
        placeholder="collationMeat"
        min="0" max="3" step="1"
        value={this.state.collationMeat}
        onChange={this.handleInputChange}
      />
      
      <b>Meat</b>
      <br />
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[20] = input }}
        name="breakfastFat"
        placeholder="breakfastFat"
        min="0" max="3" step="1"
        value={this.state.breakfastFat}
        onChange={this.handleInputChange}
      />
      
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[21] = input }}
        name="lunchFat"
        placeholder="lunchFat"
        min="0" max="3" step="1"
        value={this.state.lunchFat}
        onChange={this.handleInputChange}
      />
      
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[22] = input }}
        name="dinnerFat"
        placeholder="dinnerName"
        min="0" max="3" step="1"
        value={this.state.dinnerFat}
        onChange={this.handleInputChange}
      />
      
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[23] = input }}
        name="collationFat"
        placeholder="collationFat"
        min="0" max="3" step="1"
        value={this.state.collationFat}
        onChange={this.handleInputChange}
      />
      
      <b>Fat</b>
      <br />
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[24] = input }}
        name="breakfastSugar"
        placeholder="breakfastSugar"
        min="0" max="3" step="1"
        value={this.state.breakfastSugar}
        onChange={this.handleInputChange}
      />
      
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[25] = input }}
        name="lunchSugar"
        placeholder="lunchSugar"
        min="0" max="3" step="1"
        value={this.state.lunchSugar}
        onChange={this.handleInputChange}
      />
      
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[26] = input }}
        name="dinnerSugar"
        placeholder="dinnerName"
        min="0" max="3" step="1"
        value={this.state.dinnerSugar}
        onChange={this.handleInputChange}
      />
      
      <input
        className="form-control"
        type="number"
        id="inputSize"
        ref = { (input) => {this.validation[27] = input }}
        name="collationSugar"
        placeholder="collationSugar"
        min="0" max="3" step="1"
        value={this.state.collationSugar}
        onChange={this.handleInputChange}
        
      />
      <b>Sugar</b>
      <br />
    </div>
  )

  }
 tabla(){
   return(
     <div>
    <table className="table">
    <thead className="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </table>
  
  <table class="table">
    <thead class="thead-light">
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </table>
  </div>
   );
 }
  render() {
    
    return (
      <div className="container">
        <div className="row">
          <div className="col-4	col-sm-4	col-md-4 col-lg-4	col-xl-4">
            {this.renderTitle()} 
            <div className="container containerchido" >
              <form >
                <div>
                  {this.dietInputs()}
                </div>
                  {this.renderButtom()}
              </form>
            </div>
          </div>
          <div class="col-8	col-sm-8	col-md-8 col-lg-8	col-xl-8">
            <div>
              {this.tabla()}
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default Diet;
