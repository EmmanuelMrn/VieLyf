const mongoose = require('mongoose');

const BodyAnalysisSchema = new mongoose.Schema({
        
        id:{
            type:String,
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
        
});

module.exports = mongoose.model('BodyAnalysis' ,BodyAnalysisSchema)