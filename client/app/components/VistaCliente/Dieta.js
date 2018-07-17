import React, { Component } from "react";
import "whatwg-fetch";
import { getFromStorage, setInStorage } from "../../utils/storage";
var currentPatientId = "";
var currentDietId = "";
/*var dietidtoken = "";
var patientsidtoken = "";
var useridtoken;*/
class Dieta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      Client_id: "",
      Nutritionist_id: "",
      tokendiet: "",
      // userstoken: "",
      patientsidtoken: "",
      patient: "",
      dietidtoken: "",

      //Diet 7 x 4
      //Breakfast

      breakfastMilk: "",
      breakfastVeg: "",
      breakfastFruit: "",
      breakfastCereal: "",
      breakfastMeat: "",
      breakfastFat: "",
      breakfastSugar: "",
      //lunch
      lunchMilk: "",
      lunchVeg: "",
      lunchFruit: "",
      lunchCereal: "",
      lunchfastMeat: "",
      lunchfastFat: "",
      lunchfastSugar: "",
      //dinner
      dinnerMilk: "",
      dinnerVeg: "",
      dinnerFruit: "",
      dinnerCereal: "",
      dinnerfastMeat: "",
      dinnerfastFat: "",
      dinnerfastSugar: "",
      //Collation
      collationMilk: "",
      collationVeg: "",
      collationFruit: "",
      collationCereal: "",
      collationfastMeat: "",
      collationfastFat: "",
      collationfastSugar: ""
    };

    //  this.onUpdateCorpA = this.onUpdateCorpA.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    this.ongetDietDetails = this.ongetDietDetails.bind(this);

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
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("/api/account/verify?token=" + token)
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
    } else {
      this.setState({
        isLoading: false
      });
    }
  }
  GetMyUser(currentUserId) {
    //Check for an existing relationship on Patient
    fetch("/api/accounts/GetUser?token=" + currentUserId)
      .then(res => res.json())
      .then(json => {
        this.setState({
          patient: json._id
        });
        currentPatientId = json._id;
        this.GetMyPatient(currentPatientId);
      });
  }
  GetMyPatient(currentPatientId) {
    //Check for the diet
    fetch("/api/accounts/GetPatient?token=" + currentPatientId)
      .then(res => res.json())
      .then(json => {
        this.setState({
          tokendiet: json._id
        });
        currentDietId = json._id;
        this.GetMyDiets(currentDietId);
      });
  }
  onUpdateDiet() {
    const {
      token,
      breakfastMilk,
      breakfastVeg,
      breakfastFruit,
      breakfastCereal,
      breakfastMeat,
      breakfastFat,
      breakfastSugar,
      //lunch
      lunchMilk,
      lunchVeg,
      lunchFruit,
      lunchCereal,
      lunchfastMeat,
      lunchfastFat,
      lunchfastSugar,
      //dinner
      dinnerMilk,
      dinnerVeg,
      dinnerFruit,
      dinnerCereal,
      dinnerfastMeat,
      dinnerfastFat,
      dinnerfastSugar,
      //Collation
      collationMilk,
      collationVeg,
      collationFruit,
      collationCereal,
      collationfastMeat,
      collationfastFat,
      collationfastSugar
    } = this.state;
    this.setState({
      isLoading: true
    });

    console.log();
    fetch("api/accounts/ModifyDiet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: token,
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
        console.log(json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            _id: "",

            breakfastMilk: "",
            breakfastVeg: "",
            breakfastFruit: "",
            breakfastCereal: "",
            breakfastMeat: "",
            breakfastFat: "",
            breakfastSugar: "",
            //lunch
            lunchMilk: "",
            lunchVeg: "",
            lunchFruit: "",
            lunchCereal: "",
            lunchfastMeat: "",
            lunchfastFat: "",
            lunchfastSugar: "",
            //dinner
            dinnerMilk: "",
            dinnerVeg: "",
            dinnerFruit: "",
            dinnerCereal: "",
            dinnerfastMeat: "",
            dinnerfastFat: "",
            dinnerfastSugar: "",
            //Collation
            collationMilk: "",
            collationVeg: "",
            collationFruit: "",
            collationCereal: "",
            collationfastMeat: "",
            collationfastFat: "",
            collationfastSugar: ""
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
  }

  ongetDietDetails() {
    const obj = getFromStorage("the_main_app");
    const { token, dietidtoken, patientsidtoken, useridtoken } = obj;

    console.log("Session id token" + token);

    fetch("/api/account/getUserId?token=" + token)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          //    setInStorage("the_main_app", { useridtoken: json.token });
          this.setState({
            //useridtoken = JSON.parse(token),
            useridtoken: json.token,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    console.log("User id token: " + useridtoken);

    fetch("/api/account/verifyPatients?token=" + useridtoken)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          //   setInStorage("the_main_app", { patientsidtoken: json.token });
          this.setState({
            patientsidtoken: json.token,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });

    console.log("patients id token" + patientsidtoken);

    fetch("/api/account/verifyDiets?token=" + patientsidtoken)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          //  setInStorage("the_main_app", { dietidtoken: json.token });
          this.setState({
            dietidtoken: json.token,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    console.log("Diets token id " + dietidtoken);
  }

  onEditDiet() {
    const {
      isLoading,
      Client_id,
      Nutritionist_id,
      tokendiet,
      userstoken,
      patient,

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
      method: "POST",
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
        if (json.success) {
          //console.log("cool");
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
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
      <div>
        <p>Edit Diet</p>
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
          type="breakfastVeg"
          size="4"
          name="breakfastVeg"
          placeholder="breakfastVeg"
          value={breakfastVeg}
          onChange={this.handleInputChange}
        />
        <input
          type="lunchVeg"
          size="4"
          name="lunchVeg"
          placeholder="lunchVeg"
          value={lunchVeg}
          onChange={this.handleInputChange}
        />
        <input
          type="dinnerVeg"
          size="4"
          name="dinnerVeg"
          placeholder="dinnerName"
          value={dinnerVeg}
          onChange={this.handleInputChange}
        />
        <input
          type="collationVeg"
          size="4"
          name="collationVeg"
          placeholder="collationVeg"
          value={collationVeg}
          onChange={this.handleInputChange}
        />
        <b>Vegetable</b>
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
        <button
          type="button"
          className="btn btn-dark"
          onClick={this.onEditDiet}
        >
          Edit Diet
        </button>

        <button
          type="button"
          className="btn btn-dark"
          onClick={this.ongetDietDetails}
        >
          test
        </button>
      </div>
    );
  }
}

export default Dieta;
