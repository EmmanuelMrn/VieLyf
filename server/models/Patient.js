const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    
    
    Nutritionist_id:{
         type:String,
         default:''
   },
    Client_id: {
        type:String,
        default:''
   }
 });

 module.exports = mongoose.model('Patient', PatientSchema);