import React, { Component } from "react";
import "whatwg-fetch";
import { Link } from "react-router-dom";
import { getFromStorage, setInStorage } from "../../utils/storage";

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      token: "",
      Name: "",
      Customers: []
    };

    this.inputsearch = this.inputsearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    //this.ActionLink = this.ActionLink.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.inputsearch();
  }

  ActionLink() {
    return (
      <span class="input-group-btn">
        <button
          class="btn btn-default"
          type="button"
          onClick={this.handleClick}
        >
          Search
        </button>
      </span>
    );
  }

  inputsearch() {
    console.log("search name " + this.state.Name);
    fetch("/api/account/searchuser?token=" + this.state.Name)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            Customers: json.doc.map(function(item) {
              return item;
            }),
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
        console.log(this.state.Customers);
        console.log(this.state.Customers.length);
        setInStorage("searchresults", { token: json.doc });
        window.location = "/ResultadoBusqueda";
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

  render() {
    var Customers = Array.from(this.state.Customers);
    var that = this;

    const { isLoading, token, Name } = this.state;

    return (
      <div>
        <h1>Search Bar</h1>
        <div className="form-group">
          <div className="col-lg-6">
            <div className="input-group">
              <input
                type="text"
                name="Name"
                placeholder="Name"
                value={this.state.Name}
                onChange={this.handleInputChange}
              />
              {this.ActionLink()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
