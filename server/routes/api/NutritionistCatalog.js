const User = require('../../models/User');
//const UserSession = require('../../models/UserSession');
const BodyAnalysis = require('../../models/BodyAnalysis');
module.exports=(app) => {
app.get('/api/accounts/nutritionistcatalog',(req,res,next)=>{
    //get the chart Id
    const {query}=req;
    const {chart}=query;
  //  return res.send
  
   User.findOne({ }, (err, doc)  => {
    //console.log(doc); 
    // if(err)
    // return res.send(err);
   
    return res.json(doc);
   });

});
}