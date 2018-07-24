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
    backgroundColor       :'#98fb98'
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
    //this.toggleModal = this.toggleModal.bind(this);

  }
  clickHandler(e, index) {
    this.setState({ activeModal: index })
}
hideModal() {
  this.setState({ activeModal: null })
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
  toggleModal()
  {
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
            <a >  
            <button  id={nutritionist} onClick={e => that.clickHandler(e,index)}>abrir</button>
                    {nutritionist.FirstName}
                    <Modal id= {nutritionist} isOpen={that.state.activeModal == index} onRequestClose={that.hideModal} style={customStyles}>
                    
                    {nutritionist.LastName}<br />
                    {nutritionist.Role}<br />
                    {nutritionist.LastName}<br />
                    {nutritionist.Role}<br />
                    {nutritionist.LastName}<br />
                    {nutritionist.Role}<br />
                    {nutritionist.LastName}<br />
                    {nutritionist.Role}<br />
                    </Modal>
                    {/* <button  onClick={that.toggleModal}>abrir</button> */}

            </a>
            </div>
            )
            })}
          </div>
  )

  }
}

  

export default CatalogueNutriologist;