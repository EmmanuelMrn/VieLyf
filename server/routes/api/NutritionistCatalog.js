const User = require ('../../models/User');
module.exports = (app) => {

    app.get('/api/account/nutritionistCatalog',(req,res,next)=>{
        User.find({},(err,doc) =>{
            if(err)
         return res.send(err);
            else
         return res.send(doc);
        });
    });

}