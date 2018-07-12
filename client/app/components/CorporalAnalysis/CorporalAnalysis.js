
import React, { Component } from 'react';


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
      TBWBodyFat:''
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
      
      id: id,
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
          isLoading
      } = this.state;
 // if(isLoading)
   //{
     return(   
  <div>
       <p>Fill the client information</p><br />
       
       <input type="text" name="corpFirstname" placeholder="First Name" value ={corpFirstname} onChange={this.onTextBoxChange}/>
       <input type="text" name ="corpLastName" placeholder="Last  Name" value ={corpLastName}  onChange={this.onTextBoxChange}/>
       <input type="text" name="id" placeholder={id} value={id} onChange={this.onTextBoxChange}/><br />
       <input type="text" name="height" placeholder="Height" value ={height} onChange={this.onTextBoxChange}/><br />
       <input type="text" name ="weight" placeholder="Weight" value ={weight} onChange={this.onTextBoxChange}/>
       <input type="text" name="Age" placeholder="Age" value={Age} onChange={this.onTextBoxChange}/>
        <div className="container">
        <div className="row">
         <div className="col-12"> <h3>Composicion Corporal</h3></div>
          <div className="col-12">
          <input type="text"  className="p-3 mb-2 bg-success text-white" name =" weight" placeholder="Weight" value ={weight} onChange={this.onTextBoxChange}/>
          </div>
          <div >
          <input type="text" className="p-3 mb-5 bg-success text-white" name ="FatFreeBodyMass" placeholder="Fat-Free Body Mass" value ={FatFreeBodyMass} onChange={this.onTextBoxChange}/>
          </div>
          <div className="col-8">
          <input  type="text" className="p-3 mb-5 bg-success text-white" name="FFBMBodyFat" placeholder="FFBM Body Fat" value ={FFBMBodyFat} onChange={this.onTextBoxChange}/>
            </div>
            <div>
          <input type="text" className="p-3 mb-5 bg-success text-white" name="LeanSoftTissue" placeholder="Lean Soft Tissue" value ={LeanSoftTissue} onChange={this.onTextBoxChange}/>
            </div>
            <div>
          <input type="text" className="p-3 mb-5 bg-success text-white" name ="LSTMineral" placeholder="Mineral" value ={LSTMineral} onChange={this.onTextBoxChange}/>
            </div>
            <div className="col-6">
          <input type="text" className="p-3 mb-5 bg-success text-white" name ="LSTBodyFat" placeholder="Body Fat" value ={LSTBodyFat} onChange={this.onTextBoxChange}/>
            </div>
            <div>
          <input type="text" className="p-3 mb-5 bg-success text-white" name="TotalBodyWater" placeholder="Total Body Water" value ={TotalBodyWater} onChange={this.onTextBoxChange}/>
            </div>
            <div>
          <input type="text" className="p-3 mb-5 bg-success text-white" name="TBWProtein" placeholder="Protein" value ={TBWProtein} onChange={this.onTextBoxChange}/>
            </div>
            <div>
          <input type="text" className="p-3 mb-5 bg-success text-white" name ="TBWMineral" placeholder="Mineral" value ={TBWMineral} onChange={this.onTextBoxChange}/>
            </div>
            <div>
          <input type="text" className="p-3 mb-5 bg-success text-white" name="TBWBodyFat" placeholder="Body Fat" value ={TBWBodyFat} onChange={this.onTextBoxChange}/>
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