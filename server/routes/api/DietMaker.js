const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
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
}