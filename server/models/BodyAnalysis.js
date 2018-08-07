const mongoose = require('mongoose');
<<<<<<< HEAD
const BodyAnalysisSchema = new mongoose.Schema({
        
        id:{
            type:Number,
=======

const BodyAnalysisSchema = new mongoose.Schema({
        
        id:{
            type:String,
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
            default:''
        },
        Weight:{
            type:Number,
            default:''
        },
        Height:{
            type:Number,
            default:''
        },
        Age:{
            type:Number,
            default:''
        },
        FatFreeBodyMass:{
            type:Number,
            default:''
        },
        LeanSoftTissue:{
            type:Number,
            default:''
        },
        TotalBodyWater:{
            type:Number,
            default:''
        },
        FFBMBodyFat:{
            type:Number,
            default:''
        },
        LSTBodyFat:{
            type:Number,
            default:''
        },
        LSTMineral:{
            type:Number,
            default:''
        },
        TBWProtein:{
            type:Number,
            default:''
        },
        TBWMineral:{
            type:Number,
            default:''
        },
        TBWBodyFat:{
            type:Number,
            default:''
        },
<<<<<<< HEAD
=======
        BodyMassIndex:{
            type:Number,
            default:''
        },
        BodyFat:{
            type:Number,
            default:''
        },
        FatFreeMass:{
            type:Number,
            default:''
        },
        date:{
            type:Date,
            default:''
        }
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
        
});

module.exports = mongoose.model('BodyAnalysis' ,BodyAnalysisSchema)