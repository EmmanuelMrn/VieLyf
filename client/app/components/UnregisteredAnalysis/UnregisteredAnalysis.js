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
            goAnalysis:"Loading"

        };
        this.onChart = this.onChart.bind(this);
    }
    componentDidMount()
    {
        var AnalysisId=(window.location.pathname).slice(16);
        console.log(AnalysisId);
        this.setState({
            Information:AnalysisId
        });
        fetch('/api/account/unregisteredgraphs?id='+AnalysisId,{method:'GET'})
        .then(res => res.json())
        .then(json =>{
            console.log("json",json.Age);

           this.setState({
               Information :json
        });
           console.log("datos",this.state.Information.Weight);
            
        })
    }
    onChart(){  
        
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
                {
                label: 'Niggas',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }
            ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        }

    render()
    {
        
        return(
            <div className="container">
              <div className="row">
               <div className="col-md-5 ">
               <h4 className="Heads">General Information </h4> 
               <table id="t01">
                    <tr>                 
                       
                            <th> Weight </th>
                            <th> Height </th>
                            <th> Age    </th>
                    </tr>        
                    <tr>
                    <th>{this.state.Information.Weight} </th> 
                    <th>{this.state.Information.Height} </th>
                    <th>{this.state.Information.Age} </th> 
                    </tr>    
               </table>   
                    <h4 className="Heads">Corporal Composition</h4>  
                <table id="t01"> 
                    <tr>
                    <th> Fat Free Body Mass</th>
                        <th> Fat Free body Mass Body Fat</th>
                        <th> Lean Soft tisssue</th>
                    </tr>
                    <tr>
                            <th> {this.state.Information.FatFreeBodyMass} </th>
                            <th>{this.state.Information.FFBMBodyFat} </th>
                            <th>{this.state.Information.LeanSoftTissue} </th>
                    </tr>  
                    </table>    
                        
                        <h4>Lean Lean Soft Tissue</h4>
                    <table id="t01">

                        <tr> 
                            <th> Lean Soft Tissue Body Fat</th>
                            <th> Lean Soft Tissue Mineral </th>
                        </tr>
                        <tr>
                        <th>{this.state.Information.LSTBodyFat} </th>
                        <th>{this.state.Information.LSTMineral} </th>
                        </tr>

                        
                    </table>    
                    <h4 >Total Body Water</h4>
                        <table id="t01">
                            <tr>
                            
                                <th> Total Body Water Protein</th>
                                <th> Total Body Water Mineral</th>
                                <th> Total Body Water Body Fat</th>
                            </tr>
                            <tr>
                                    <th>{this.state.Information.TBWProtein} </th>
                                    <th>{this.state.Information.TBWMineral} </th>
                                    <th>{this.state.Information.TBWBodyFat} </th>
                            </tr>

                             
                        </table>
               </div>
               <div className="col-md-5"><a href="../../signup"><img  src="/assets/img/img10.jpg"/></a>
                  </div>
               </div>

               <div className="row">
               <div className="col-5 offset-7">

               <h4 className="Heads"> Weight control Evaluation </h4>
               <table id="t01">
                   <tr>
                    <th> Weight</th>
                    <th> Body Mass Index  </th>
                    <th> Body Fat  </th>
                    <th> Fat Free Mas </th>
                   </tr>
                   <tr>
                   <th>{this.state.Information.Weight} </th>
                    <th>{this.state.Information.BodyMassIndex} </th>
                    <th>{this.state.Information.BodyFat} </th>
                    <th>{this.state.Information.FatFreeMass} </th>
                   </tr> 
               </table>
                   <h4 className="Heads"> Energy Expenditure</h4>
               <table id="t01">
               <tr>
                    <th> Hip Waist Index</th>
                    <th> Total Energy Expenditure  </th>
                    <th> Equivalent Biological Age </th>
                    <th> Body Type </th>
              </tr> 
              <tr>
              <th>{this.state.Information.HipWaistIndex} </th>
               <th>{this.state.Information.TotalEnergyExpenditure} </th>
               <th>{this.state.Information.EquivalentBiologicalAge} </th>
               <th>{this.state.Information.BodyType} </th>
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