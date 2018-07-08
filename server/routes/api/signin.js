const User = require('../../models/User');
const UserSession = require('../../models/UserSchema');
const RolesSchema = require('../../models/Roles');
const Counters = require('../../models/Counter');
const Patients = require('../../models/Patients');
// var ObjectId = require('mongoose').ObjectID;

    module.exports = (app) => {
        
        
//         app.get('/api/account/check', (req, res, next) => {

//             // Obtener el token
//             const {query} = req;
//             const {token} = query;
    
//             Counters.find({
//                 _id: token,
//               }, (err, sessions) => {
//                 if (err) {
//                   console.log(err);
//                   return res.send({
//                     success: false,
//                     message: 'Error: Server error'
//                   });
//                 }
//                 if (sessions.length != 1) {
//                   return res.send({
//                     success: false,
//                     message: 'Error: Invalid'
//                   });
//                 } else {
//                   // DO ACTION
//                   return res.json;
// //                  return res.status(200).json;

//                 }
//               });
//         });

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
            } 
                
            Email = Email.toLowerCase();
            
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
    
        app.post('/api/account/assign', (req, res, next) => {
            // Crearmos la petición
            const {body} = req;
            // el prmer token será el ID del cliente y el token 2 el ID del nutriólogo
            const { token1, token2 }   = body;
            // Verificamos que los token 1 y 2 si estén 
            if (!token1) {
                return res.send({
                    success: false,
                    message: 'Error en el Token 1'
                });
            }   
            if (!token2) {
                    return res.send({
                    success: false,
                    message: 'Error en el token 2'
                });
            } 
            // Buscamos a primer usuario
            User.find({
                _id:token1
            }, (err, users) => {
                // Si hay error nos manda mensaje noificándonos.
                if (err) {
                    return res.send({
                        success: false,
                        message: 'El ususario no existe'
                    });
                }
                // si no hay error se crea un nuevo documento
                // este nuevo documento contendrá la relación entre los dos usuarios.

                const newCounters = Counters();
                // asignamos las constantes para rellenar los campos del documento
                newCounters.Client_id = token1;
                newCounters.Nutriologist_id = token2;
                newCounters.save((err, user) => {
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
        }
        if (Role == 'Client' || Role == 'Nutritionist') {
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
        } else if (Role == "") 
        {
            return res.send({
                success: false,
                message: 'Campo vacio'
            });
        } else {
            return res.send({
                success: false,
                message: 'Error en su opcion'
            });
        }
    

         
    });
};

// app.get("api/account/CreateRole", (req,res, next) => {
        //     const {body} = req;
        //     const {token} = body;
        //     console.log('Mensaje: '+token);
        //     RolesSchema.find({
        //         Role: token,
        //       }, (err, sessions) => {
        //         if (err) {
        //           console.log(err);
        //           return res.send({
        //             success: false,
        //             message: 'Error: Server error'
        //           });
        //         }
        //         if (sessions.length != 1) {
        //           return res.send({
        //             success: false,
        //             message: 'Error: Invalid'
        //           });
        //         } else {
        //           // DO ACTION
        //           return res.send({
        //             success: true,
        //             message: 'Good'
        //           });
        //         }
        //     });
        
        // });
