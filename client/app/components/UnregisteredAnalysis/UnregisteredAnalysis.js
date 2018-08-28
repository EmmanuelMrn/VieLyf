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
            <div>
               <Container>
               <div className="col-9 offset-3">
               <h4 className="Heads">General Information </h4>    
               <a> Weight : {this.state.Information.Weight} </a><br/>
               <a> Height : {this.state.Information.Height} </a><br />
               <a> Age    : {this.state.Information.Age} </a>  <br />
               </div>
               <div className="col-9 offset-3" >
                    <h4 className="Heads">Corporal Composition</h4>     
               <a> Fat Free Body Mass: {this.state.Information.FatFreeBodyMass} </a><br />
               <a> Fat Free body Mass Body Fat: {this.state.Information.FFBMBodyFat} </a><br />
               <a> Lean Soft tisssue: {this.state.Information.LeanSoftTissue} </a><br />
               <h4  style={{color:"green",fontSize:"5 px"}} >Lean Lean Soft Tissue</h4>
               <a> Lean Soft Tissue Body Fat: {this.state.Information.LSTBodyFat} </a><br />
               <a> Lean Soft Tissue Mineral : {this.state.Information.LSTMineral} </a><br />
               <a> Total Body Water {this.state.Information.TotalBodyWater} </a><br />
               <a> Total Body Water{this.state.Information.TBWProtein} </a><br />
               <a> {this.state.Information.TBWMineral} </a>
               <a> {this.state.Information.TBWBodyFat} </a>
               </div>
               <div className="col-9 offset-3"> 
               <h4 className="Heads"> Weight control Evaluation </h4>
               <a>{this.state.Information.Weight} </a>
               <a> {this.state.Information.BodyMassIndex} </a>
               <a> {this.state.Information.BodyFat} </a>
               <a> {this.state.Information.FatFreeMass} </a>
               </div>
               <div >
               <a> {this.state.Information.HipWaistIndex} </a>
               <a> {this.state.Information.TotalEnergyExpenditure} </a>
               <a> {this.state.Information.EquivalentBiologicalAge} </a>
               <a> {this.state.Information.BodyType} </a>
               </div>
                </Container>
             </div>   
        )
    }
}

export default UnregisteredAnalysis;