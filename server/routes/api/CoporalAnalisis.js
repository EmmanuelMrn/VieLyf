const User = require('../../models/User');
//const UserSession = require('../../models/UserSession');
const BodyAnalysis = require('../../models/BodyAnalysis');
module.exports=(app) => {

 app.post('/api/accounts/AnalysisFill', (req,res,next) =>{
    const {body } = req;
    const {
        id,
        Height,
        Weight,
        Age,
        FatFreeBodyMass,
        LeanSoftTissue,
        TotalBodyWater,
        FFBMBodyFat,
        LSTBodyFat,
        LSTMineral,
        TBWProtein,
        TBWMineral,
        TBWBodyFat

        }= body;
       
         if(!id)
         {
             return res.send({
                 success:false,
                 message:'Error: Email  not found'
             });
         }
         if(!Height)
         {
            return  res.send({
                 success:false,
                 message:'Error: height  not found'
             });
         }
         if(!Weight)
         {
            return  res.send({
                 success:false,
                 message:'Error: weight  not found'
             });
         }
         if(!Age)
         {
            return  res.send({
                 success:false,
                 message:'Error: age  not found'
             });
         }
         if(!FatFreeBodyMass)
         {
            return  res.send({
                 success:false,
                 message:'Error: FatFreeBodyMass  not found'
             });
         }
         if(!LeanSoftTissue)
         {
            return  res.send({
                 success:false,
                 message:'Error: LeanSoftTissue  not found'
             });
         }
         if(!TotalBodyWater)
         {
            return  res.send({
                 success:false,
                 message:'Error: TotalBodyWater  not found'
             });
         }
         if(!FFBMBodyFat)
         {
            return  res.send({
                 success:false,
                 message:'Error: FFBMBodyFat  not found'
             });
         }
         if(!LSTBodyFat )
         {
            return  res.send({
                 success:false,
                 message:'Error: LSTBodyFat  not found'
             });
         }
         if(!LSTMineral)
         {
            return  res.send({
                 success:false,
                 message:'Error: LSTMineral  not found'
             });
         }
         if(!TBWProtein)
         {
            return  res.send({
                 success:false,
                 message:'Error: TBWProtein  not found'
             });
         }
         if(!TBWMineral)
         {
            return  res.send({
                 success:false,
                 message:'Error: TBWMineral  not found'
             });
         }
         if(!TBWBodyFat)
         {
            return  res.send({
                 success:false,
                 message:'Error: TBWBodyFat  not found'
             });
         }

         User.find({
             id:id
         },(err,previousUsers)=>{
            if(err)
            {
               return  res.send('Error:Server error');
            }
            // else if (previousUsers.length==0)
            else
            {
            //    return  res.send('Error: Account already exists.');

                const newCopA = new BodyAnalysis();
                newCopA.id = id;
                newCopA.Age = Age;
                newCopA.Height=Height;
                newCopA.Weight=Weight;
                newCopA.FatFreeBodyMass = FatFreeBodyMass;
                newCopA.LeanSoftTissue = LeanSoftTissue;
                newCopA.TotalBodyWater = TotalBodyWater;
                newCopA.FFBMBodyFat = FFBMBodyFat;
                newCopA.LSTBodyFat = LSTBodyFat;
                newCopA.LSTMineral = LSTMineral;
                newCopA.TBWProtein = TBWProtein;
                newCopA.TBWMineral = TBWMineral;
                newCopA.TBWBodyFat = TBWBodyFat;
                newCopA.save((err,CopA)=>{
                    if(err)
                 {
                   return  res.send({
                        success:false,
                        message:'Error: First Name not found'
                    });
                 }
                return  res.send({
                    success:true,
                    message:'Information captured'
                });
                });
            }
         })
         

 })   
 app.get('/api/accounts/graphs',(req,res,next)=>{
     //get the chart Id
     const {query}=req;
     const {chart}=query;
   //  return res.send
   
    BodyAnalysis.findOne({ _id:chart }, (err, doc)  => {
     //console.log(doc); 
     return res.send(doc);
    });
 
 });
 
}