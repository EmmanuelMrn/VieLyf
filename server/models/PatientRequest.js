const mongoose = require('mongoose');

const PatientRequestSchema = new mongoose.Schema({
    
    
    Nutritionist_id:{
         type:String,
         default:''
   },
    Client_id: {
        type:String,
        default:''
   },
   Status:{
        type:String,
        default:'stand by'
   }
 });

 module.exports = mongoose.model('PatientRequest', PatientRequestSchema);