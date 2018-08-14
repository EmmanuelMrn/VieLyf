import React, { Component } from 'react';
import 'whatwg-fetch';
import Modal from 'react-modal';
import swal from 'sweetalert2';


import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
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
      signUpLastName: '',
      profFirstName:'',
      profLastName:'',
      profMotherLastName:'',
      profTitle:'',
      profEmail:'',
      profPassword:'',
      License :'',
    };

    this.onSignUp = this.onSignUp.bind(this);
    this.onProfSignUp = this.onProfSignUp.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

  verify()
  {

    const{
      profFirstName,
      profLastName,
      profMotherLastName,
      profTitle,
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
          {this.setState({
            
            signUpError:json.message,
            isLoading:false,
            profFirstName : json.response.docs[0].nombre,
            profLastName: json.response.docs[0].paterno,
            profMotherLastName:json.response.docs[0].materno,
            profTitle: json.response.docs[0].titulo,
          });}
          else{
            //console.log(json.response.docs[0].nombre);
            this.setState({
              //signUpError:json.message,
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
    } = this.state;
    console.log(profFirstName,
      profLastName,
      profEmail,
      profPassword);
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
        Role:'Nutritionist'
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
            profPhone:''
          });
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
        'Welcome to VieLyf Nutritionist!',
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
      profPassword:'',
      profTitle:'',
      profPhone:'',
      License:''
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
        'Welcome to VieLyf User!',
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
        <section className="login-block" style={{padding: '100px'}}>
          <div className="container container2">
            <div className="row">
              <div className="col-md-4 login-sec">
                {userMessage}
                <form className="login-form">
                  <div className="form-group">    
                    <label htmlFor="exampleInputEmail1" className="text-uppercase">First Name</label>
                    <input type="text" name="signUpFirstName" value={signUpFirstName} onChange={this.handleInputChange} className="form-control" placeholder=""/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Last Name</label>
                    <input type="text" name="signUpLastName" value={signUpLastName} onChange={this.handleInputChange} className="form-control" placeholder=""/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="text-uppercase">User Name</label>
                    <input type="text" name="signUpUserName" value={signUpUserName} onChange={this.handleInputChange} className="form-control" placeholder=""/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Email</label>
                    <input type="email" pattern="" name="signUpEmail" value={signUpEmail} onChange={this.handleInputChange} className="form-control" placeholder=""/>                    
                  </div>  
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                    <input type="password" name="signUpPassword" value={signUpPassword} onChange={this.handleInputChange} className="form-control" placeholder=""/>                    
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Phone</label>
                    <input type="password" name="signUpPhone" value={signUpPhone} onChange={this.handleInputChange} className="form-control" placeholder=""/>                    
                  </div>
                  <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" value="Nutriologo" checked={false} onChange={this.toggleModal}/>
                      <small>I'm Nutriologist</small>
                  </label>
                  <div className="form-check">
                    <button type="button" className="btn btn-login float-left" onClick={this.onSignUp}>Submit</button>
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
                            <h4 style={{color: 'rgb(187, 54, 143)', backgroundColor: '#fff'}}>Take care of your body, it's the only place you have to live in.</h4>
                        </div>	
                      </div>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block img-fluid" width="1100px" height="500px" src="/assets/img/img6.jpg" alt="First slide"/>
                      <div className="carousel-caption d-none d-md-block">
                        <div className="banner-text" style={{top: '-600px', width: '90%'}}>
                            <h2>Work for the happiest version of yourself</h2>
                            <h3 style={{color: 'rgb(237, 208, 194)', backgroundColor: '#fff'}}>Remeber: Dreams and dedictaion are a powerful combination.</h3>
                        </div>	
                      </div>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block img-fluid" width="1100px" height="500px" src="/assets/img/img7.jpg" alt="First slide"/>
                      <div className="carousel-caption d-none d-md-block">
                        <div className="banner-text" style={{top: '-600px', width: '90%'}}>
                            <h2>Enjoy eating well</h2>
                            <h3 style={{color: 'rgb(227, 58, 22)', backgroundColor: '#fff'}}>And enjoy the change in your lifestyle.</h3>
                        </div>	
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> 

          <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal}style ={customStyles}>
          <input type="text" name ="License" placeholder="Cedula Profesional" value ={License} onChange={this.handleInputChange}/> <button onClick={() => this.verify()}>Verificar</button><br />
          <input type="text" name = "profFirstName"placeholder="Nombre" value ={profFirstName} onChange={this.handleInputChange}readOnly/><br />
          <input type="text" name ="profLastName" placeholder="Paterno" value ={profLastName} onChange={this.handleInputChange}readOnly/><br />
          <input type="text" name = "profMotherLastName" placeholder="Materno" value ={profMotherLastName} onChange={this.handleInputChange}readOnly/><br />
          <input type="text" name = "profTitle" placeholder="Titulo" value ={profTitle} onChange={this.handleInputChange} readOnly/><br />
          <input type="text" name = "profPhone" placeholder="Phone" value = {profPhone} onChange={this.handleInputChange}/><br />
          <input type="email" name = "profEmail" placeholder="email" value = {profEmail} onChange={this.handleInputChange}/><br />
          <input type="password" name= "profPassword" placeholder="password" value = {profPassword}onChange={this.handleInputChange}/><br />
          <button onClick={this.toggleModal}>Cancel</button>
          <button onClick={this.onProfSignUp}>Sign me up!</button>
          </Modal>
      </div>           
      );
    }
  }
}

export default Signup;