import React, { Component } from 'react';

class CatalogueNutriologist extends Component {
  constructor() {
    super();

    this.state = {
      Nutitionists:[]
    };

  }
  componentDidMount(){
    fetch('/api/accounts/nutritionistcatalog', {method:'GET'})
    .then(res => res.json())
    .then (json=> {
     
        this.setState({
          Nutitionists:json
        });
        console.log(this.state.Nutitionists);
      
    });
  }
  
  render() {
    const {
      
    } = this.state;

    return (<div className="container"><p>In this place will be the Catalogue of Nutriologist, but theres nothing here yet, come back later bro</p><br />
    <input type="text" name= "profPassword" placeholder="password" value ={this.Nutitionists[0].FirstName} readOnly/><br />
    </div>);
  }
}

export default CatalogueNutriologist;