import React, { Component } from 'react';

class DisponibilitySchedule extends Component {
  constructor() {
    super();

    this.state = {
        startTime: '',
        endTime: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onDisponibility(){
    
  }

  render() {
    const {
        startTime,
        endTime
    } = this.state;
    
    return(
        <div className="container row">
            <div className="col-md-3">
                <p>Disponibilidad de horario</p>
                <input
                  type="number"
                  name="startTime"
                  placeholder="Start time"
                  value={this.state.startTime}
                  onChange={this.handleInputChange}
                /><br />
                <input
                  type="number"
                  name="endTime"
                  placeholder="End Time"
                  value={this.state.endTime}
                  onChange={this.handleInputChange}
                /><br />
                <button type="button" className="btn btn-dark" onClick={this.onDisponibility}>Save disponibility</button>
            </div>
            <div className="col-md-9">
               
            </div>
        </div>
    );
  }
}

export default DisponibilitySchedule;
