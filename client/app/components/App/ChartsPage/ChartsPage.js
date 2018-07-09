import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Container } from 'mdbreact';

class ChartsPage extends React.Component {
    componentDidMount() {
        // Pie chart
        var ctxP = document.getElementById("pieChart").getContext('2d');
        new Chart(ctxP, {
            type: 'pie',
            data: {
                labels: ["TBT", "Green", "Yellow", "Grey", "Dark Grey"],
                datasets: [
                    {
                        data: [1, 1, 1, 1, 1],
                        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                    }
                ]
            },
            options: {
                responsive: true
            }
        });
    }
    render() {
        return (
        <Container>
          <canvas id="pieChart"></canvas>
        </Container>
        );
    }

};

export default ChartsPage;