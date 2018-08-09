import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ReactAgenda , ReactAgendaCtrl, guid , getUnique , getLast , getFirst , Modal } from 'react-agenda';
import 'moment/locale/es';

import {
  getFromStorage,
} from '../../utils/storage';
import { METHODS } from 'http';

var now = new Date();

require('moment/locale/es.js');
    var colors= {
      'color-1':"rgba(102, 195, 131 , 1)" ,
      "color-2":"rgba(242, 177, 52, 1)" ,
      "color-3":"rgba(235, 85, 59, 1)" ,
      "color-4":"rgba(70, 159, 213, 1)",
      "color-5":"rgba(170, 59, 123, 1)"
    }

    var items;

export default class Agenda extends Component {
  constructor(props){
  super(props);
  
  this.state = {
    items:[],
    token: '',
    selected:[],
    cellHeight:(60 / 4),
    showModal:false,
    locale:"fr",
    rowsPerHour:4,
    numberOfDays:4,
    Relation:'',
    startDate: new Date()
  }
  this.handleRangeSelection = this.handleRangeSelection.bind(this)
  this.handleItemEdit = this.handleItemEdit.bind(this)
  this.zoomIn = this.zoomIn.bind(this)
  this.zoomOut = this.zoomOut.bind(this)
  this._openModal = this._openModal.bind(this)
  this._closeModal = this._closeModal.bind(this)
  this.addNewEvent = this.addNewEvent.bind(this)
  this.removeEvent = this.removeEvent.bind(this)
  this.editEvent = this.editEvent.bind(this)
  this.changeView = this.changeView.bind(this)
  this.handleCellSelection = this.handleCellSelection.bind(this)

  }

  componentDidMount(){
    fetch('/api/account/agendaarray?token='+localStorage.getItem('Auth'), {method:'GET'})
      .then(res => res.json())
      .then(json1 => {
        this.setState({
          items : [
            {
              "classes": json1.classes,
              "Nutriologist_id": json1.Nutriologist_id,
              "pending": json1.pending,
              "_id": json1._id,
              "name": json1.name,
              "startDateTime": new Date(json1.startAtTime),
              "endDateTime": new Date(json1.endDateTime),
              "__v": 0
          }
          ],
        });
      });      
  }


componentWillReceiveProps(next , last){
  if(next.items){
    this.setState({items:next.items})
  }
}
  handleItemEdit(item, openModal) {
    if(item && openModal === true){
      this.setState({selected:[item] })
      return this._openModal();
    }
  }
  handleCellSelection(item, openModal) {
    if(this.state.selected && this.state.selected[0] === item){
      return  this._openModal();
    }
       this.setState({selected:[item] })
  }
  zoomIn(){
var num = this.state.cellHeight + 15
    this.setState({cellHeight:num})
  }
  zoomOut(){
var num = this.state.cellHeight - 15
    this.setState({cellHeight:num})
  }

  handleDateRangeChange (startDate, endDate) {
      this.setState({startDate:startDate })

  }

  handleRangeSelection (selected) {


this.setState({selected:selected , showCtrl:true})
this._openModal();

}

_openModal(){
  this.setState({showModal:true})
}
_closeModal(e){
  if(e){
    e.stopPropagation();
    e.preventDefault();
  }
  console.log('test');
    this.setState({showModal:false})
}

handleItemChange(items , item){
console.log('testfqefqefq');
this.setState({items:items})
}

handleItemSize(items , item){

    this.setState({items:items})

}

removeEvent(items , item){

    this.setState({ items:items});
}

addNewEvent (items , newItems){
  console.log('new items',newItems);
  console.log('items', items);
  this.setState({showModal:false ,selected:[] , items:items});
  this._closeModal();
}
editEvent (items , item){

  this.setState({showModal:false ,selected:[] , items:items});
  this._closeModal();
}

changeView (days , event ){
this.setState({numberOfDays:days})
}

render() {
  var AgendaItem = function(props){
    console.log( ' item component props' , props)
    return <div style={{display:'block', position:'absolute' , background:'#FFF'}}>{props.item.name} <button onClick={()=> props.edit(props.item)}>Edit </button></div>
  }
  return (
    <div className="content-expanded ">
      <div className="">
        <button className="btn btn-secondary" onClick={this.zoomIn}> <i className="zoom-plus-icon"></i> zoomIn</button>
        <button className="btn btn-secondary" onClick={this.zoomOut}> <i className="zoom-minus-icon"></i> zoomOut</button>
        <button className="btn btn-secondary" onClick={this._openModal}> <i className="schedule-icon"></i> Nuevo </button>
        <button className="btn btn-secondary" onClick={this.changeView.bind(null , 7)}> {moment.duration(7, "days").humanize()}  </button>
        <button className="btn btn-secondary" onClick={this.changeView.bind(null , 4)}> {moment.duration(4, "days").humanize()}  </button>
        <button className="btn btn-secondary" onClick={this.changeView.bind(null , 3)}> {moment.duration(3, "days").humanize()}  </button>
        <button className="btn btn-secondary" onClick={this.changeView.bind(null , 1)}> {moment.duration(1, "day").humanize()} </button>
     </div>

      <ReactAgenda
        minDate={new Date(now.getFullYear(), now.getMonth()-3)}
        maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
        startDate={this.state.startDate}
        startAtTime={10}
        cellHeight={this.state.cellHeight}
        locale="mx"
        items={this.state.items}
        numberOfDays={this.state.numberOfDays}
        headFormat={"ddd DD MMM"}
        rowsPerHour={this.state.rowsPerHour}
        itemColors={colors}
        //itemComponent={AgendaItem}
        view="calendar"
        autoScale={false}
        fixedHeader={true}
        onRangeSelection={this.handleRangeSelection.bind(this)}
        onChangeEvent={this.handleItemChange.bind(this)}
        onChangeDuration={this.handleItemSize.bind(this)}
        onItemEdit={this.handleItemEdit.bind(this)}
        onCellSelect={this.handleCellSelection.bind(this)}
        onItemRemove={this.removeEvent.bind(this)}
        onDateRangeChange={this.handleDateRangeChange.bind(this)} />
      {
        this.state.showModal? <Modal clickOutside={this._closeModal} >
        <div className="modal-content">
           <ReactAgendaCtrl items={this.state.items} itemColors={colors} selectedCells={this.state.selected} Addnew={this.addNewEvent} edit={this.editEvent}  />

        </div>
 </Modal>:''
}


     </div>

  );
}
}
