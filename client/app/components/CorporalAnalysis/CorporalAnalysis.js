import React, { Component } from 'react';
//import 'react-dropdown/style.css'
import Datetime from 'react-datetime';
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
      FatFreeMass:'',
      date:'',
      HipWaistIndex:'',
      TotalEnergyExpenditure:'',
      BasalEnergyExpenditure:'',
      EquivalentBiologicalAge:'',
      BodyType:''

    };
    this.onTextBoxChange = this.onTextBoxChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.onUpdateCorpA= this.onUpdateCorpA.bind(this);
}
handleDate(date){
  this.setState({date});
  console.log(date); 
};
onTextBoxChange(event)
{
  const {name, value} = event.target;
  this.setState({
      [name]: value
  });
  console.log("Nombre: "+name,"Valor:" +value);
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
    TBWBodyFat,
    date,
    BodyFat,
    FatFreeMass,
    BodyMassIndex,
    HipWaistIndex,
    TotalEnergyExpenditure,
    BasalEnergyExpenditure,
    EquivalentBiologicalAge,
    BodyType

    }=this.state;
    console.log(date);
    this.setState({
      isLoading:true
     });
     console.log(HipWaistIndex)
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
      TBWBodyFat:TBWBodyFat,
      date:date,
      BodyFat:BodyFat,
      FatFreeMass:FatFreeMass,
      BodyMassIndex:BodyMassIndex,
      HipWaistIndex:HipWaistIndex,
      TotalEnergyExpenditure:TotalEnergyExpenditure,
      BasalEnergyExpenditure:BasalEnergyExpenditure,
      EquivalentBiologicalAge:EquivalentBiologicalAge,
      BodyType:BodyType
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
          TBWBodyFat:'',
          date:'',
          TotalEnergyExpenditure:'',
      BasalEnergyExpenditure:'',
      EquivalentBiologicalAge:'',
      BodyType:''
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
          isLoading,
          date,
          HipWaistIndex,
          TotalEnergyExpenditure,
      BasalEnergyExpenditure,
      EquivalentBiologicalAge,
      BodyType
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
            <input type="tex"   name =" weight" placeholder="Weight" value ={weight} onChange={this.onTextBoxChange}/><br />
            <input type="tex"  name="BodyFat" placeholder="Body Fat" value={BodyFat} onChange={this.onTextBoxChange}/><br />
            <input type="tex"  name="BodyMassIndex" placeholder="Body Mass Index" value={BodyMassIndex} onChange={this.onTextBoxChange}/><br />
            <input type="tex"  name="FatFreeMass" placeholder="Fat Free Mass" value={FatFreeMass} onChange={this.onTextBoxChange}/><br />            
            </div>
            <div className ="col-9 offset-3"> <h3>Energy Expenditure </h3> </div>
            <div className="col-10 offset-2">
            <input type="tex" name="HipWaistIndex" placeholder="Hip Waist index" value={HipWaistIndex} onChange={this.onTextBoxChange}/><br />
            <input type="tex" name="TotalEnergyExpenditure" placeholder="Total Energy Expenditure" value={TotalEnergyExpenditure} onChange={this.onTextBoxChange}/><br />
            <input type="tex" name="BasalEnergyExpenditure" placeholder="Basal Energy Expenditure" value={BasalEnergyExpenditure} onChange={this.onTextBoxChange}/><br />
            <input type="tex" name="EquivalentBiologicalAge" placeholder="Equivalent Biological Age" value={EquivalentBiologicalAge} onChange={this.onTextBoxChange}/><br />
            </div>
            <div>
            <select name ="BodyType"  onChange={this.onTextBoxChange}>
                <option  value="Thin with excess fat" >Thin with excess fat</option>
                <option  value="OverWeight" >OverWeight</option>
                <option  value="Obesity" >Obesity</option>
                <option  value="UnderWeight" >UnderWeight</option>
                <option  value="Normal" >Normal</option>
                <option  value="Muscular OverWeight" >Muscular OverWeight</option>
                <option  value="Low Fat Mass And Low Weight" >Low Fat Mass And Low Weight</option>
                <option  value="Low Fat Mass And Muscular Mass" >Low Fat Mass And Muscular Mass</option>
                <option  value="Atlethic" >Atlethic</option>
          </select>
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