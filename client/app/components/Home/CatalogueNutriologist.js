import React, { Component,Children } from 'react';

class CatalogueNutriologist extends Component {
 
  constructor() {
    var Items=[];
    super();

    this.state = {
      Nutitionists:[],
    
    };

  }
  componentDidMount(){
    fetch('/api/accounts/nutritionistcatalog', {method:'GET'})
    .then(res => res.json())
    .then (json=> {
     
        this.setState({
          Nutitionists:json
        });
        
        //console.log(items);
      
    });
  }
  
  render() {
    const {
      Nutitionists=[],
      Nutitionists1=JSON.stringify(Nutitionists),
      Algo={}
    } = this.state;
//     var arr = [];
// for (var key in Nutitionists1) {
//   arr.push(Nutitionists1[key]);
// }
    //  const labels = Children.map(this.props.children, child =>(
    //    <ul>
    //      {child}
    //    </ul>
    //  ));
var arr3 = Object.values(this.state.Nutitionists);
    //var arr3 = Object.values(Algo);
    console.log(this.props,"Hello");
    return (<div className="container"><p>In this place will be the Catalogue of Nutriologist, but theres nothing here yet, come back later bro</p><br />
    {/* <input type="text" name= "profPassword" placeholder="password" value ={arr3} readOnly/><br /> */}
    <ul>
      {
        arr3.map((arr3,i)=>{
          return <li key={i}> {arr3} </li>
        })
      }
    </ul>
    {/* {labels} */}
    </div>);
  }
}

export default CatalogueNutriologist;