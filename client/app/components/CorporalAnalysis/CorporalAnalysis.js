
import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  getFromStorage,
} from '../../utils/storage';



class CorporalAnalysis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName:'',
      lastName:'',
      corpFirstname:'',
      corpLastName:'',
      id:'',
      height:'',
      weight:'',
      Age:'',
      FatFreeBodyMass:'',
      LeanSoftTissue:'',
      TotalBodyWater:'',
      FFBMBodyFat:'',
      LSTBodyFat:'',
      LSTMineral:'',
      TBWProtein:'',
      TBWMineral:'',
      TBWBodyFat:'',
      BodyMassIndex:'',
      BodyFat:'',
      FatFreeMass:''
    };
    this.onTextBoxChange = this.onTextBoxChange.bind(this);
    this.onUpdateCorpA= this.onUpdateCorpA.bind(this);
}
onTextBoxChange(event)
{
  const {name, value} = event.target;
  this.setState({
      [name]: value
  });
  console.log(name,value);
}

onUpdateCorpA()
{
  const {

    height,
    weight,
    Age,
    FatFreeBodyMass,
    LeanSoftTissue,
    TotalBodyWater,
    FFBMBodyFat,
    LSTBodyFat,
    LSTMineral,
    TBWProtein,
    TBWMineral,
    TBWBodyFat

    }=this.state;
    console.log(this.state);
    this.setState({
      isLoading:true
     });
     console.log()
    fetch('api/accounts/AnalysisFill', 
  { method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    }, 
    body : JSON.stringify({
      
      id: this.state.id,
      Weight:weight,
      Height:height,
      Age:Age,
      FatFreeBodyMass:FatFreeBodyMass,
      LeanSoftTissue:LeanSoftTissue,
      TotalBodyWater:TotalBodyWater,
      FFBMBodyFat: FFBMBodyFat,
      LSTBodyFat:LSTBodyFat,
      LSTMineral:LSTMineral,
      TBWProtein:TBWProtein,
      TBWMineral:TBWMineral,
      TBWBodyFat:TBWBodyFat
    }),
})
    .then(res => res.json())
    .then(json => {
      console.log(json);
      if(json.success){
        this.setState({
          signUpError:json.message,
          isLoading:false,
          id:'',
          height:'',
          weight:'',
          Age:'',
          FatFreeBodyMass:'',
          LeanSoftTissue:'',
          TotalBodyWater:'',
          FFBMBodyFat:'',
          LSTBodyFat:'',
          LSTMineral:'',
          TBWProtein:'',
          TBWMineral:'',
          TBWBodyFat:''
        });
      
      }
      else{
        this.setState({
          
          isLoading:false
        });
      }
    });


}
componentDidMount()
{
  const clientSelectedObj = getFromStorage('myClient');
  this.state.id = clientSelectedObj._id;
  console.log(this.state.id);
}
  render()
  {
    
      const {
         
        corpFirstname,
        corpLastName,
        id,
          height,
          weight,
          Age,
          FatFreeBodyMass,
          LeanSoftTissue,
          TotalBodyWater,
          FFBMBodyFat,
          LSTBodyFat,
          LSTMineral,
          TBWProtein,
          TBWMineral,
          TBWBodyFat,
          BodyMassIndex,
          BodyFat,
          FatFreeMass,
          isLoading
      } = this.state;
 // if(isLoading)
   //{
     return(   
  <div>
      <div className="container">
      <div className="row">
      <div className="col-10 offset-2">
       <p>Fill the client information</p><br />
       
       <input type="tex" name="corpFirstname" placeholder="First Name" value ={corpFirstname} onChange={this.onTextBoxChange}/>
       <input type="tex" name ="corpLastName" placeholder="Last  Name" value ={corpLastName}  onChange={this.onTextBoxChange}/>
       {/* <input type="text" name="id" placeholder={id} value={id} onChange={this.onTextBoxChange}/><br /> */}
       <input type="tex" name="height" placeholder="Height" value ={height} onChange={this.onTextBoxChange}/>
       <input type="tex" name ="weight" placeholder="Weight" value ={weight} onChange={this.onTextBoxChange}/>
       <input type="tex" name="Age" placeholder="Age" value={Age} onChange={this.onTextBoxChange}/>
        </div>
        </div>
        </div>
        <div className="container">
        <div className="row">
         <div className="col-9 offset-3"> <h3>Composicion Corporal</h3></div>
          <div className="col-10 offset-2">
          <input type="tex"   name =" weight" placeholder="Weight" value ={weight} onChange={this.onTextBoxChange}/><br />
          <input type="tex"  name ="FatFreeBodyMass" placeholder="Fat-Free Body Mass" value ={FatFreeBodyMass} onChange={this.onTextBoxChange}/><br />
          <input  type="tex"  name="FFBMBodyFat" placeholder="FFBM Body Fat" value ={FFBMBodyFat} onChange={this.onTextBoxChange}/><br />
          <input type="tex"  name="LeanSoftTissue" placeholder="Lean Soft Tissue" value ={LeanSoftTissue} onChange={this.onTextBoxChange}/><br />
          <input type="tex"  name ="LSTMineral" placeholder="Mineral" value ={LSTMineral} onChange={this.onTextBoxChange}/><br />
          <input type="tex"  name ="LSTBodyFat" placeholder="Body Fat" value ={LSTBodyFat} onChange={this.onTextBoxChange}/><br />
          <input type="tex"  name="TotalBodyWater" placeholder="Total Body Water" value ={TotalBodyWater} onChange={this.onTextBoxChange}/><br />
          <input type="tex"  name="TBWProtein" placeholder="Protein" value ={TBWProtein} onChange={this.onTextBoxChange}/><br /> 
          <input type="tex"  name ="TBWMineral" placeholder="Mineral" value ={TBWMineral} onChange={this.onTextBoxChange}/><br />  
          <input type="tex"  name="TBWBodyFat" placeholder="Body Fat" value ={TBWBodyFat} onChange={this.onTextBoxChange}/><br />
            </div>
            <div className="col-9 offset-3"> <h3>Weight Control Evaluation </h3></div> 
            <div className="col-10 offset-2">
            <input type="tex"  name="BodyFat" placeholder="Body Fat" value={BodyFat} onChange={this.onTextBoxChange}/><br />
            <input type="tex"  name="BodyMassIndex" placeholder="Body MassIndex" value={BodyMassIndex} onChange={this.onTextBoxChange}/><br />
            <input type="tex"  name="FatFreeMass" placeholder="Fat Free Mass" value={FatFreeMass} onChange={this.onTextBoxChange}/><br />            
            </div>
            </div>

      
        <button onClick={this.onUpdateCorpA}>Save</button>
        {/*<button onClick={this.logout}>logout</button> */}
      </div>
      </div>
         );
       // }   
        
        
        //  return(
        //   <p>Que pex</p>
        // );
        }
        }
    
export default CorporalAnalysis;