import React, { Component } from 'react';
import 'whatwg-fetch';
import Modal from 'react-modal';


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
  const URL ='http://search.sep.gob.mx/solr/cedulasCore/select?fl=%2A%2Cscore&q='+License+'&start=0&rows=100&facet=true&indent=on&wt=json';
  if(License!="" || !License)
    {fetch(URL, { 
      method: 'GET',
     crossDomain:true,
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
    onProfSignUp()
  {
    
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

  }
  toggleModal() 
  {
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
            signUpEmail: '',
            signUpPassword: '', 
            signUpPhone: ''
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  render() {
    const {
      isLoading,
      token,
      signUpEmail,
      signUpFirstName,
      signUpLastName,
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

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <h1>Sign Up</h1>
            <input
              type="firstName"
              name="signUpFirstName"
              placeholder="First Name"
              value={signUpFirstName}
              onChange={this.handleInputChange}
            /><br />
            <input
              type="lastName"
              name="signUpLastName"
              placeholder="Last Name"
              value={signUpLastName}
              onChange={this.handleInputChange}
            /><br />
            <input
              type="text"
              name="signUpPhone"
              placeholder="Phone"
              value={signUpPhone}
              onChange={this.handleInputChange}
            /><br />
            <input
              type="email"
              name="signUpEmail"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.handleInputChange}
            /><br />
            <input
              type="password"
              name="signUpPassword"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.handleInputChange}
            /><br />
          <input type="checkbox" value="Nutriologo" checked={false} onChange={this.toggleModal}/>Nutritionist<br/>
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
            <button type="button" className="btn btn-dark" onClick={this.onSignUp}>Sign Up</button>
          </div>
      );
    }
  }
}

export default Signup;