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
    backgroundColor       :'#98fb98'
  }
};


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      token:'',
      signUpError:'',
      signInError:'',
      signInEmail:'',
      signInPassword:'',
      signUpFirstName:'',
      signUpLastName:'',
      signUpEmail:'',
      signUpPassword:'',
      isActive: false,
      profFirstName:'',
      profLastName:'',
      profMotherLastName:'',
      profTitle:'',
      License :''
    };
    this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(this);
    this.onTextBoxChangeSignInPassword= this.onTextBoxChangeSignInPassword.bind(this);
    this.onTextBoxChangeSignUpEmail = this.onTextBoxChangeSignUpEmail.bind(this);
    this.onTextBoxChangeSignUpFirstName = this.onTextBoxChangeSignUpFirstName.bind(this);
    this.onTextBoxChangeSignUpLastName = this.onTextBoxChangeSignUpLastName.bind(this);
    this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this);    
    this.onTextBoxChangeSignUpLicense = this.onTextBoxChangeSignUpLicense.bind(this);
    this.onTextBoxChangeSignUpProfFirstName = this.onTextBoxChangeSignUpProfFirstName.bind(this);
    this.onTextBoxChangeSignUpProfLastName = this.onTextBoxChangeSignUpProfLastName.bind(this);
    this.onTextBoxChangeSignUpProfMotherLastName = this.onTextBoxChangeSignUpProfMotherLastName.bind(this);
    this.onTextBoxChangeSignUpProfTitle = this.onTextBoxChangeSignUpProfTitle.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.verify = this.verify.bind(this);
  }

  componentDidMount() {
    const obj=getFromStorage('the_main_app'); 

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


    }
  }

  onTextBoxChangeSignInEmail(event)
  {
    this.setState({
      signInEmail : event.target.value,
    });
  }
  onTextBoxChangeSignInPassword(event)
  {
    this.setState({
      signInPassword : event.target.value,
    });
  }
  onTextBoxChangeSignUpEmail(event)
  {
    this.setState({
      signUpEmail : event.target.value,
    });
  }

  onTextBoxChangeSignUpFirstName(event)
  {
    this.setState({
      signUpFirstName : event.target.value,
    });
  }
  onTextBoxChangeSignUpLastName(event)
  {
    this.setState({
      signUpLastName : event.target.value,
    });
  }
  onTextBoxChangeSignUpPassword(event)
  {
    this.setState({
      signUpPassword : event.target.value,
    });
  }
  onTextBoxChangeSignUpLicense(event)
  {
    this.setState({
      License : event.target.value,
    });
  }
  onTextBoxChangeSignUpProfFirstName(event)
  {
    this.setState({
      profFirstName : event.target.value,
    });
  }
  onTextBoxChangeSignUpProfLastName(event)
  {
    this.setState({
      profLastName : event.target.value,
    });
  }
  onTextBoxChangeSignUpProfMotherLastName(event)
  {
    this.setState({
      profMotherLastName : event.target.value,
    });
  }
  onTextBoxChangeSignUpProfTitle(event)
  {
    this.setState({
      profTitle : event.target.value,
    });
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
    
    this.setState({
     isLoading:true,
    });
    console.log({License})
   /*Consuimiedo API  
   Ya es dinamico
   */
    if(License!="" || !License)
    {fetch('http://search.sep.gob.mx/solr/cedulasCore/select?fl=%2A%2Cscore&q='+License+'&start=0&rows=100&facet=true&indent=on&wt=json', 
    { method: 'GET',
      
  })
      .then(res => res.json())
      .then(json => {
        
        if(json.success){
          console.log(json.response.docs[0].nombre);
          this.setState({
            signUpError:json.message,
            isLoading:false
          });
        }
        else{
          console.log(json.response.docs[0].nombre);
          this.setState({
            
            signUpError:json.message,
            isLoading:false,
            profFirstName : json.response.docs[0].nombre,
            profLastName: json.response.docs[0].paterno,
            profMotherLastName:json.response.docs[0].materno,
            profTitle: json.response.docs[0].titulo,
          });
          
        }
      });}
      else{
        console.log("Hey que show");
      }

  }
  componentWillMount(){
    Modal.setAppElement('body');
    this.verify('');
  }
  toggleModal() 
  {
    this.setState({
      isActive:!this.state.isActive
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
  render() {
    const {
      isLoading,
      token,
      signInError,
      signUpError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      profFirstName,
      profLastName,
      profMotherLastName,
      profTitle,
      License
    } = this.state;

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
          <input type="email"placeholder="email" value ={signInEmail} onChange={this.onTextBoxChangeSignInEmail}/><br />
          <input type="password" placeholder="password" value ={signInPassword} onChange={this.onTextBoxChangeSignInPassword}/><br />
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
          <input type="text"placeholder="First Name" value ={signUpFirstName} onChange={this.onTextBoxChangeSignUpFirstName}/><br />
          <input type="text" placeholder="Last Name" value ={signUpLastName} onChange={this.onTextBoxChangeSignUpLastName}/><br />
          <input type="email"placeholder="email" value = {signUpEmail} onChange={this.onTextBoxChangeSignUpEmail}/><br />
          <input type="password" placeholder="password" value = {signUpPassword}onChange={this.onTextBoxChangeSignUpPassword}/><br />
          <input type="checkbox" value="Nutriologo" onChange={this.toggleModal}/>Nutriologo<br/>
          <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal}style ={customStyles}>
          <input type="text" placeholder="Cedula Profesional" value ={License} onChange={this.onTextBoxChangeSignUpLicense}/> <button onClick={() => this.verify()}>Verificar</button><br />
          <input type="text" placeholder="Nombre" value ={profFirstName} onChange={this.onTextBoxChangeSignUpProfFirstName}readOnly/><br />
          <input type="text" placeholder="Paterno" value ={profLastName} onChange={this.onTextBoxChangeSignUpProfLastName}readOnly/><br />
          <input type="text" placeholder="Materno" value ={profMotherLastName} onChange={this.onTextBoxChangeSignUpProfMotherLastName}readOnly/><br />
          <input type="text" placeholder="Titulo" value ={profTitle} onChange={this.onTextBoxChangeSignUpProfTitle} readOnly/><br />
          <button onClick={this.toggleModal}>Close Modal</button>
          </Modal>
          <button onClick={this.onSignUp}>Sign Up</button>
          </div>
        </div>
      )
    }

    return (
      <div>
       <p>Account</p>
      </div>
    );
  }
}

export default Home;
