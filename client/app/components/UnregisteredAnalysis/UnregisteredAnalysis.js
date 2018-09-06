import React, { Component,Children } from 'react';
import { Chart } from 'react-chartjs-2';
import { Container } from 'mdbreact';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom"

import 'whatwg-fetch';

import {
    setClientInStorage,
    getFromStorage,
}from '../../utils/storage';

class UnregisteredAnalysis extends Component
{
    constructor(){
        super();
        this.state={
            Information:[],
            goAnalysis:"Loading",
            gotInf:0

        };
      
    }
    componentDidMount()
    {
        var AnalysisId=(window.location.pathname).slice(16);
        console.log(AnalysisId);
        this.AnalysisId=AnalysisId;
        
        fetch('/api/account/unregisteredgraphs?id='+AnalysisId,{method:'GET'})
        .then(res => res.json())
        .then(json =>{
            console.log("json",json);
            
           this.setState({
               Information :json,
               gotInf:1
        });
           console.log("datos",this.state.Information.Weight);
            
        })
    }
    

    render()
    {
        console.log("para ver si imprimen " + this.state.gotInf,this.state.Information);
        if( this.state.Information==null && this.state.gotInf==1)
        {   
            window.location=('/notfound');
            
           //console.log("No deberia quedarse");
        }
        return(
            <div className="container">
              <div className="row">
               <div className="col-md-5 ">
               <h4 className="Heads">General Information </h4> 
               <table  className="table-striped table-dark" style={{borderRadius:"15px"}}>
                    <tr>                 
                       
                            <th> Weight </th>
                            <th> Height </th>
                            <th> Age    </th>
                    </tr>        
                    <tr>
                    <th className= "thfiller thlowerleft">{this.state.Information.Weight} </th> 
                    <th className= "thfiller ">{this.state.Information.Height} </th>
                    <th className= "thfiller thlowerright">{this.state.Information.Age} </th> 
                    </tr>    
               </table>   
                    <h4 className="Heads">Corporal Composition</h4>  
                <table className="table-striped table-dark" style={{borderRadius:"15px"}}> 
                    <tr>
                    <th> Fat Free Body Mass</th>
                        <th> Fat Free body Mass Body Fat</th>
                        <th> Lean Soft tisssue</th>
                    </tr>
                    <tr>
                            <th className= "thfiller thlowerleft" >{this.state.Information.FatFreeBodyMass} </th>
                            <th className= "thfiller">{this.state.Information.FFBMBodyFat} </th>
                            <th className= "thfiller thlowerright">{this.state.Information.LeanSoftTissue} </th>
                    </tr>  
                    </table>    
                        
                        <h4>Lean Lean Soft Tissue</h4>
                    <table className="table-striped table-dark" style={{borderRadius:"15px"}}>

                        <tr> 
                            <th> Lean Soft Tissue Body Fat</th>
                            <th> Lean Soft Tissue Mineral </th>
                        </tr>
                        <tr>
                        <th className= "thfiller thlowerleft">{this.state.Information.LSTBodyFat} </th>
                        <th className= "thfiller thlowerright">{this.state.Information.LSTMineral} </th>
                        </tr>

                        
                    </table>    
                    <h4 >Total Body Water</h4>
                        <table className="table-striped table-dark" style={{borderRadius:"15px"}}>
                            <tr>
                            
                                <th> Total Body Water Protein</th>
                                <th> Total Body Water Mineral</th>
                                <th> Total Body Water Body Fat</th>
                            </tr>
                            <tr>
                                    <th className= "thfiller thlowerleft">{this.state.Information.TBWProtein} </th>
                                    <th className= "thfiller">{this.state.Information.TBWMineral} </th>
                                    <th className= "thfiller thlowerright">{this.state.Information.TBWBodyFat} </th>
                            </tr>

                             
                        </table>
               </div>
               <div className="col-md-5"><a href="../../signup"><img  src="/assets/img/img10.jpg"/></a>
                  </div>
               </div>

               <div className="row">
               <div className="col-5 offset-7">

               <h4 className="Heads"> Weight control Evaluation </h4>
               <table className="table-striped table-dark" style={{borderRadius:"15px"}}>
                   <tr>
                    <th> Weight</th>
                    <th> Body Mass Index  </th>
                    <th> Body Fat  </th>
                    <th> Fat Free Mas </th>
                   </tr>
                   <tr>
                    <th className="thfiller thlowerleft">{this.state.Information.Weight} </th>
                    <th className= "thfiller" >{this.state.Information.BodyMassIndex} </th>
                    <th className= "thfiller" >{this.state.Information.BodyFat} </th>
                    <th className= "thfiller thlowerright">{this.state.Information.FatFreeMass} </th>
                   </tr> 
               </table>
                   <h4 className="Heads"> Energy Expenditure</h4>
               <table className="table-striped table-dark" style={{borderRadius:"15px"}}>
               <tr>
                    <th> Hip Waist Index</th>
                    <th> Total Energy Expenditure  </th>
                    <th> Equivalent Biological Age </th>
                    <th> Body Type </th>
              </tr> 
              <tr>
               <th className= "thfiller thlowerleft">{this.state.Information.HipWaistIndex} </th>
               <th className= "thfiller">{this.state.Information.TotalEnergyExpenditure} </th>
               <th className= "thfiller">{this.state.Information.EquivalentBiologicalAge} </th>
               <th className= "thfiller thlowerright">{this.state.Information.BodyType} </th>
             </tr>  
             </table>   
             <br /><br /> <br />

               </div>
               </div>
             </div>   
        )
    }
}

export default UnregisteredAnalysis;