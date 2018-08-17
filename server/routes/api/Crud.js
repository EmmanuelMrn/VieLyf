const User = require('../../models/User');
const UserSession = require('../../models/UserSchema');
const Agenda = require('../../models/Agenda');
module.exports = (app) => {

  app.get("/api/account/agendaarray", (req, res, next)=> {
    const {query} = req;
    const {token} = query;

    Agenda.find({ Nutriologist_id:token, pending:false}, (err, doc)  => {
      console.log(doc);
      return res.send(doc);
      });
  });

  app.get("/api/account/agendaarrayaproved", (req, res, next)=> {
      const {query} = req;
      const {token} = query;

      Agenda.find({ Nutriologist_id:token, pending:true}, (err, doc)  => {
          console.log(doc);
          return res.send(doc);
          });
  });

  app.get("/api/account/deleteagenda", (req, res) => {
    const {query} = req;
    const { token } = query;;
    Agenda.findByIdAndRemove(token);
    res.json({status: 'Task deleted'});
  });

  app.get("/api/account/editagenda", (req, res, next) => {
    const { query } = req;
    const { token, token2, token3, token4 } = query;
    Agenda.findOneAndUpdate(
      {
        _id: token
      },
      {
        $set: {
          pending: false
        }
      },
      (err) => {
        if (err) {
          status = "Error: server error";
        } else {
          status = "success";
        }
      }
    );

    res.json({ status: status });
  });
  
  app.delete('/api/account/deleteaccount', (req, res) => {
      const { body } = req;
      const { Email } = body;
    
      User.findOneAndRemove({Email: Email} , (err) => {
        if (err) {
          return res.send("Error" + err);
        } else  {
          return res.send('Delete: '+ req.body.Email);
        }
      });
      
  });

  app.get("/api/account/editprofile", (req, res, next) => {
    var status = "success";
    const { query } = req;
    const { token, token2, token3, token4 } = query;
    console.log(token, token2, token3, token4);
    const newUser = new User();
    User.findOneAndUpdate(
      {
        Email: token
      },
      {
        $set: {
          FirstName: token2,
          LastName: token3,
          Password: newUser.generateHash(token4)
        }
      },
      (err, sessions) => {
        if (err) {
          status = "Error: server error";
        } else {
          status = "success";
        }
      }
    );

    res.json({ status: status });
  });

  app.post("/api/account/signup", (req, res, next) => {
    const { body } = req;
    const {
      FirstName,
      LastName,
      Password,
      UserName,
      Role,
      Phone,
    } = body;
    let { Email } = body;

    if (!FirstName) {
      return res.send({
        success: false,
        message: "Fail in the First Name"
      });
    }
    if (!LastName) {
      return res.send({
        success: false,
        message: "Fail in the Last Name"
      });
    }
    // if (!UserName) {
    //   return res.send({
    //     success: false,
    //     message: "Fail in the User Name"
    //   });
    // }
    if (!Email) {
      return res.send({
        success: false,
        message: "Fail in the Email"
      });
    }
    if (!Password) {
      return res.send({
        success: false,
        message: "Please, write a Password"
      });
    }
    /*if (!Phone) {
                return res.send({
                success: false,
                message: 'Error en el número de teléfono'
            });
            }*/
    if (Role == "Client" || Role == "Nutritionist") {
      User.find({ Email: Email }, (err, previousUser) => {
        if (err) {
          return res.send("Error");
        } else if (previousUser.length > 0) {
          return res.send("Error in users");
        }

        const newUser = new User();

        newUser.FirstName = FirstName;
        newUser.LastName = LastName;
        newUser.Email = Email;
        newUser.Password = newUser.generateHash(Password);
        newUser.UserName = UserName;
        newUser.isDeleted = false,
        newUser.Role = Role,
        newUser.Phone = Phone,
        newUser.Description = "",
          newUser.save((err, user) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error"
              });
            }
            return res.send({
              success: true,
              message: "Welcome!"
            });
          });
      });
    } else if (Role == "") {
      return res.send({
        success: false,
        message: "Empty field"
      });
    } else {
      return res.send({
        success: false,
        message: "Fail in the option"
      });
    }
  });

  app.get("/api/account/searchuser", (req, res, next) => {
    const { query } = req;
    const { token } = query;

    User.find(
      {
        FirstName: { $regex: ".*" + token + ".*", $options: "i" }
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        } else {
          res.send({
            success: true,
            doc
          });
        }
      }
    );
  });

  app.get("/api/account/searchNutritionist", (req, res, next) => {
    const { query } = req;
    const { token } = query;

    User.find(
      {
        Role: "Nutritionist",
        //FirstName: { $regex: ".*" + token + ".*" }
        FirstName: { $regex: ".*" + token + ".*", $options: "i" }
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        } else {
          res.send({
            success: true,
            doc
          });
          //return res.json(doc);
        }
      }
    );
  });

  app.post("/api/account/login", (req, res, next) => {
    const { body } = req;
    const { Password } = body;
    let { Email } = body;

    if (!Email) {
      return res.send({
        success: false,
        message: "Error en su correo"
      });
    }
    if (!Password) {
      return res.send({
        success: false,
        message: "Error en la contraseña"
      });
    }

    Email = Email.toLowerCase();

    User.find(
      {
        Email: Email
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error en el servidor"
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        }
        const user = users[0];
        if (!user.validPassword(Password)) {
          return res.send({
            success: false,
            message: "Error 2, inválido "
          });
        }

        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if (err) {
            console.log(err);
            return res.send({
              success: false,
              message: "Error: server error"
            });
          }
          return res.send({
            success: true,
            message: "Valid sign in",
            token: doc._id,
            Email: body.Email
          });
        });
      }
    );
  });

  app.get("/api/account/verify", (req, res, next) => {
    // Obtener el token
    const { query } = req;
    const { token } = query;

    UserSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        } else {
          // DO ACTION
          return res.send({
            success: true,
            message: "Good"
          });
        }
      }
    );
  });

  app.get("/api/account/logout", (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: {
          isDeleted: true
        }
      },
      null,
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        return res.send({
          success: true,
          message: "Good"
        });
      }
    );
  });

  app.get("/api/account/isnutriologist", (req, res, next) => {
    const { query } = req;
    const { token } = query;

    User.find(
      {
        Email: token,
        Role: "Nutritionist"
      },
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        } else {
          // DO ACTION
          return res.send({
            success: true,
            message: "Good"
          });
        }
      }
    );
  });
            
  app.post("/api/account/assign", (req, res, next) => {
    // Crearmos la petición
    const { body } = req;
    // el prmer token será el ID del cliente y el token 2 el ID del nutriólogo
    const { token1, token2 } = body;
    // Verificamos que los token 1 y 2 si estén
      if (!token1) {
          return res.send({
              success: false,
              message: "Error en el Token 1"
          });
      }
      if (!token2) {
          return res.send({
              success: false,
              message: "Error en el token 2"
          });
      }
    // Buscamos a primer usuario
      User.find({
                  _id: token1
                },
          (err, users) => {
              // Si hay error nos manda mensaje noificándonos.
              if (err) {
                  return res.send({
                      success: false,
                      message: "El ususario no existe"
                  });
              }
      // si no hay error se crea un nuevo documento
      // este nuevo documento contendrá la relación entre los dos usuarios.
              
      const newCounters = Counters();
      // asignamos las constantes para rellenar los campos del documento
      newCounters.Client_id = token1;
      newCounters.Nutriologist_id = token2;
      // newcounters.diet = token3
      newCounters.save((err, user) => {
          if (err) {
              return res.send({
                  success: false,
                  message: "Error"
              });
          }
          return res.send({
              success: true,
              message: "logrado"
          });
      });
          }
      );
  });

  app.post("/api/account/createdate", (req, res, next) => {
    const {body} = req;
    const {
      name,
      startDateTime,
      endDateTime,
      classes,
      Nutriologist_id,
      pending,
    }   = body;
                    
      if (!name) {
        return res.send({
          success: false,
          message: 'Error en el nombre'
        });
      }
                    
    const newDate = new Agenda();
      newDate.name = name;
      newDate.startDateTime = startDateTime,
      newDate.endDateTime = endDateTime,
      newDate.classes = classes;
      newDate.Nutriologist_id = Nutriologist_id;
      newDate.pending=pending;
      newDate.save((err, user) => {
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

  app.get("/api/account/removedate", (req, res, next) => {
    Agenda.findOneAndDelete({_id: req.query.token}, function(err) {
      if (err)
        res.send({success: false, message: 'Error: '+err});
      res.json({ success: true, message: 'Date deleted!' })
    });
  });

  app.get('/api/accounts/GetUserFromUserSession',(req,res,next)=>{
    UserSession.findOne({_id:req.query.token }, (err, doc)  => {
      if(err)
        return res.send(err);
      else
        return res.send(doc);
    });
  });

  app.get('/api/accounts/IsNutritionist', (req, res, next) => {
    const {query} = req;
    const {token} = query;
            
    User.find({
        _id: token,
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
};
