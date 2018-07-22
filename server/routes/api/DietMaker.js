const User = require('../../models/User');
const UserSession = require('../../models/UserSchema');
const Diet = require('../../models/Diet');
const Patient = require('../../models/Patient');
module.exports=(app) => {

 app.post('/api/accounts/newPatient', (req,res,next) =>{
    const {body } = req;
    const {
        Nutritionist_id,
        Client_id
    } = body;
         
                const newPatient = new Patient();
                newPatient.Nutritionist_id=Nutritionist_id;
                newPatient.Client_id=Client_id;
                
                newPatient.save((err,nPatient)=>{
                    if(err)
                {
                  return  res.send({
                      success:false,
                      message:'Error'
                  });
                }
                return  res.send({
                    success:true,
                    message:'Information Patient captured',
                    
                });
                });

                const newDiet = new Diet();
                newDiet.patient= newPatient._id;
                newDiet.breakfastMilk=0;
                newDiet.breakfastVeg=0;
                newDiet.breakfastFruit=0;
                newDiet.breakfastCereal=0;
                newDiet.breakfastMeat=0;
                newDiet.breakfastFat=0;
                newDiet.breakfastSugar=0;
                newDiet.lunchMilk=0;
                newDiet.lunchVeg=0;
                newDiet.lunchFruit=0;
                newDiet.lunchCereal=0;
                newDiet.lunchMeat=0;
                newDiet.lunchFat=0;
                newDiet.lunchSugar=0;
                newDiet.dinnerMilk=0;
                newDiet.dinnerVeg=0;
                newDiet.dinnerFruit=0;
                newDiet.dinnerCereal=0;
                newDiet.dinnerMeat=0;
                newDiet.dinnerFat=0;
                newDiet.dinnerSugar=0;
                newDiet.collationMilk=0;
                newDiet.collationVeg=0;
                newDiet.collationFruit=0;
                newDiet.collationCereal=0;
                newDiet.collationMeat=0;
                newDiet.collationFat=0;
                newDiet.collationSugar=0;
                newDiet.save((err,DietM)=>{
                    if(err)
                 {
                   return  res.send({
                        success:false,
                        message:'Error'
                    });
                 }
                });
})    
app.post('/api/accounts/ModifyDiet',(req,res,next) =>
    {
       var EditDiet = {breakfastMilk:req.body.breakfastMilk,
            breakfastVeg:req.body.breakfastVeg,
            breakfastFruit:req.body.breakfastFruit,
            breakfastCereal:req.body.breakfastCereal,
            breakfastMeat:req.body.breakfastMeat,
            breakfastFat:req.body.breakfastFat,
            breakfastSugar:req.body.breakfastSugar,
            lunchMilk:req.body.lunchMilk,
            lunchVeg:req.body.lunchVeg,
            lunchFruit:req.body.lunchFruit,
            lunchCereal:req.body.lunchCereal,
            lunchMeat:req.body.lunchMeat,
            lunchFat:req.body.lunchFat,
            lunchSugar:req.body.lunchSugar,
            dinnerMilk:req.body.dinnerMilk,
            dinnerVeg:req.body.dinnerVeg,
            dinnerFruit:req.body.dinnerFruit,
            dinnerCereal:req.body.dinnerCereal,
            dinnerMeat:req.body.dinnerMeat,
            dinnerFat:req.body.dinnerFat,
            dinnerSugar:req.body.dinnerSugar,
            collationMilk:req.body.collationMilk,
            collationVeg:req.body.collationVeg,
            collationFruit:req.body.collationFruit,
            collationCereal:req.body.collationCereal,
            collationMeat:req.body.collationMeat,
            collationFat:req.body.collationFat,
            collationSugar:req.body.collationSugar}
         
       
        Diet.updateOne( {"_id": req.body.tokendiet},{ $set:EditDiet},function(err, result){
            console.log("modified");
            return  res.send({
                success:true,
                message:'Modified'
            });
        });
        
    });
  
    app.get("/api/account/getUserId", (req, res, next) => {
    // Obtener el token
    const { query } = req;
    const { token } = query;
    console.log(token);
    UserSession.findOne(
      {
        //  _id: req.query.token
        _id: req.query.token
      },

      (err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        } else {
          return res.send({
            success: true,
            token
            // token: doc.userId
          });
        }
      }
    );
  });
  
    app.get("/api/account/verifyPatients", (req, res, next) => {
    // Obtener el token
    const { query } = req;
    const { useridtoken } = query;
    Patients.findOne(
      {
        Client_id: req.query.useridtoken
      },

      (err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        } else {
          //return res.send(doc.userId);
          return res.send({
            success: true,
            useridtoken: doc._id
          });
        }
      }
    );
  });

  app.get("/api/account/verifyDiets", (req, res, next) => {
    // Obtener el token
    const { query } = req;
    const { patientsidtoken } = query;
    console.log("finding diet");
    Diet.findOne(
      {
        patient: req.query.patientsidtoken
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        } else {
          //return res.send(doc.userId);
          return res.send({
            success: true,
            patientsidtoken: doc._id
          });
        }
      }
    );
  });
    
    app.get('/api/accounts/GetDiet',(req,res,next)=>{

        Diet.findOne({_id:req.query.token }, (err, doc)  => {
        if(err)
        return res.send(err);
        else
        return res.send(doc);
        });
    });
    //search patient into diet
    app.get('/api/accounts/GetPatient',(req,res,next)=>{

        Diet.findOne({patient:req.query.token }, (err, doc)  => {
        if(err)
        return res.send(err);
        else
        return res.send(doc);
        });
    });
    //search clinet into patients
    app.get('/api/accounts/GetUser',(req,res,next)=>{

        Patient.findOne({Client_id:req.query.token }, (err, doc)  => {
        if(err)
        return res.send(err);
        else
        return res.send(doc);
        });
    });
    // Search for the email of the user
    app.get('/api/account/getuseremail',(req,res,next)=>{
      console.log(req.query.token);
      User.find({Email:req.query.token }, (err, doc)  => {
      if(err)
      return res.send(err);
      else
      return res.send(doc);
      });
  });
  app.get('/api/account/getuserbyid',(req,res,next)=>{
    console.log(req.query.token);
    User.find({_id:req.query.token }, (err, doc)  => {
    if(err)
    return res.send(err);
    else
    return res.send(doc);
    });
  });
    
}
