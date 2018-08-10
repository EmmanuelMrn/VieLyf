import React, {Component} from 'react';
import 'whatwg-fetch';
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
        this.onToggle = this.onToggle.bind(this);
        }
    
     componentDidMount() {
        
                  
   const obj = localStorage.getItem('clientID');
   
       console.log(obj);
       console.log(localStorage.getItem('clientID'));
       
          fetch('/api/accounts/graphs?chart='+obj, {method:'GET'}) 
            .then(res => res.json())   
            .then(json => {
                console.log("json",json.Weight);
                this.setState({
                      weight:json.Weight,
                      height:json.Height,
                      Age:json.Age,
                      FatFreeBodyMass:json.FatFreeBodyMass

                    });
               
               // console.log("Height",items);
    
            });
     

    
        }
        onToggle(){
            this.setState({toogle:!this.state.toogle,
            });
            console.log(this.state.toogle);
            }
        onChart(){  
            this.onToggle();
            console.log("En el chart" +this.state.toogle);
            
var ctxB = document.getElementById("barChart").getContext('2d');
var myBarChart = new Chart(ctxB, {
    type: 'bar',
    data: {
        labels: ["Height", "Weight", "Age", "FatFreeBodyMass", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [this.state.weight,this.state.height, this.state.FatFreeBodyMass*5, 5, 2, 3],
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
        }]
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
        
console.log(this.state.weight);
            
}

onChart2(){  
    this.onToggle();
    console.log("En el chart" +this.state.toogle);
    
var ctxB = document.getElementById("barChart").getContext('2d');
var myBarChart = new Chart(ctxB, {
type: 'bar',
data: {
labels: ["Height", "Weight", "Age", "Id", "Purple", "Orange"],
datasets: [{
    label: '# of Votes',
    data: [this.state.weight,this.state.height, this.state.Age, 100, 2, 3],
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
}]
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

console.log(this.state.weight);
    
}

    render() {
        
        return (
        <Container>
            
          {/* <Modal isOpen={this.state.toogle} onRequestClose={this.onToggle}> */}
          <canvas id="barChart"></canvas>
          {/* </Modal> */}
          <button onClick={this.onChart}>Primera</button>
          <button onClick={this.onChart2}>Segunda</button>
        </Container>
        );
    }

};

export default ChartsPage;