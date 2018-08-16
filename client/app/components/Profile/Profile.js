import React, { Component, Children } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import "whatwg-fetch";

import { setClientInStorage, getFromStorage } from "../../utils/storage";

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      UserProfile: [],
      goProfile: "Loading"
    };
  }

  componentDidMount() {
    var UserNameRequest = window.location.pathname.slice(9);
    console.log(UserNameRequest);
    this.UserProfile(UserNameRequest);
  }

  UserProfile(UserNameRequest) {
    fetch("/api/account/getUserByUserName?PathName=" + UserNameRequest)
      .then(res => res.json())
      .then(json => {
        if (json.doc == null) {
          console.log("nulo");
          this.setState({
            goProfile: "NotFound"
          });
        } else {
          this.setState({
            UserProfile: json.doc,
            goProfile: "Found"
          });
        }
      });
  }
  ChangeProfile() {
    if (this.state.goProfile == "NotFound") {
      return (
        <div>
          <h1>Sorry User Not Found :(</h1>
        </div>
      );
    } else if (this.state.goProfile == "Found") {
      return <div>{this.Profile()}</div>;
    } else if (this.state.goProfile == "Loading") {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
  }
  Profile() {
    var user = this.state.UserProfile;
    return (
      <div class="container">
        <div class="row">
          <div class="col-4">
            <div class="col-md-6" align="center">
              <br />
              <img
                height="120px"
                src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
              />
            </div>
            <div class="col-md-6">
              <p class="text-center">
                <strong>
                  {user.FirstName} {user.LastName}
                </strong>
              </p>
              <p class="text-center">
                <em>UserName: {user.Email}</em>
              </p>
            </div>

            <div class="col-md-8">
              <br />
              <ul class="list-group list-primary">
                <a class="list-group-item">First Name: {user.FirstName}</a>
                <a class="list-group-item">Last Name: {user.LastName}</a>
                <a class="list-group-item">Phone: {user.Phone}</a>
                <a class="list-group-item">Email: {user.Email}</a>
                <a class="list-group-item">Role: {user.Role}</a>
              </ul>
            </div>
          </div>

          <div class="col-8">
            <br />
            <div class="col-md-12" align="center">
              <h3 align="center">
                Profile{" "}
                <p>
                  <small>Profile's Content</small>
                </p>
              </h3>
            </div>
            <br />
            <div class="card text-center">
              <div class="card-header">Featured</div>
              <div class="card-body">
                <h5 class="card-title">Content</h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
              <div class="card-footer text-muted">2 days ago</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const prueba = this.state.goProfile;
    console.log(prueba);
    return <div>{this.ChangeProfile()}</div>;
  }
}

export default Profile;
