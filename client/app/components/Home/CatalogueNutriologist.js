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
    if (localStorage.hasOwnProperty('email')) {
      console.log(localStorage.getItem('ClientLast'))
      console.log(localStorage.getItem('ClientFirst'))
    } 
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
      <section className="image-section"/>
        <div className="col-lg-12 col-md-12 col-sm-12 post-title-block">
          <h3 className="text-center">Find the person who is going to change your life.</h3>
          <ul className="list-inline text-center">
            <h5>And find yourself.</h5>
          </ul>
        </div>
        
        
      
      {/* <h1>Nutriologos</h1> */}
      

          <div className="container">
          <h5 className="section-title h1">There is always someone who want to help you!</h5>
          <div className="row">
            
              { 
       Nutritionists.map(function(nutritionist,index){
        return(  
          <div key={nutritionist._id} className="col-xs-12 col-sm-6 col-md-4">
              <div
                className="image-flip"
                onTouchStart="this.classList.toggle('hover');"
              >
                <div className="mainflip">
                  <div className="frontside">
                    <div className="card">
                      <div className="card-body text-center">
                        <p>
                          <img
                            className=" img-fluid"
                            src="http://ekta.surveysindia.com/wp-content/uploads/2015/10/Doctor-Placeholder.jpg"
                            alt="card image"
                          />
                        </p>
                        <h4 className="card-title">DR. {nutritionist.FirstName + nutritionist.LastName}</h4>
                        <p className="card-text">
                          {nutritionist.Description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="backside">
                    <div className="card">
                      <div className="card-body text-center mt-4">
                        <h4 className="card-title">About me.</h4>
                        <p className="card-text">
                          {nutritionist.Description}
                        </p>
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#">
                              <i className="fa fa-facebook" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#">
                              <i className="fa fa-twitter" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#">
                              <i className="fa fa-skype" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#">
                              <i className="fa fa-google" />
                            </a>
                          </li>
                        </ul>
                       <button style={{borderRadius: '5rem'}} className="btn btn-dark" onClick={
                         function() {
                           if (localStorage.hasOwnProperty('email')) {
                            fetch("/api/account/createnotification", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json"
                              },
                              body: JSON.stringify({
                                text: localStorage.getItem('ClientFirst') + " " + localStorage.getItem('ClientLast') + " will be happy to have you as Nutricionist.",
                                ref: "/transition",
                                date: new Date(),
                                from: localStorage.getItem('Client_id'),
                                to: nutritionist._id,
                                title: localStorage.getItem('ClientFirst') + " wants to work with you!",
                              })
                            })
                           } 
                         }
                       }>I want you!</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
        )
            })}

                  
                  
          </div>
        </div>
      </div>
    )
  }
}

  

export default CatalogueNutriologist;