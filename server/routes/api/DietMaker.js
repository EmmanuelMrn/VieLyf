const User = require('../../models/User');
const UserSession = require('../../models/UserSchema');
const Diet = require('../../models/Diet');
const PatientRequest = require('../../models/PatientRequest');
module.exports=(app) => {

 app.post('/api/accounts/newPatientRequest', (req,res,next) =>{
    const {body } = req;
    const {
        Nutritionist_id,
        Client_id
    } = body;
         
                const newPatientRequest = new PatientRequest();
                newPatientRequest.Nutritionist_id=Nutritionist_id;
                newPatientRequest.Client_id=Client_id;
                
                newPatientRequest.save((err,nPatient)=>{
                    if(err)
                 {
                   return  res.send({
                        success:false,
                        message:'Error'
                    });
                 }else{
                  return  res.send({
                    success:true,
                    message:'Information PatientRequest captured',
                });
                 }
    
                
                });
});

app.put('/api/accounts/ModifyStatus',(req,res,next) =>
    {
       var EditStatus = {Status:req.body.status}
       
        PatientRequest.updateOne( {"_id": req.body.PatientRequest_id},{ $set:EditStatus},function(err, result){
            if(req.body.status == "acepted"){
                const newDiet = new Diet();
                newDiet.patient= req.body.PatientRequest_id;
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
                 }else{
                  return  res.send({
                    success:true,
                    message:'Added'
                });
                 }
                });
            }else{
              console.log("you've not been acepted")
            }
            if(err)
                 {
                   return  res.send({
                        success:false,
                        message:'Error'
                    });
                 }else{
                  return  res.send({
                    success:true,
                    message:'Added'
                });
                 }
        });
    });


app.put('/api/accounts/ModifyDiet',(req,res,next) =>
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
    
app.get('/api/accounts/GetUser',(req,res,next)=>{

        PatientRequest.findOne({Client_id:req.query.token,Status:"acepted"}, (err, doc)  => {
        if(err)
        return res.send(err);
        else
        return res.send(doc);
        });
    });
    //search patient into diet ???????
app.get('/api/accounts/GetPatient',(req,res,next)=>{

        Diet.findOne({patient:req.query.token }, (err, doc)  => {
        if(err)
        return res.send(err);
        else
        return res.send(doc);
        });
    });
    
}
