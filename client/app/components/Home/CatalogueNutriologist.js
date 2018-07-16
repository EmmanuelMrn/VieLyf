import React, { Component } from 'react';

class CatalogueNutriologist extends Component {
  constructor() {
    super();

    this.state = {
      items:[]
    };

  }
  componentDidMount(){
    fetch('/api/accounts/nutritionistcatalog')
    .then(res => res.json())
    .then (json=> {
      if(json.success)
      {
        this.setState({
          items:json
        });
        console.log(items);
      }
      else
      {
        console.log(json);
      }
    });
  }
  render() {
    const {

    } = this.state;

    return (<div className="container"><p>In this place will be the Catalogue of Nutriologist, but theres nothing here yet, come back later bro</p></div>);
  }
}

export default CatalogueNutriologist;