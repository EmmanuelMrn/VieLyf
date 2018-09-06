import React, {Component} from 'react';
import 'whatwg-fetch';
import Datetime from 'react-datetime';
import Modal from 'react-modal';
import { Chart } from 'react-chartjs-2';
import { Container } from 'mdbreact';
import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';
var items;
class ChartsPage extends React.Component {
    constructor(props)
    {   super(props);
        this.state = {

            items:[],
            firstName:'',
            lastName:'',
            toogle:false,
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
       
         this.onChart = this.onChart.bind(this);
         this.onChart2 = this.onChart2.bind(this);
         this.onChart3 = this.onChart3.bind(this);
        this.onToggle = this.onToggle.bind(this);
        }
    
     componentDidMount() {
        
                  
   const obj = localStorage.getItem('clientID');
   
       console.log(obj);
       console.log(localStorage.getItem('clientID'));

       var date= new Date();
       console.log(date.toDateString());
          fetch('/api/accounts/graphs?chart='+obj, {method:'GET'}) 
            .then(res => res.json())   
            .then(json => {
                console.log("json",json);
               
                this.setState({
                    //   weight:json.Weight,
                    //   height:json.Height,
                    //   Age:json.Age,
                    //   FatFreeBodyMass:json.FatFreeBodyMass
                    items:  json.map(function(data){
                        return data
                    })


                    });
               
               console.log("items",this.state.items);
               for(var i=5;i>0;i--)
               {
                   if(this.state.items[i]==undefined)
                       {
                           console.log()
                          var array=[{ Age:" ",
                           BodyFat:" ",
                           BodyMassIndex:" ",
                           BodyType:" ",
                           EquivalentBiologicalAge:" ",
                           FFBMBodyFat:" ",
                           FatFreeBodyMass:" ",
                           FatFreeMass:" ",
                           Height:" ",
                           HipWaistIndex:" ",
                           LSTBodyFat:" ",
                           LSTMineral:" ",
                           LeanSoftTissue:" ",
                           TBWBodyFat:" ",
                           TBWMineral:" ",
                           TBWProtein:" ",
                           TotalBodyWater:" ",
                           TotalEnergyExpenditure:" ",
                           Weight:" ",
                           date:"No data found||||||||||||| ",
                           }]
                           console.log(array);
                           this.state.items.push(array[0]);
                       }
   
               }
    
            });
     

    
        }
        onToggle(){
            this.setState({toogle:!this.state.toogle,
            });
            console.log(this.state.toogle);
            }
        onChart(){  
           
            console.log(this.state.items)
            var ctxL = document.getElementById("lineChart").getContext('2d');
            var myLineChart = new Chart(ctxL, {
                type: 'line',
                data: {
                    labels: [(this.state.items[4].date).toString().slice(0,-14), (this.state.items[3].date).toString().slice(0,-14),(this.state.items[2].date).toString().slice(0,-14),(this.state.items[1].date).toString().slice(0,-14),(this.state.items[0].date).toString().slice(0,-14)],
                    datasets: [
                        {
                            label: "Weight",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            backgroundColor: "rgba(0,255,0,.5)",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [this.state.items[4].Weight, this.state.items[3].Weight,this.state.items[2].Weight,this.state.items[1].Weight,this.state.items[0].Weight]
                        },
                        {
                            label: "Fat-Free Body Mass",
                            fillColor: "rgba(0,0,0,0.2)",
                            strokeColor: "rgba(0,0,0,1)",
                            pointColor: "rgba(0,0,0,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            backgroundColor: "rgba(255,0,0,.5)",
                            pointHighlightStroke: "rgba(0,0,0,1)",
                            data: [this.state.items[4].FatFreeBodyMass,this.state.items[3].FatFreeBodyMass,this.state.items[2].FatFreeBodyMass,this.state.items[1].FatFreeBodyMass,this.state.items[0].FatFreeBodyMass]
                        },
                        {
                            label: "FFBM Body Fat",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            backgroundColor:"rgba(0,50,205,.5)",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [this.state.items[4].FFBMBodyFat,this.state.items[3].FFBMBodyFat,this.state.items[2].FFBMBodyFat,this.state.items[1].FFBMBodyFat,this.state.items[0].FFBMBodyFat]
                        },
                        {
                            label: "Lean Soft Tissue",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            backgroundColor:"rgba(0,0,255,.5)",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [this.state.items[4].LeanSoftTissue,this.state.items[3].LeanSoftTissue,this.state.items[2].LeanSoftTissue,this.state.items[1].LeanSoftTissue,this.state.items[0].LeanSoftTissue]
                        },
                        {
                            label: "LST Mineral",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            backgroundColor:"rgba(0,0,255,.5)",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [this.state.items[4].LSTMineral,this.state.items[3].LSTMineral,this.state.items[2].LSTMineral,this.state.items[1].LSTMineral,this.state.items[0].LSTMineral]
                        },
                        {
                            label: "LST BodyFat",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            backgroundColor:"rgba(100,0,255,.5)",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [this.state.items[4].LSTBodyFat,this.state.items[3].LSTBodyFat,this.state.items[2].LSTBodyFat,this.state.items[1].LSTBodyFat,this.state.items[0].LSTBodyFat]
                        },
                        {
                            label: "Total Body Water",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            backgroundColor:"rgba(100,0,255,.5)",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [this.state.items[4].TotalBodyWater,this.state.items[3].TotalBodyWater,this.state.items[2].TotalBodyWater,this.state.items[1].TotalBodyWater,this.state.items[0].TotalBodyWater]
                        },
                        {
                            label: "TBW Protein",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            backgroundColor:"rgba(100,0,255,.5)",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [this.state.items[4].TBWProtein,this.state.items[3].TBWProtein,this.state.items[2].TBWProtein,this.state.items[1].TBWProtein,this.state.items[0].TBWProtein]
                        },
                        {
                            label: "TBW Mineral",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            backgroundColor:"rgba(100,0,255,.5)",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [this.state.items[4].TBWMineral,this.state.items[3].TBWMineral,this.state.items[2].TBWMineral,this.state.items[1].TBWMineral,this.state.items[0].TBWMineral]
                        },
                        {
                            label: "TBW BodyFat",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            backgroundColor:"rgba(100,0,255,.5)",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [this.state.items[4].TBWBodyFat,this.state.items[3].TBWBodyFat,this.state.items[2].TBWBodyFat,this.state.items[1].TBWBodyFat,this.state.items[0].TBWBodyFat]
                        },
            
                    ]
                },
                options: {
                    responsive: true
                }
            });    
console.log((this.state.items[0].date).toString().slice(0,-14));            
}

onChart2(){  
    this.onToggle();
    console.log("En el chart" +this.state.toogle);
    
//line
var ctxL = document.getElementById("lineChart").getContext('2d');
var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
        labels: [(this.state.items[4].date).toString().slice(0,-14), (this.state.items[3].date).toString().slice(0,-14),(this.state.items[2].date).toString().slice(0,-14),(this.state.items[1].date).toString().slice(0,-14),(this.state.items[0].date).toString().slice(0,-14)],
        datasets: [
            {
                label: "Weight",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                backgroundColor: "rgba(0,255,0,.5)",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [this.state.items[4].Weight, this.state.items[3].Weight,this.state.items[2].Weight,this.state.items[1].Weight,this.state.items[0].Weight]
            },
            {
                label: "Body Mass Index",
                fillColor: "rgba(0,0,0,0.2)",
                strokeColor: "rgba(0,0,0,1)",
                pointColor: "rgba(0,0,0,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                backgroundColor: "rgba(255,0,0,.5)",
                pointHighlightStroke: "rgba(0,0,0,1)",
                data: [this.state.items[4].BodyMassIndex,this.state.items[3].BodyMassIndex,this.state.items[2].BodyMassIndex,this.state.items[1].BodyMassIndex,this.state.items[0].BodyMassIndex]
            },
            {
                label: "Body Fat Percentage",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                backgroundColor:"rgba(0,50,205,.5)",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [this.state.items[4].BodyFat,this.state.items[3].BodyFat,this.state.items[2].BodyFat,this.state.items[1].BodyFat,this.state.items[0].BodyFat]
            },
            {
                label: "Lean Soft Tissue",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                backgroundColor:"rgba(0,0,255,.5)",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [this.state.items[4].LeanSoftTissue,this.state.items[3].LeanSoftTissue,this.state.items[2].LeanSoftTissue,this.state.items[1].LeanSoftTissue,this.state.items[0].LeanSoftTissue]
            },
            
        ]
    },
    options: {
        responsive: true
    }
});    
}
onChart3(){  
           
    console.log(this.state.items)
    var ctxL = document.getElementById("lineChart").getContext('2d');
    var myLineChart = new Chart(ctxL, {
        type: 'line',
        data: {
            labels: [(this.state.items[4].date).toString().slice(0,-14), (this.state.items[3].date).toString().slice(0,-14),(this.state.items[2].date).toString().slice(0,-14),(this.state.items[1].date).toString().slice(0,-14),(this.state.items[0].date).toString().slice(0,-14)],
            datasets: [
                {
                    label: "Hip-Waist Index",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    backgroundColor: "rgba(0,255,0,.5)",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [this.state.items[4].HipWaistIndex, this.state.items[3].HipWaistIndex,this.state.items[2].HipWaistIndex,this.state.items[1].HipWaistIndex,this.state.items[0].HipWaistIndex]
                },
                {
                    label: "Total Energy Expenditure",
                    fillColor: "rgba(0,0,0,0.2)",
                    strokeColor: "rgba(0,0,0,1)",
                    pointColor: "rgba(0,0,0,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    backgroundColor: "rgba(255,0,0,.5)",
                    pointHighlightStroke: "rgba(0,0,0,1)",
                    data: [this.state.items[4].TotalenergyExpenditure,this.state.items[3].TotalenergyExpenditure,this.state.items[2].TotalenergyExpenditure,this.state.items[1].TotalenergyExpenditure,this.state.items[0].TotalenergyExpenditure]
                },
                {
                    label: "Equivalent Biological Age",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    backgroundColor:"rgba(0,50,205,.5)",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [this.state.items[4].EquivalentBiologicalAge,this.state.items[3].EquivalentBiologicalAge,this.state.items[2].EquivalentBiologicalAge,this.state.items[1].EquivalentBiologicalAge,this.state.items[0].EquivalentBiologicalAge]
                },
                
            ]
        },
        options: {
            responsive: true
        }
    });    
console.log((this.state.items[0].date).toString().slice(0,-14));            
}


    render() {
        if(this.state.items.length==0)
        {
            return(<p>No Analysis </p>);
        }
        else
        {
        return (
        <Container>
            
          {/* <Modal  isOpen={this.state.toogle} onRequestClose={this.onToggle}> */}
          <div className="row">
            <div className="col-3">
            <button onClick={this.onChart}>Corporal Composition</button>
            </div>
            <div className="col-3">
            <button onClick={this.onChart2}>Weight Control Evaluation </button>
            </div>
            <div className = "col-3">
            <button onClick={this.onChart3}>Energy Expenditure  </button>
            </div>
          </div>
        <canvas id="lineChart"></canvas>
        <canvas id="lineChart"></canvas>

          {/* </Modal> */}
         
        </Container>
        );
    }
    }

};

export default ChartsPage;