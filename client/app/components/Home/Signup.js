import React, { Component } from 'react';
import 'whatwg-fetch';
import swal from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '20%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       :'#b9cb34' 
  }
};

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpPhone:'',
      signUpError: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpFirstName: '',
      signUpUserName: '',
      isActive: false,
      isActive2: false,
      signUpLastName: '',
      profFirstName:'',
      profLastName:'',
      profMotherLastName:'',
      profTitle:'',
      profUsername:'',
      profEmail:'',
      profPassword:'',
      License :'',
    };

    this.onSignUp = this.onSignUp.bind(this);
    this.onProfSignUp = this.onProfSignUp.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModal2 = this.toggleModal2.bind(this);
    this.verify = this.verify.bind(this);

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

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  verify(){
    const{
      profFirstName,
      profLastName,
      profMotherLastName,
      profTitle,
      profUsername,
      License

    } = this.state;
    console.log("success");
    this.setState({
     isLoading:true,
    });
   
   /*Consuimiedo API  
   Ya es dinamico
   */
  let header = new Headers({
    'Access-Control-Allow-Origin':'http://localhost:8080',
    'Content-Type': 'multipart/form-data'
  });
  const URL ='http://search.sep.gob.mx/solr/cedulasCore/select?fl=%2A%2Cscore&q='+License+'&start=0&rows=100&facet=true&indent=on&wt=json';
  if(License!="" || !License)
    {fetch(URL, { 
      method: 'GET',
     crossDomain:true,
     header:header,
      //headers: { 'Content-Type': 'application/json'}
      
  })
      
      .then(res => res.json())  
      .then(json => {
        
        // if(json.success){
          console.log("algo bien!", json.response.numFound);

          if(json.response.numFound)
          {
            this.setState({
            
            signUpError:json.message,
            isLoading:false,
            profFirstName : json.response.docs[0].nombre,
            profLastName: json.response.docs[0].paterno,
            profMotherLastName:json.response.docs[0].materno,
            profTitle: json.response.docs[0].titulo,
            profUsername: json.response.docs[0].userName,
          });}
          else{
            this.setState({
              isLoading:false
            });
          }
   
      });}
      else{
        console.log("Hey que show");
      }

    }

  onProfSignUp() {
    const{
      profFirstName,
      profLastName,
      profEmail,
      profPassword,
      profPhone,
      profUsername,
    } = this.state;
    console.log(profFirstName,
      profLastName,
      profEmail,
      profPassword,
      profUsername);
    this.setState({
     isLoading:true
    });

    fetch('/api/account/signup', 
    { method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }, 
      body : JSON.stringify({
        FirstName: profFirstName,
        LastName: profLastName,
        Email: profEmail,
        Password: profPassword,
        Phone:profPhone,
        Role:'Nutritionist',
        UserName: profUsername
      }),
  })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if(json.success){
          this.setState({
            signUpError:json.message,
            isLoading:false,
            profFirstName:'',
            profLastName:'',
            profEmail:'',
            profPassword:'',
            profPhone:'',
            profUsername:''
          });
          swal(
            'Welcome to VieLyf Nutritionist!',
            'Your account has been created!',
            'success'
          );
          this.toggleModal()
        }
        else{
          this.setState({
            signUpError:json.message,
            isLoading:false
          });
        }
      });
      swal(
        'Welcome to VieLyf, Nutritionist!',
        'Your account has been created!',
        'success'
      );
  }

  toggleModal() {
    this.setState({
      isActive:!this.state.isActive,
      profFirstName:'',
      profEmail:'',
      profLastName:'',
      profMotherLastName:'',
      profUsername: '',
      profPassword:'',
      profTitle:'',
      profPhone:'',
      License:''
    })
  }

  toggleModal2() {
    this.setState({
      isActive2:!this.state.isActive2,
      signUpPhone:'',
      signUpEmail: '',
      signUpPassword: '',
      signUpFirstName: '',
      signUpUserName: '',
      signUpLastName: ''
    })
  }

  onSignUp() {
    // Grab state
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPhone,
      signUpPassword,
      signUpUserName,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        FirstName: signUpFirstName,
        LastName: signUpLastName,
        Email: signUpEmail,
        Password: signUpPassword,
        Phone: signUpPhone,
        UserName: signUpUserName,
        Role:'Client'
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpFirstName: '',
            signUpLastName: '',
            signUpUserName: '',
            signUpEmail: '',
            signUpPassword: '', 
            signUpPhone: ''
          });
          window.location=('/login')
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
      swal(
        'Welcome to VieLyf, User!',
        'Your account has been created!',
        'success'
      );
  }

  render() {
    const {
      isLoading,
      token,
      signUpEmail,
      signUpFirstName,
      signUpLastName,
      signUpUserName,
      signUpPassword,
      signUpError,
      signUpPhone,
      profFirstName,
      profLastName,
      profMotherLastName,
      profTitle,
      profUsername,
      profEmail,
      profPassword,
      profPhone,
      License ,
    } = this.state;

    // if (isLoading) {
    //   return (<div><p>Loading...</p></div>);
    // }
    let userMessage
    if (!signUpError) {
      userMessage = (
        <span>
          <h2 className="text-center" style={{color: '#00c851'}}>Join Us!</h2>
        </span>
      )
    } else {
      userMessage = (
        <h2 className="text-center" style={{color: 'red'}}>{signUpError}</h2>
      )
    }

    if (!token) {

      return (
          
<div>
        <section className="login-block" style={{padding: '90px'}}>
          <div className="container container2">
            <div className="row">
              <div className="col-md-4 login-sec">
                {userMessage}
                <form>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <button type="button" className="btn btn-outline-success" onClick={this.toggleModal2}>
                          I'm Client
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button type="button" className="btn btn-outline-success" onClick={this.toggleModal}>
                          I'm Nutriologist
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-8 banner-sec">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                  <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                  </ol>
                  <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                    <img className="d-block img-fluid" width="1100px" height="500px" src="/assets/img/img8.jpg" alt="First slide"/>
                      <div className="carousel-caption d-none d-md-block">
                        <div className="banner-text" style={{top: '-600px', width: '90%'}}>
                            <h2>Welcome to your new life</h2>
                            <h4 style={{color: 'rgb(187, 54, 143)', backgroundColor: 'rgb(255,255,255,.3)'}}>Take care of your body, it's the only place you have to live in.</h4>
                        </div>	
                      </div>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block img-fluid" width="1100px" height="500px" src="/assets/img/img6.jpg" alt="First slide"/>
                      <div className="carousel-caption d-none d-md-block">
                        <div className="banner-text" style={{top: '-600px', width: '90%'}}>
                            <h2>Work for the happiest version of yourself</h2>
                            <h3 style={{color: 'rgb(237, 208, 194)', backgroundColor: 'rgb(255,255,255,.3)'}}>Remeber: Dreams and dedictaion are a powerful combination.</h3>
                        </div>	
                      </div>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block img-fluid" width="1100px" height="500px" src="/assets/img/img7.jpg" alt="First slide"/>
                      <div className="carousel-caption d-none d-md-block">
                        <div className="banner-text" style={{top: '-600px', width: '90%'}}>
                            <h2>Enjoy eating well and enjoy the change in your lifestyle</h2>
                            <h3 style={{color: 'rgb(227, 58, 22)', backgroundColor: 'rgb(255,255,255,.3)'}}>And enjoy the change in your lifestyle.</h3>
                        </div>	
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> 
          
          <Modal isOpen={this.state.isActive} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Nutritionist form</ModalHeader>
            <ModalBody>
              <form>
                <div className="form-group">
                  <label for="InputLicense">Verify</label>
                  <input type="text" className="form-control" 
                  placeholder="Enter your Professional license"
                  name="License"
                  value={License}
                  onChange={this.handleInputChange}
                  />
                  <button className="btn btn-login float-right" onClick={() => this.verify()}>Verify</button>
                </div>
                <div className="form-group">
                  <label for="InputFirstName">First Name</label>
                  <input type="text" className="form-control"  
                  placeholder="Name"
                  name="profFirstName"
                  value={profFirstName}
                  onChange={this.handleInputChange}readOnly/>
                </div>
                <div className="form-group">
                  <label for="InputLastName">Last Name</label>
                  <input type="text" className="form-control"  
                  placeholder="Last name"
                  name="profLastName"
                  value={profLastName}
                  onChange={this.handleInputChange}readOnly/>
                </div>
                <div className="form-group">
                  <label for="InputMotherLastName">Last Name 2</label>
                  <input type="text" className="form-control"  
                  placeholder="Last name 2"
                  name="profMotherLastName"
                  value={profMotherLastName}
                  onChange={this.handleInputChange}readOnly
                  />
                </div>
                <div className="form-group">
                  <label for="InputTitle">Title</label>
                  <input type="text" className="form-control" 
                  placeholder="Enter title"
                  name="profTitle"
                  value={profTitle}
                  onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label for="InputUserName">Username</label>
                  <input type="text" className="form-control"  
                  placeholder="Enter username"
                  name="profUsername"
                  value={profUsername}
                  onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                  <label for="InputPhone">Phone</label>
                  <input type="number" className="form-control"  
                  placeholder="+1 (555)555-5555"
                  name="profPhone"
                  value={profPhone}
                  onChange={this.handleInputChange}/>
                  <small id="phoneHelp" className="form-text text-muted">We'll never share your phone with anyone else.</small>
                </div>
                <div className="form-group">
                  <label for="InputEmail">Email address</label>
                  <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="form-control"  aria-describedby="emailHelp" 
                  placeholder="Enter email"
                  name="profEmail"
                  value={profEmail}
                  onChange={this.handleInputChange}/>
               </div>
                <div className="form-group">
                  <label for="InputPassword">Password</label>
                  <input type="password" className="form-control"  
                  placeholder="Enter password"
                  name="profPassword"
                  value={profPassword}
                  onChange={this.handleInputChange}
                  />
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button className="btn btn-login float-left" onClick={this.onProfSignUp}>Create account as nutritionist</Button>{' '}
              <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
            </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.isActive2} toggle={this.toggleModal2}>
            <ModalHeader toggle={this.toggleModal2}>Client form</ModalHeader>
            <ModalBody>
              <form>
                <div className="form-group">
                  <label for="InputFirstName2">First Name</label>
                  <input type="text" className="form-control"  
                  placeholder="Enter first name"
                  name="signUpFirstName"
                  value={signUpFirstName}
                  onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                  <label for="InputLastName2">Last Name</label>
                  <input type="text" className="form-control"  
                  placeholder="Enter last name"
                  name="signUpLastName"
                  value={signUpLastName}
                  onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                  <label for="InputUserName2">Username</label>
                  <input type="text" className="form-control"  
                  placeholder="Enter username"
                  name="signUpUserName"
                  value={signUpUserName}
                  onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                  <label for="InputPhone2">Phone</label>
                  <input type="number" className="form-control"  
                  placeholder="+1 (555)555-5555"
                  name="signUpPhone"
                  value={signUpPhone}
                  onChange={this.handleInputChange}/>
                  <small id="phoneHelp" className="form-text text-muted">We'll never share your phone with anyone else.</small>
                </div>
                <div className="form-group">
                  <label for="InputEmail2">Email address</label>
                  <input type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="form-control"  aria-describedby="emailHelp" 
                  placeholder="Enter email"
                  name="signUpEmail"
                  value={signUpEmail}
                  onChange={this.handleInputChange}/>
               </div>
                <div className="form-group">
                  <label for="InputPassword2">Password</label>
                  <input type="password" className="form-control"  
                  placeholder="Enter password"
                  name="signUpPassword"
                  value={signUpPassword}
                  onChange={this.handleInputChange}
                  />
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button className="btn btn-login float-left" onClick={this.onSignUp}>Create account as client</Button>{' '}
              <Button color="secondary" onClick={this.toggleModal2}>Cancel</Button>
            </ModalFooter>
            </Modal>
      </div>           
      );
    }
  }
}

export default Signup;