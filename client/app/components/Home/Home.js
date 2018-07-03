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
      profEmail:'',
      profPassword:'',
      License :'',
      corpFirstname:'',
      corpLastName:'',
      id:'',
      height:'',
      weight:'',
      Age:'',
      FatFreeBodyMass:'',
      LeanSoftTissue:'',
      TotalBodyWater:'',
      FFBMBodyFat:'',
      LSTBodyFat:'',
      LSTMineral:'',
      TBWProtein:'',
      TBWMineral:'',
      TBWBodyFat:''
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
    this.onTextBoxChangeProfEmail = this.onTextBoxChangeProfEmail.bind(this);
    this.onTextBoxChangeProfPassword = this.onTextBoxChangeProfPassword.bind(this);
    this.onTextBoxChangeCorpAUpFirstName = this.onTextBoxChangeCorpAUpFirstName.bind(this);
    this.onTextBoxchangeCorpAUpLastName = this.onTextBoxchangeCorpAUpLastName.bind(this);
    this.onTextBoxChangeFatFreeBodyMassBodyFat = this.onTextBoxChangeFatFreeBodyMassBodyFat.bind(this);
    this.onTextBoxChangeId = this.onTextBoxChangeId.bind(this);
    this.onTextBoxChangeHeight = this.onTextBoxChangeHeight.bind(this);
    this.onTextBoxChangeWeight = this.onTextBoxChangeWeight.bind(this);
    this.onTextBoxChangeAge = this.onTextBoxChangeAge.bind(this);
    this.onTextBoxChangeFatFreeBodyMass = this.onTextBoxChangeFatFreeBodyMass.bind(this);
    this.onTextBoxChangeFatFreeBodyMassBodyFat = this.onTextBoxChangeFatFreeBodyMassBodyFat.bind(this);
    this.onTextBoxChangeLeanSoftTissue = this.onTextBoxChangeLeanSoftTissue.bind(this);
    this.onTextBoxChangeLSTMineral = this.onTextBoxChangeLSTMineral.bind(this);
    this.onTextBoxChangeLSTBodyFat = this.onTextBoxChangeLSTBodyFat.bind(this);
    this.onTextBoxChangeTotalBodyWater = this.onTextBoxChangeTotalBodyWater.bind(this);
    this.onTextBoxChangeTBWProtein = this.onTextBoxChangeTBWProtein.bind(this);
    this.onTextBoxChangeTBWMineral = this.onTextBoxChangeTBWMineral.bind(this);
    this.onTextBoxChangeTBWBodyFat = this.onTextBoxChangeTBWBodyFat.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onProfSignUp = this.onProfSignUp.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.verify = this.verify.bind(this);
    this.onUpdateCorpA=this.onUpdateCorpA.bind(this);
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
  onTextBoxChangeProfEmail(event)
  {
    this.setState({
      profEmail: event.target.value,
    });
  }
  onTextBoxChangeProfPassword(event)
  {
    this.setState({
      profPassword:event.target.value,
    });
  }
  onTextBoxChangeCorpAUpFirstName(event)
  {
    this.setState({
      corpFirstname:event.target.value,
    });
  }
  onTextBoxchangeCorpAUpLastName(event)
  {
    this.setState({
      corpLastName:event.target.value,
    });
  }
  onTextBoxChangeHeight(event)
  {
    this.setState({
      height:event.target.value,
    });
  }
  onTextBoxChangeId(event)
  {
    this.setState({
      id:event.target.value,
    });
  }
  onTextBoxChangeWeight(event)
  {
    this.setState({
      weight:event.target.value,
    });
  }
  onTextBoxChangeAge(event)
  {
    this.setState({
      Age:event.target.value,
    });
  }
  onTextBoxChangeFatFreeBodyMass(event)
  {
    this.setState({
      FatFreeBodyMass:event.target.value,
    });
  }
  onTextBoxChangeFatFreeBodyMassBodyFat(event)
  {
    this.setState({
      FFBMBodyFat:event.target.value,
    });
  }
  onTextBoxChangeLeanSoftTissue(event)
  { this.setState({
    LeanSoftTissue:event.target.value,
  });
}
  onTextBoxChangeLSTMineral(event)
  {
    this.setState({
      LSTMineral:event.target.value
    });
  }
  onTextBoxChangeLSTBodyFat(event)
  {
   this.setState({
     LSTBodyFat:event.target.value,
     
    });
  }
  onTextBoxChangeTotalBodyWater(event)
  {this.setState({
    TotalBodyWater:event.target.value,
  });
  }
  onTextBoxChangeTBWProtein(event)
  {
    this.setState({
      TBWProtein:event.target.value,
    });
  }
  onTextBoxChangeTBWMineral(event)
  {
    this.setState({
      TBWMineral:event.target.value
    });
  }
  onTextBoxChangeTBWBodyFat(event)
  {
    this.setState({
      TBWBodyFat:event.target.value
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
          console.log("algo bien!");
          
          this.setState({
            
            signUpError:json.message,
            isLoading:false,
            profFirstName : json.response.docs[0].nombre,
            profLastName: json.response.docs[0].paterno,
            profMotherLastName:json.response.docs[0].materno,
            profTitle: json.response.docs[0].titulo,
          });
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
            signUpFirstName:'',
            signUpLastName:'',
            signUpEmail:'',
            signUpPassword:''
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

  onUpdateCorpA()
  {
    const {
      firstName,
      lastName,
      id,
      height,
      weight,
      Age,
      FatFreeBodyMass,
      LeanSoftTissue,
      TotalBodyWater,
      FFBMBodyFat,
      LSTBodyFat,
      LSTMineral,
      TBWProtein,
      TBWMineral,
      TBWBodyFat

      }=this.state;
      this.setState({
        isLoading:true
       });
       console.log()
      fetch('api/accounts/AnalysisFill', 
    { method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }, 
      body : JSON.stringify({
        
        id: id,
        Weight:weight,
        Height:height,
        Age:Age,
        FatFreeBodyMass:FatFreeBodyMass,
        LeanSoftTissue:LeanSoftTissue,
        TotalBodyWater:TotalBodyWater,
        FFBMBodyFat: FFBMBodyFat,
        LSTBodyFat:LSTBodyFat,
        LSTMineral:LSTMineral,
        TBWProtein:TBWProtein,
        TBWMineral:TBWMineral,
        TBWBodyFat:TBWBodyFat
      }),
  })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if(json.success){
          this.setState({
            signUpError:json.message,
            isLoading:false,
            id:'',
            height:'',
            weight:'',
            Age:'',
            FatFreeBodyMass:'',
            LeanSoftTissue:'',
            TotalBodyWater:'',
            FFBMBodyFat:'',
            LSTBodyFat:'',
            LSTMineral:'',
            TBWProtein:'',
            TBWMineral:'',
            TBWBodyFat:''
          });
        
        }
        else{
          this.setState({
            
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
      profEmail,
      profPassword,
      License,
      corpFirstname,
      corpLastName,
      id,
        height,
        weight,
        Age,
        FatFreeBodyMass,
        LeanSoftTissue,
        TotalBodyWater,
        FFBMBodyFat,
        LSTBodyFat,
        LSTMineral,
        TBWProtein,
        TBWMineral,
        TBWBodyFat
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
          <input type="checkbox" value="Nutriologo" checked={false} onChange={this.toggleModal}/>Nutriologo<br/>
          <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal}style ={customStyles}>
          <input type="text" placeholder="Cedula Profesional" value ={License} onChange={this.onTextBoxChangeSignUpLicense}/> <button onClick={() => this.verify()}>Verificar</button><br />
          <input type="text" placeholder="Nombre" value ={profFirstName} onChange={this.onTextBoxChangeSignUpProfFirstName}readOnly/><br />
          <input type="text" placeholder="Paterno" value ={profLastName} onChange={this.onTextBoxChangeSignUpProfLastName}readOnly/><br />
          <input type="text" placeholder="Materno" value ={profMotherLastName} onChange={this.onTextBoxChangeSignUpProfMotherLastName}readOnly/><br />
          <input type="text" placeholder="Titulo" value ={profTitle} onChange={this.onTextBoxChangeSignUpProfTitle} readOnly/><br />
          <input type="email"placeholder="email" value = {profEmail} onChange={this.onTextBoxChangeProfEmail}/><br />
          <input type="password" placeholder="password" value = {profPassword}onChange={this.onTextBoxChangeProfPassword}/><br />
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
       <p>Fill the client information</p><br />
       
       <input type="text" placeholder="First Name" value ={corpFirstname} onChange={this.onTextBoxChangeCorpAUpFirstName}/>
       <input type="text" placeholder="Last  Name" value ={corpLastName}  onChange={this.onTextBoxchangeCorpAUpLastName}/>
       <input type="text" placeholder={id} value={id} onChange={this.onTextBoxChangeId}/><br />
       <input type="text" placeholder="Height" value ={height} onChange={this.onTextBoxChangeHeight}/><br />
       <input type="text" placeholder="Weight" value ={weight} onChange={this.onTextBoxChangeWeight}/>
       <input type="text" placeholder="Age" value={Age} onChange={this.onTextBoxChangeAge}/>
        <div className="container">
        <div className="row">
         <div className="col-12"> <h3>Composicion Corporal</h3></div>
          <div className="col-12">
          <input type="text"  className="p-3 mb-2 bg-success text-white" placeholder="Weight" value ={weight} onChange={this.onTextBoxChangeWeight}/>
          </div>
          <div >
          <input type="text" className="p-3 mb-5 bg-success text-white" placeholder="Fat-Free Body Mass" value ={FatFreeBodyMass} onChange={this.onTextBoxChangeFatFreeBodyMass}/>
          </div>
          <div className="col-8">
          <input  type="text" className="p-3 mb-5 bg-success text-white" placeholder="FFBM Body Fat" value ={FFBMBodyFat} onChange={this.onTextBoxChangeFatFreeBodyMassBodyFat}/>
            </div>
            <div>
          <input type="text" className="p-3 mb-5 bg-success text-white" placeholder="Lean Soft Tissue" value ={LeanSoftTissue} onChange={this.onTextBoxChangeLeanSoftTissue}/>
            </div>
            <div>
          <input type="text" className="p-3 mb-5 bg-success text-white" placeholder="Mineral" value ={LSTMineral} onChange={this.onTextBoxChangeLSTMineral}/>
            </div>
            <div className="col-6">
          <input type="text" className="p-3 mb-5 bg-success text-white" placeholder="Body Fat" value ={LSTBodyFat} onChange={this.onTextBoxChangeLSTBodyFat}/>
            </div>
            <div>
          <input type="text" className="p-3 mb-5 bg-success text-white" placeholder="Total Body Water" value ={TotalBodyWater} onChange={this.onTextBoxChangeTotalBodyWater}/>
            </div>
            <div>
          <input type="text" className="p-3 mb-5 bg-success text-white" placeholder="Protein" value ={TBWProtein} onChange={this.onTextBoxChangeTBWProtein}/>
            </div>
            <div>
          <input type="text" className="p-3 mb-5 bg-success text-white" placeholder="Mineral" value ={TBWMineral} onChange={this.onTextBoxChangeTBWMineral}/>
            </div>
            <div>
          <input type="text" className="p-3 mb-5 bg-success text-white" placeholder="Body Fat" value ={TBWBodyFat} onChange={this.onTextBoxChangeTBWBodyFat}/>
            </div>
        </div>
        <button onClick={this.onUpdateCorpA}>Save</button>
      </div>
      </div>
    );
  }
}

export default Home;
