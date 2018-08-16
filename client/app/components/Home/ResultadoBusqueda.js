import React, { Component, Children } from "react";
import { getFromStorage } from "../../utils/storage";
import { Link } from "react-router-dom";

class ResultadoBusqueda extends Component {
  constructor() {
    var Items = [];
    super();

    this.state = {
      Nutritionists: []
    };
  }

  componentDidMount() {}

  render() {
    const { results = [], obj = getFromStorage("searchresults") } = this.state;
    //const obj = getFromStorage("searchresults");
    console.log(obj);

    var array2 = Object.values(obj);
    var array3 = Object.values(array2[0]);

    //console.log(array2);
    //console.log(array2[0][1].FirstName);
    //console.log(array2[0].length);
    //console.log("array3");
    console.log(array3);
    //console.log(array3[0].FirstName);
    console.log(array3.length);
    return (
      <div>
        <h1>Search results</h1>
        {array3.map(function(array3) {
          return (
            <div className="container">
              <div className="row">
                <div
                  class="col-xs-12 col-sm-6 col-md-4"
                  key={array3._id}
                  className="idcliente"
                >
                  <link
                    href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
                    rel="stylesheet"
                    id="bootstrap-css"
                  />
                  <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" />
                  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
                  <div
                    class="image-flip"
                    ontouchstart="this.classList.toggle('hover');"
                  >
                    <div class="mainflip">
                      <div class="frontside">
                        <div class="card">
                          <div class="card-body text-center">
                            <p>
                              <img
                                class=" img-fluid"
                                src="https://placeimg.com/640/480/people"
                                alt="card image"
                              />
                            </p>

                            <p class="card-text">
                              {array3.FirstName}
                              {array3.LastName}
                              <br />
                              {array3.Role}
                            </p>
                            <a href="#" class="btn btn-primary btn-sm">
                              <i class="fa fa-plus" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="backside">
                        <div class="card">
                          <div class="card-body text-center mt-4">
                            <h4 class="card-title">ArkusNexus Bootcamp</h4>
                            <p class="card-text">
                              Vielyf proyect
                              <br />
                              Phone: {array3.Phone}
                              <br />
                              Email: {array3.Email}
                            </p>
                            <ul class="list-inline">
                              <li class="list-inline-item">
                                <a
                                  class="social-icon text-xs-center"
                                  target="_blank"
                                  href="#"
                                >
                                  <i class="fa fa-facebook" />
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a
                                  class="social-icon text-xs-center"
                                  target="_blank"
                                  href="#"
                                >
                                  <i class="fa fa-twitter" />
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a
                                  class="social-icon text-xs-center"
                                  target="_blank"
                                  href="#"
                                >
                                  <i class="fa fa-skype" />
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a
                                  class="social-icon text-xs-center"
                                  target="_blank"
                                  href="#"
                                >
                                  <i class="fa fa-google" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <Link to="/VistaCliente" className="btn btn-dark">
          Regresar{" "}
        </Link>
      </div>
    );
  }
}
export default ResultadoBusqueda;
