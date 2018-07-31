const User = require('../../models/User');
const BodyAnalysis = require('../../models/BodyAnalysis');
const PatientRequest = require('../../models/PatientRequest');
module.exports=(app) => {

  app.get('/api/accounts/nutritionistcatalog',(req,res,next)=>{
    //get the chart Id
    const {query}=req;
    const {chart}=query;
    
    User.find({'Role':'Nutritionist'}, (err, doc)  => {
      return res.json(doc);
    });
  });

  app.post('/api/accounts/newPatientRequest', (req,res) =>{
    const { body } = req;
    const {
        Nutritionist_id,
        Client_id
    } = body;
         
    const newPatientRequest = new PatientRequest();
    newPatientRequest.Nutritionist_id=Nutritionist_id;
    newPatientRequest.Client_id=Client_id;
                
    newPatientRequest.save((err,nPatient)=>{
        if(err){
            return  res.send({
                success:false,
                message:'Error',
            });
        }else{
            return  res.send({
                success:true,
                message:'Information PatientRequest captured',
            });
        }
    });
  });
}