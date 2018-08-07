
import React, { Component } from 'react';
<<<<<<< HEAD
=======
import Datetime from 'react-datetime';
import 'whatwg-fetch';
import {
  getFromStorage,
} from '../../utils/storage';


>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63


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
<<<<<<< HEAD
      TBWBodyFat:''
    };
    this.onTextBoxChange = this.onTextBoxChange.bind(this);
    this.onUpdateCorpA= this.onUpdateCorpA.bind(this);
}
=======
      TBWBodyFat:'',
      BodyMassIndex:'',
      BodyFat:'',
      FatFreeMass:'',
      date:''
    };
    this.onTextBoxChange = this.onTextBoxChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.onUpdateCorpA= this.onUpdateCorpA.bind(this);
}
handleDate(date){
  this.setState({date}); 
};
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
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

<<<<<<< HEAD
    id,
=======
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
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
<<<<<<< HEAD
    TBWBodyFat

    }=this.state;
    console.log(this.state);
=======
    TBWBodyFat,
    date

    }=this.state;
    console.log(date);
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
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
      
<<<<<<< HEAD
      id: id,
=======
      id: this.state.id,
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
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
<<<<<<< HEAD
      TBWBodyFat:TBWBodyFat
=======
      TBWBodyFat:TBWBodyFat,
      date:date
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
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
<<<<<<< HEAD
          TBWBodyFat:''
=======
          TBWBodyFat:'',
          date:'',
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
        });
      
      }
      else{
        this.setState({
          
          isLoading:false
        });
      }
    });


}
<<<<<<< HEAD
  render()
  {
=======
componentDidMount()
{
  const clientSelectedObj = getFromStorage('myClient');
  this.state.id = clientSelectedObj._id;
  console.log(this.state.id);
}
  render()
  {
    
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
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
<<<<<<< HEAD
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
=======
          BodyMassIndex,
          BodyFat,
          FatFreeMass,
          isLoading,
          date
      } = this.state;
 // if(isLoading)
   //{
      var yesterday = Datetime.moment().subtract( 1, 'day' );
       //date = new Date();
      // var date=time.toDateString();
      var valid = function( current ){
          return current.isAfter( yesterday );
         // return current.isBefore(tomorrow);
      };
    
      console.log(date.toString());
      console.log(date);
     
      //  <button onClick={this.onUpdateCorpA}>Save</button>
     
     
     return(   
       
  <div>
      <div className="container">
      <Datetime   name="date" value={date} timeFormat={false} isValidDate={valid} onChange={this.handleDate} />
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

      
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
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