import React, { Component } from 'react';

class CatalogueNutriologist extends Component {
  constructor() {
    super();

    this.state = {
    };

  }
  // return (<div className="container"><p>In this place will be the Catalogue of Nutriologist, but theres nothing here yet, come back later bro</p></div>);
  render() {
    const {

    } = this.state;

    return (
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
          
          <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
          </ol>
      
          
          <div class="carousel-inner" role="listbox">
            <div class="item active">
              <img src="https://placehold.it/1200x400?text=IMAGE" alt="Image"></img>
              <div class="carousel-caption">
                <h3>Sell $</h3>
                <p>Money Money.</p>
              </div>      
            </div>
      
            <div class="item">
              <img src="https://placehold.it/1200x400?text=Another Image Maybe" alt="Image"></img>
              <div class="carousel-caption">
                <h3>More Sell $</h3>
                <p>Lorem ipsum...</p>
              </div>      
            </div>
          </div>
      
          
          <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
      </div>
        
      
      );
  }
}

export default CatalogueNutriologist;