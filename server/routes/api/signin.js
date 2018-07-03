const User = require('../../models/User');
const UserSession = require('../../models/UserSchema');
const RolesSchema = require('../../models/Roles')
// var ObjectId = require('mongoose').ObjectID;

    module.exports = (app) => {
        app.get("api/account/CreateRole", (req,res, next) => {
            const {body} = req;
            const {token} = body;
            console.log('Mensaje: '+token);
            RolesSchema.find({
                Role: token,
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

        app.get("api/account/check", (req,res, next) => {
            const {body} = req;
            const {token} = body;

            User.find({
                _id: token
            }, (err) => {
                if (err) {
                    return res.send({
                        success: true,
                        message: 'No exist ' + token
                      });
                } else {
                    return res.send({
                        success: true,
                        message: 'Exist ' + token
                      });
                }
            });
        });

        app.post("/api/account/signin", (req, res, next) => {
            const {body} = req;
            const { FirstName, LastName, Password }   = body;
            let { Email } = body;
            if (!Email) {
                return res.send({
                    success: false,
                    message: 'Error en su correo'
                });
            }   
            if (!Password) {
                    return res.send({
                    success: false,
                    message: 'Error en la contraseña'
                });
            } Email = Email.toLowerCase();
            User.find({
                Email:Email
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
                if (!user.validPassword(Password)) {
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

        app.get('/api/account/isnutriologist', (req, res, next) => {
            const {query} = req;
            const {token} = query;
    
            User.find({
                Email: token,
                Role: 'Nutritionist'
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
    
        app.get('/api/account/assign', (req, res, next) => {
            // Get the token
            const { query } = req;
            const { token, token2 } = query;
            // ?token=test
            // Verify the token is one of a kind and it's not deleted.
            User.findOneAndUpdate({
              _id: token2
            }, {
                $set: {
                  nutri_Id: token
                }
            }, null, (err, sessions) => {
              if (err) {
                console.log(err);
                return res.send({
                  success: false,
                  message: 'Error: Server error'
                });
              }
              console.log(req.params);
              return res.send({
                success: true,
                message: 'Good'
                });
            });
        });

        app.post("/api/account/signup", (req, res, next) => {
        const {body} = req;
        const {
            FirstName,
            LastName, 
            Password,
            isDeleted,
            Role,
            nutri_Id,
            Phone,
            Description
        }   = body;
        let {
            Email
            } = body;
        
        if (!FirstName) {
            return res.send({
                success: false,
                message: 'Error en el nombre'
            });
        }
        if (!LastName) {
            return res.send({
                success: false,
                message: 'Error en el apeido'
            });
        }
        if (!Email) {
            return res.send({
                success: false,
                message: 'Error en su correo'
            });
        }
        if (!Password) {
                return res.send({
                success: false,
                message: 'Error en la contraseña'
            });
        }
        if (!Phone) {
            return res.send({
            success: false,
            message: 'Error en el número de teléfono'
        });
        if (!Role) {
            return res.send({
            success: false,
            message: 'Error en la contraseña'
        });
        }
    }

        User.find({ Email: Email }, (err, previousUser) => {
            if (err) {
                return res.send('Error');
            } else if ( previousUser.length > 0) {
                return res.send('Error');
            }
            
            const newUser = new User();

            newUser.FirstName = FirstName;
            newUser.LastName = LastName;
            newUser.Email = Email;
            newUser.Password = newUser.generateHash(Password);
            newUser.isDeleted = false,
            newUser.Role= Role,
            newUser.Phone = Phone,
            newUser.Description = '',
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
    });
};