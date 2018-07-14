import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
<<<<<<< HEAD

=======
import Modal from 'react-modal';
import CorporalAnalysis from '../CorporalAnalysis/CorporalAnalysis';
>>>>>>> Sergio
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class Home extends Component {
  constructor() {
    super();

    this.state = {
    };
<<<<<<< HEAD
=======
    //on change methods
    this.onTextBoxChange = this.onTextBoxChange.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onProfSignUp = this.onProfSignUp.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.verify = this.verify.bind(this);
   // this.onUpdateCorpA=this.onUpdateCorpA.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj=getFromStorage('the_main_app'); 
      console.log(obj.token);
    if(obj && obj.token )
    {    const {token} = obj;
       fetch('/api/accounts/verify?token='+token)
      .then(res => res.json())
      .then(json => {
      if(json.success){
          this.setState({
            token,
            isLoading:false,
          });
      }
      else{
        this.setState({
          isLoading:false
        });
      }
      });

    }else
    {
      this.setState({
        isLoading:false
      });

>>>>>>> Sergio

  }
<<<<<<< HEAD


=======
  onTextBoxChange(event)
  {
    const {name, value} = event.target;
    this.setState({
        [name]: value
    });
    console.log(name,value);
  }
 

  
  onSignIn()
  {
    const{
      signInEmail,
      signInPassword
    } = this.state;
    
    this.setState({
     isLoading:true
    });
    console.log(signInEmail);
    fetch('/api/accounts/signin', 
    { method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }, 
      body : JSON.stringify({
        email: signInEmail,
        password: signInPassword
      }),
  })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if(json.success){
          setInStorage('the_main_app',{token:json.token});
          this.setState({
            signInError:json.message,
            isLoading:false,
            signInEmail:'',
            signInPassword:'',
            token:json.token
          });
        }
        else{
          this.setState({
            signInError:json.message,
            isLoading:false
          });
        }
      });

     
  }
  onSignUp()
  {
    const{
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;
    
    this.setState({
     isLoading:true
    });

    fetch('/api/accounts/signup', 
    { method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }, 
      body : JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword
      }),
  })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if(json.success){
          this.setState({
            signUpError:json.message,
            isLoading:false,
            signUpFirstName:'',
            signUpLastName:'',
            signUpEmail:'',
            signUpPassword:''
          });
        }
        else{
          this.setState({
            signUpError:json.message,
            isLoading:false
          });
        }
      });

  }
  /*Funcion para verificar */
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
        //  console.log();
          
        /*}
        else{
          console.log(json.response.docs[0].nombre);
          this.setState({
            signUpError:json.message,
            isLoading:false
          });
          
          
        }*/
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
      profPassword
    } = this.state;
    console.log(profFirstName,
      profLastName,
      profEmail,
      profPassword);
    this.setState({
     isLoading:true
    });

    fetch('/api/accounts/signup', 
    { method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }, 
      body : JSON.stringify({
        firstName: profFirstName,
        lastName: profLastName,
        email: profEmail,
        password: profPassword
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
            profPassword:''
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

 
  componentWillMount(){
    Modal.setAppElement('body');
    this.verify();
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
      License:''
    })
  }
    // fetch('/api/counters')
    //   .then(res => res.json())
    //   .then(json => {
    //     this.setState({
    //       counters: json
    //     });
    //   });

    // fetch('/api/counters', { method: 'POST' })
    //   .then(res => res.json())
    //   .then(json => {
    //     let data = this.state.counters;
    //     data.push(json);

    //     this.setState({
    //       counters: data
    //     });
    //   });
    logout() {
      this.setState({
        isLoading: true,
      });
      const obj = getFromStorage('the_main_app');
      if (obj && obj.token) {
        const { token } = obj;
        // Verify token
        console.log(obj);
        fetch('/api/accounts/logout?token=' + token)
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              this.setState({
                token: '',
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
>>>>>>> Sergio
  render() {
    const {

<<<<<<< HEAD
    } = this.state;
    return(
    <div className="container">
      <p>Welcome to VieLyf!</p>
    </div>);
=======
    if(isLoading)
    {
      return (<div><p> Loading ... </p></div>);
    }
    if(!token)
    {
      return(
        <div>
          <div>
            {
              (signInError) ?(
                <p>{signInError}</p>
              ) :(null)
            }
          <p>Sign In</p>
          <input type="email" name ="signInEmail" placeholder="email" value ={signInEmail} onChange={this.onTextBoxChange}/><br />
          <input type="password" name="signInPassword"placeholder="password" value ={signInPassword} onChange={this.onTextBoxChange}/><br />
            <button onClick={this.onSignIn}>Sign in</button>
          </div>
          <br/>
          <br/>
          <div>
          {
              (signUpError) ?(
                <p>{signUpError}</p>
              ) :(null)
            }
          <p>Sign Up</p>
          <input type="text" name ="signUpFirstName"placeholder="First Name" value ={signUpFirstName} onChange={this.onTextBoxChange}/><br />
          <input type="text" name ="signUpLastName"placeholder="Last Name" value ={signUpLastName} onChange={this.onTextBoxChange}/><br />
          <input type="email"name = "signUpEmail" placeholder="email" value = {signUpEmail} onChange={this.onTextBoxChange}/><br />
          <input type="password" name = "signUpPassword" placeholder="password" value = {signUpPassword}onChange={this.onTextBoxChange}/><br />
          <input type="checkbox" value="Nutriologo" checked={false} onChange={this.toggleModal}/>Nutriologo<br/>
          <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal}style ={customStyles}>
          <input type="text" name ="License" placeholder="Cedula Profesional" value ={License} onChange={this.onTextBoxChange}/> <button onClick={() => this.verify()}>Verificar</button><br />
          <input type="text" name = "profFirstName"placeholder="Nombre" value ={profFirstName} onChange={this.onTextBoxChange}readOnly/><br />
          <input type="text" name ="profLastName" placeholder="Paterno" value ={profLastName} onChange={this.onTextBoxChange}readOnly/><br />
          <input type="text" name = "profMotherLastName" placeholder="Materno" value ={profMotherLastName} onChange={this.onTextBoxChange}readOnly/><br />
          <input type="text" name = "profTitle" placeholder="Titulo" value ={profTitle} onChange={this.onTextBoxChange} readOnly/><br />
          <input type="email" name = "profEmail" placeholder="email" value = {profEmail} onChange={this.onTextBoxChange}/><br />
          <input type="password" name= "profPassword" placeholder="password" value = {profPassword}onChange={this.onTextBoxChange}/><br />
          <button onClick={this.toggleModal}>Cancel</button>
          <button onClick={this.onProfSignUp}>Sign me up!</button>
          </Modal>
          <button onClick={this.onSignUp}>Sign Up</button>
          
          </div>
        </div>
      )
    }

    return (
      <div>
       <CorporalAnalysis /> 
      </div>
    );
>>>>>>> Sergio
  }
}

export default Home;
