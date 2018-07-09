import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      isNutriologis: false,
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpRole: 'Client',
      signUpPhone: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
    this.onTextboxChangeSignUpPhone = this.onTextboxChangeSignUpPhone.bind(this);
    this.onClickSignUpRole = this.onClickSignUpRole.bind(this);
    
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj1 = getFromStorage('the_main_app');
    if (obj1 && obj1.token) {
      const { token } = obj1;
    fetch('/api/account/isnutriologist?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isNutriologis: true
            });
          } else {
            this.setState({
              isNutriologis: false,
            });
          }
        });
    } else {
      this.setState({
        isNutriologis: true,
      });
    }
    
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

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }
  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }

  onTextboxChangeSignUpPhone(event) {
    this.setState({
      signUpPhone: event.target.value,
    });
  }

  onClickSignUpRole(event){
    this.setState({
      isChecked: !this.state.isChecked,
    });
    console.log(this.state.signUpRole )

  }

  onSignUp() {
    // Grab state
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpRole,
      signUpPhone,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    if (this.state.isChecked){
      this.setState({
        signUpRole: "Nutritionist"
      });  
    } else {
      this.setState({
        signUpRole: "Client"
      });  
    }

    // // Post request to backend
    // fetch('/api/account/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     FirstName: signUpFirstName,
    //     LastName: signUpLastName,
    //     Email: signUpEmail,
    //     Password: signUpPassword,
    //     Role: signUpPhone,
    //     Phone: signUpPhone
    //   }),
    // }).then(res => res.json())
    //   .then(json => {
    //     console.log('json', json);
    //     if (json.success) {
    //       this.setState({
    //         signUpError: json.message,
    //         isLoading: false,
    //         signUpFirstName: '',
    //         signUpLastName: '',
    //         signUpEmail: '',
    //         signUpPassword: '',
    //         signUpPhone: '',
    //         signUpRole: '',
    //       });
    //     } else {
    //       this.setState({
    //         signUpError: json.message,
    //         isLoading: false,
    //       });
    //     }
    //   });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;
    //check();
    this.setState({
      isLoading: true,
    });
    // Check if the user is a Nutriologist
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
    fetch('/api/account/isnutriologist?token='+signInEmail)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isNutriologis: true
            });
          } else {
            this.setState({
              isNutriologis: false,
            });
          }
        });
      }

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        
        Email: signInEmail,
        Password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    this.setState({
      isNutriologis: false,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
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

  render() {
    const {
      isNutriologis,
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpFirstName,
      signUpLastName,
      signUpPassword,
      signUpRole,
      signUpPhone,
      signUpError,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    

    if (!token) {
      return (
        <div>
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <p>Sign In</p>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <button onClick={this.onSignIn}>Sign In</button>
          </div>
          <br />
          <br />
          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <p>Sign Up</p>
            <input
              type="FirstName"
              placeholder="First Name"
              value={signUpFirstName}
              onChange={this.onTextboxChangeSignUpFirstName}
            /><br />
            <input
              type="LastName"
              placeholder="Last Name"
              value={signUpLastName}
              onChange={this.onTextboxChangeSignUpLastName}
            /><br />
            <input
              type="Email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            /><br />
            <input
              type="Password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            /><br />
            <input
              type="Phone"
              placeholder="Phone"
              value={signUpPhone}
              onChange={this.onTextboxChangeSignUpPhone}
            /><br />
            <p>are you a nutriologist? <input
            name="Role"
            checked={this.state.isChecked}
            value="are you a nutriologist?"
            type="checkbox"
            onClick={this.onClickSignUpRole} 
            /><br /></p>
            <button onClick={this.onSignUp}>Sign Up</button>
          </div>
        </div>
      );
    }
    if (isNutriologis) {
       return (<div><p>Bienvenido</p>
       
        <p>Cuenta Nutriólogo</p>
        <button onClick={this.logout}>Logout</button>
        <nav>
        <Link to="/Agenda">Agenda</Link>
        </nav>
      </div>
      
      
      );
    } else {
      return (
        <div>
          <p>Cuenta Cliente</p>
          <button onClick={this.logout}>Logout</button>
          
        </div>
      );
    }
    
  }
}

export default Home;