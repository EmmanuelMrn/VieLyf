    window.location = '/vistacliente';
          fetch('/api/account/isnutriologist?token='+ json.Email)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
            console.log("Es nutriólogo")
          } else {
            this.setState({
              isLoading: false,
            });
            console.log("No es nutriólogo");
          }
      });

      setEmailInStorage('the_main_app', {token: json.Email});
          const obj = getFromStorage('the_main_app');
          if (obj && obj.token) {
            const { token } = obj;
            console.log("Email: "+token);
          }