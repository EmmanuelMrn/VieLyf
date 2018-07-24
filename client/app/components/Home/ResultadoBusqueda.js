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
            <div key={array3._id} className="idcliente">
              {array3.FirstName}
              {array3.LastName}
              <br />
              {array3.Role}
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
