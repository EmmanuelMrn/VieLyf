const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
module.exports = (app) => {
    // app.get('/api/counters', (req, res, next) => {
    //   Counter.find()
    //     .exec()
    //     .then((counter) => res.json(counter))
    //     .catch((err) => next(err));
    // });
  
    // app.post('/api/counters', function (req, res, next) {
    //   const counter = new Counter();
  
    //   counter.save()
    //     .then(() => res.json(counter))
    //     .catch((err) => next(err));
    // });  
    
    /* Sign up */

    app.post('/api/accounts/signup',(req,res,next) => {
         const {body } = req;
         console.log('body',body);
         const {firstName,
            lastName,
            password
            }=body;
         let {email
        }=body;
         if(!firstName)
         {
             
            return  res.send({
                 success:false,
                 message:'Error: First Name not found'
             });
         }
         if(!lastName)
         {console.log(lastName)
             return res.send({
                 success:false,
                 message:'Error: Lastini Name not found'
             });
         }
         if(!email)
         {
             return res.send({
                 success:false,
                 message:'Error: Email  not found'
             });
         }
         if(!password)
         {
            return  res.send({
                 success:false,
                 message:'Error: Password  not found'
             });
         }

         email = email.toLowerCase();
         //Steps
         //1 verify email doesn't exists
         //2 save
         User.find({
             email:email
         },(err,previousUsers)=>{
             if(err)
             {
                return  res.send('Error:Server error');
             }
             else if (previousUsers.length>0)
             {
                return  res.send('Error: Account already exists.');
             }
             //save new user
             const newUser = new User();
             newUser.email=email;
             newUser.firstName=firstName;
             newUser.lastName=lastName;
             newUser.password=newUser.generateHash(password);
             newUser.save((err,user)=>{
                 if(err)
                 {
                   return  res.send({
                        success:false,
                        message:'Error: First Name not found'
                    });
                 }
                return  res.send({
                    success:true,
                    message:'Signed up'
                });

             });
         });

    });
    //Signin
    app.post('/api/accounts/signin',(req,res,next) => {
        const {body } = req;
        const {firstName,
           lastName,
           password
           }=body;
        let {email
       }=body;
       if(!email)
         {
             return res.send({
                 success:false,
                 message:'Error: Email  not found'
             });
         }
         if(!password)
         {
            return  res.send({
                 success:false,
                 message:'Error: Password  not found'
             });
         }
         email=email.toLowerCase();

         User.find({
             email:email 
         },(err,users)=>{
             if(err)
             {
                 return res.send({
                    success:false,
                    message:'Error : Server error'
                 });
             }
             if(users.length!=1)
             {
                 return res.send({
                     success:false,
                     message:'Erro: Invalid error'
                 });
             }

             const user = users[0];
             if(!user.validPassword(password))
             {
                 return res.send({
                     success:false,
                     message: 'Error: Invalid'
                 });
             }
             const userSession = new UserSession();
             userSession.userId = user._id;
             userSession.save((err,doc)=>
            {
                if(err){
                    return res.send({
                        succes:false,
                        message:'Error: server error'
                    });
                }
                return res.send({
                    success:true,
                    message:'Valid sign in ',
                    token:doc._id
                });
            });
         });
    });

    app.get('/api/accounts/verify',(req,res,next) => {
        //get the token
        const {query} = req;
        const {token} = query;
        //verify the token is one of a kind and is not deleted
        UserSession.find({
            _id :token,
            isDeleted:false
        },(err,sessions) =>{
            if(err)
            {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            if(sessions.length!=1)
            {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            }else
            {
                return res.send({
                    success: true,
                    message: 'Good'
                });
            }
            
        });
    });
    app.get('/api/accounts/logout',(req,res,next) =>
    {
        const {query} = req;
        const {token} = query;
        //verify the token is one of a kind and is not deleted
        UserSession.findOneAndUpdate({
            _id :token,
            isDeleted:false
        },{
            $set:{isDeleted:true}
             
        },null, (err,sessions) =>{
            if(err)
            {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
           
             return res.send({
                    success: true,
                    message: 'Good'
                });
            
            
        });
    });
    };