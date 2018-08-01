import React, { Component } from "react";
import "whatwg-fetch";
import { getFromStorage } from "../../utils/storage";

class Diet extends Component {
  constructor() {
    super();

    this.state = {
      dietAssigned: "Loading",
      isLoading: true,
      tokendiet: "",
      currentPatientId: "",
      NutritionistAccount: false,

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
    var ClientSendFromTransition = "";
    var usertoken = "";
    const clientSelectedObj = getFromStorage("myClient");
    ClientSendFromTransition = clientSelectedObj._id;

    //Get the current UserID on session
    const obj = getFromStorage("the_main_app");
    const { token } = obj;
    fetch("/api/accounts/GetUserFromUserSession?token=" + token)
      .then(res => res.json())
      .then(json => {
        usertoken = json.userId;
        console.log(usertoken);
        console.log(token);
        if (localStorage.getItem("Rol") == "Cliente") {
          //if (usertoken == ClientSendFromTransition){
          console.log("es cliente");
          this.setState({
            NutritionistAccount: false
          });
          this.CheckIfImAPatient(usertoken);
        } else {
          console.log("es nutriologo");
          this.setState({
            dietAssigned: "Diet assigned",
            NutritionistAccount: true
          });
          this.CheckIfImAPatient(ClientSendFromTransition);
        }
      });
  }
  CheckIfImAPatient(currentUserId) {
    //Check for an existing relationship on Patient
    fetch("/api/accounts/GetUser?token=" + currentUserId)
      .then(res => res.json())
      .then(json => {
        if (json.doc == null) {
          this.setState({
            dietAssigned: "No diet assigned"
          });

          //window.location = "/catalogueNutriologist";
        } else {
          this.setState({
            currentPatientId: json.doc._id,
            dietAssigned: "Diet assigned"
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
          collationSugar: json.collationSugar
        });
      });
  }
  onEditDiet() {
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
    fetch("/api/accounts/ModifyDiet", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tokendiet: tokendiet,
        breakfastMilk: breakfastMilk,
        breakfastVeg: breakfastVeg,
        breakfastFruit: breakfastFruit,
        breakfastCereal: breakfastCereal,
        breakfastMeat: breakfastMeat,
        breakfastFat: breakfastFat,
        breakfastSugar: breakfastSugar,

        lunchMilk: lunchMilk,
        lunchVeg: lunchVeg,
        lunchFruit: lunchFruit,
        lunchCereal: lunchCereal,
        lunchMeat: lunchMeat,
        lunchFat: lunchFat,
        lunchSugar: lunchSugar,

        dinnerMilk: dinnerMilk,
        dinnerVeg: dinnerVeg,
        dinnerFruit: dinnerFruit,
        dinnerCereal: dinnerCereal,
        dinnerMeat: dinnerMeat,
        dinnerFat: dinnerFat,
        dinnerSugar: dinnerSugar,

        collationMilk: collationMilk,
        collationVeg: collationVeg,
        collationFruit: collationFruit,
        collationCereal: collationCereal,
        collationMeat: collationMeat,
        collationFat: collationFat,
        collationSugar: collationSugar
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
    window.location = "/vistacliente";
  }
  renderTitle() {
    if (localStorage.getItem("Rol") == "Nutriologo") {
      //if(this.state.NutritionistAccount) {
      return <p>Edit Diet</p>;
    } else {
      return <p>View Diet</p>;
    }
  }
  renderButtom() {
    if (localStorage.getItem("Rol") == "Nutriologo") {
      //  if(this.state.NutritionistAccount) {
      return (
        <button
          type="button"
          className="btn btn-dark"
          onClick={this.onEditDiet}
        >
          Edit Diet
        </button>
      );
    }
  }
  calendarioDieta() {
    const {
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

    if (this.state.dietAssigned == "Diet assigned") {
      return (
        <div className="col-md-4">
          {this.renderTitle()}
          <br />
          <br />
          <b>Break Fast| </b>
          <b>Lunch | </b>
          <b>Dinner | </b>
          <b>Collation</b>
          <br />
          <input
            type="breakfastMilk"
            size="4"
            name="breakfastMilk"
            placeholder="breakfastMilk"
            value={breakfastMilk}
            onChange={this.handleInputChange}
          />
          <input
            type="lunchMilk"
            size="4"
            name="lunchMilk"
            placeholder="lunchMilk"
            value={lunchMilk}
            onChange={this.handleInputChange}
          />
          <input
            type="dinnerMilk"
            size="4"
            name="dinnerMilk"
            placeholder="dinnerName"
            value={dinnerMilk}
            onChange={this.handleInputChange}
          />
          <input
            type="collationMilk"
            size="4"
            name="collationMilk"
            placeholder="collationMilk"
            value={collationMilk}
            onChange={this.handleInputChange}
          />
          <b>Milk</b>
          <br />

          <input
            type="breakfastFruit"
            size="4"
            name="breakfastFruit"
            placeholder="breakfastFruit"
            value={breakfastFruit}
            onChange={this.handleInputChange}
          />
          <input
            type="lunchFruit"
            size="4"
            name="lunchFruit"
            placeholder="lunchFruit"
            value={lunchFruit}
            onChange={this.handleInputChange}
          />
          <input
            type="dinnerFruit"
            size="4"
            name="dinnerFruit"
            placeholder="dinnerName"
            value={dinnerFruit}
            onChange={this.handleInputChange}
          />
          <input
            type="collationFruit"
            size="4"
            name="collationFruit"
            placeholder="collationFruit"
            value={collationFruit}
            onChange={this.handleInputChange}
          />
          <b>Fruit</b>
          <br />
          <input
            type="breakfastCereal"
            size="4"
            name="breakfastCereal"
            placeholder="breakfastCereal"
            value={breakfastCereal}
            onChange={this.handleInputChange}
          />
          <input
            type="lunchCereal"
            size="4"
            name="lunchCereal"
            placeholder="lunchCereal"
            value={lunchCereal}
            onChange={this.handleInputChange}
          />
          <input
            type="dinnerCereal"
            size="4"
            name="dinnerCereal"
            placeholder="dinnerName"
            value={dinnerCereal}
            onChange={this.handleInputChange}
          />
          <input
            type="collationCereal"
            size="4"
            name="collationCereal"
            placeholder="collationCereal"
            value={collationCereal}
            onChange={this.handleInputChange}
          />
          <b>Cereal</b>
          <br />
          <input
            type="breakfastMeat"
            size="4"
            name="breakfastMeat"
            placeholder="breakfastMeat"
            value={breakfastMeat}
            onChange={this.handleInputChange}
          />
          <input
            type="lunchMeat"
            size="4"
            name="lunchMeat"
            placeholder="lunchMeat"
            value={lunchMeat}
            onChange={this.handleInputChange}
          />
          <input
            type="dinnerMeat"
            size="4"
            name="dinnerMeat"
            placeholder="dinnerName"
            value={dinnerMeat}
            onChange={this.handleInputChange}
          />
          <input
            type="collationMeat"
            size="4"
            name="collationMeat"
            placeholder="collationMeat"
            value={collationMeat}
            onChange={this.handleInputChange}
          />
          <b>Meat</b>
          <br />
          <input
            type="breakfastFat"
            size="4"
            name="breakfastFat"
            placeholder="breakfastFat"
            value={breakfastFat}
            onChange={this.handleInputChange}
          />
          <input
            type="lunchFat"
            size="4"
            name="lunchFat"
            placeholder="lunchFat"
            value={lunchFat}
            onChange={this.handleInputChange}
          />
          <input
            type="dinnerFat"
            size="4"
            name="dinnerFat"
            placeholder="dinnerName"
            value={dinnerFat}
            onChange={this.handleInputChange}
          />
          <input
            type="collationFat"
            size="4"
            name="collationFat"
            placeholder="collationFat"
            value={collationFat}
            onChange={this.handleInputChange}
          />
          <b>Fat</b>
          <br />
          <input
            type="breakfastSugar"
            size="4"
            name="breakfastSugar"
            placeholder="breakfastSugar"
            value={breakfastSugar}
            onChange={this.handleInputChange}
          />
          <input
            type="lunchSugar"
            size="4"
            name="lunchSugar"
            placeholder="lunchSugar"
            value={lunchSugar}
            onChange={this.handleInputChange}
          />
          <input
            type="dinnerSugar"
            size="4"
            name="dinnerSugar"
            placeholder="dinnerName"
            value={dinnerSugar}
            onChange={this.handleInputChange}
          />
          <input
            type="collationSugar"
            size="4"
            name="collationSugar"
            placeholder="collationSugar"
            value={collationSugar}
            onChange={this.handleInputChange}
          />
          <b>Sugar</b>
          <br />
          <br />
          {this.renderButtom()}
          <div className="col-md-4">
            <img
              height="500px"
              width="500px"
              src="/assets/img/imagen3.jpg"
              className="rotate270"
              alt="Imagen3"
            />
          </div>
        </div>
      );
    } else if (this.state.dietAssigned == "No diet assigned") {
      return (
        <div align="center">
          <h1>No tienes dieta</h1>
          <a className="btn btn-success" href="/catalogueNutriologist">
            catalogo
          </a>
        </div>
      );
    } else if (this.state.dietAssigned == "Loading") {
      return (
        <div>
          <h1>Loading... </h1>
        </div>
      );
    }
  }
  render() {
    return <div>{this.calendarioDieta()}</div>;
  }
}

export default Diet;
