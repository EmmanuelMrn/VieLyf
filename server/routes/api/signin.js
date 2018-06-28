const User = require('../../models/User');
const UserSession = require('../../models/UserSchema');
    module.exports = (app) => {
        
        app.post("/api/account/signup", (req, res, next) => {
        const {body} = req;
        const {
            firstName,
            lastName, 
            password
        }   = body;
        let {
            email
            } = body;
        

        if (!firstName) {
            return res.send({
                success: false,
                message: 'Error en el nombre'
            });
        }
        if (!lastName) {
            return res.send({
                success: false,
                message: 'Error en el apeido'
            });
        }
        if (!email) {
            return res.send({
                success: false,
                message: 'Error en su correo'
            });
        }
        if (!password) {
                return res.send({
                success: false,
                message: 'Error en la contraseña'
            });
        }
        
        // Pasos
        // Verificar
        // Salcar

        User.find({
            email: email
        }, (err, previousUser) => {
            if (err) {
                return res.send('Error');
            } else if ( previousUser.length > 0) {
                return res.send('Error');
            }
            
            // Salvar
            const newUser = new User();

            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err) {
                    return res.send ({
                        success: false,
                        message: 'Error'
                    })
                }
                return res.send({
                    success: true,
                    message: 'logrado'
                });
            });
        });


        app.post("/api/account/signin", (req, res, next) => {
            const {body} = req;
            const {
                firstName,
                lastName, 
                password
            }   = body;
            let {
            email
            } = body;

            if (!email) {
                return res.send({
                    success: false,
                    message: 'Error en su correo'
                });
            }
            if (!password) {
                    return res.send({
                    success: false,
                    message: 'Error en la contraseña'
                });
            }

            email = email.toLowerCase();

            User.find({
                email:email
            }, (err, users) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error en el servidor'
                    });
                }
                if (users.length != 1) {
                    return res.send({
                      success: false,
                      message: 'Error: Invalid'
                    });
                  }
                const user = users[0];
                if (!user.validPassword(password)) {
                    return res.send({
                        success: false,
                        message: 'Error 2, inválido '
                    });
                }
                
                const userSession = new UserSession();
                    userSession.userId = user._id;
                    userSession.save((err, doc) => {
                        if (err) {
                        console.log(err);
                        return res.send({
                            success: false,
                            message: 'Error: server error'
                        });
                        }
                        return res.send({
                        success: true,
                        message: 'Valid sign in',
                        token: doc._id
                        });
                });
            });
        }); 
    });

    app.get('/api/account/verify', (req, res, next) => {
        // Obtener el token
        const {query} = req;
        const {token} = query;

        UserSession.find({
            _id: token,
            isDeleted: false
          }, (err, sessions) => {
            if (err) {
              console.log(err);
              return res.send({
                success: false,
                message: 'Error: Server error'
              });
            }
            if (sessions.length != 1) {
              return res.send({
                success: false,
                message: 'Error: Invalid'
              });
            } else {
              // DO ACTION
              return res.send({
                success: true,
                message: 'Good'
              });
            }
          });
        });

        app.get('/api/account/logout', (req, res, next) => {
            // Get the token
            const { query } = req;
            const { token } = query;
            // ?token=test
            // Verify the token is one of a kind and it's not deleted.
            UserSession.findOneAndUpdate({
              _id: token,
              isDeleted: false
            }, {
              $set: {
                isDeleted:true
              }
            }, null, (err, sessions) => {
              if (err) {
                console.log(err);
                return res.send({
                  success: false,
                  message: 'Error: Server error'
                });
              }
              return res.send({
                success: true,
                message: 'Good'
              });
            });
          });
};