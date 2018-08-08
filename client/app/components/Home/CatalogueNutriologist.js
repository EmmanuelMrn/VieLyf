import React, { Component,Children } from 'react';
import Modal from 'react-modal';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       :'#b9cb34'
  }
}
class CatalogueNutriologist extends Component {
 
  constructor() {
    var Items=[];
    super();

    this.state = {
      Nutritionists:[],
      isActive:null,
      activeModal:null
    };

    this.clickHandler =this.clickHandler.bind(this);
    this.hideModal = this.hideModal.bind(this);

  }
  clickHandler(e, index) {
    this.setState({ activeModal: index })
  }

  hideModal() {
  this.setState({ activeModal: null })
  }
  
  requestClientToNutritionist(_id){
    const {
      token
    } = this.state;

    fetch('/api/accounts/newPatientRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Nutritionist_id: _id,
        Client_id: token,
        Status: 'stand by'
      }),
    })
  }

  componentDidMount(){
  fetch('/api/accounts/nutritionistcatalog', {method:'GET'})
    .then(res => res.json())
    .then (json=> {
        // you set the value of the Nutritionist Contant to that of the JSON you receive
        this.setState({
          Nutritionists:json
        });
    });
  }

  toggleModal(){
    this.setState({
      isActive:!this.state.isActive
    });

  }
 
render()
{
  //This is used to convert the Nutritionist constant from a JSON to an Array
  var Nutritionists = Array.from(this.state.Nutritionists);
  //console.log(this.toggleModal);
 var that=this;
 console.log(that.clickHandler);
  return(
    <div>
      <h1>Nutriologos</h1>
      { //using the variable Nutritionist we map the values 
       Nutritionists.map(function(nutritionist,index){
        return(
            // the values are now in nutritionis and the names of the fields
            //  are the same ast the ones in the JSON
          <div key={nutritionist._id} className="nutritionist">
            <div className="card" id="cardstyle" >  
              <div className="card-body">
           
                   <h5 className="card-title"> {nutritionist.FirstName}</h5>
                    <Modal id= {nutritionist} isOpen={that.state.activeModal == index} onRequestClose={that.hideModal} ariaHideApp={false} style={customStyles}>
                    
                    {nutritionist.LastName}<br />
                    {nutritionist.Role}<br />
                    {nutritionist.Email}<br />
                    {nutritionist.Phone}<br />
                    <button  id={nutritionist} onClick={e => that.requestClientToNutritionist(nutritionist._id)}>Contact</button>
                    </Modal>
                    <button  id={nutritionist} onClick={e => that.clickHandler(e,index)}>abrir</button>
            </div>
            </div>
            </div>
            )
            })}
          </div>
    )
  }
}

  

export default CatalogueNutriologist;