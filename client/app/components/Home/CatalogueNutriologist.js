import React, { Component,Children } from 'react';

class CatalogueNutriologist extends Component {
 
  constructor() {
    var Items=[];
    super();

    this.state = {
      Nutritionists:[],
    
    };

  }

  componentDidMount(){
  fetch('/api/accounts/nutritionistcatalog', {method:'GET'})
    .then(res => res.json())
    .then (json=> {
        // you set the value of the Nutritionist Contant to that of the JSON you receive
        this.setState({
          Nutritionists:json
        });
        
        
      
    });
  }
 
render()
{
  //This is used to convert the Nutritionist constant from a JSON to an Array
  var Nutritionists = Array.from(this.state.Nutritionists);
  console.log(this.state.Nutritionists);
 
  return(
    <div>
      <h1>Nutriologos</h1>
      { //using the variable Nutritionist we map the values
        Nutritionists.map(function(nutritionist){
        return(
            // the values are now in nutritionis and the names of the fields
            //  are the same ast the ones in the JSON
          <div key={nutritionist._id} className="nutritionist">
            <a href={nutritionist._id}>
                    {nutritionist.FirstName}
                    is looking for a 
                    {nutritionist.LastName}
                    {nutritionist.Role}
            </a>
            </div>
            )
            })}
          </div>
  )

  }
}

  

export default CatalogueNutriologist;