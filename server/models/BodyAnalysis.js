const mongoose = require('mongoose');
const BodyAnalysisSchema = new mongoose.Schema({
        
        id:{
            type:Number,
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
        
});

module.exports = mongoose.model('BodyAnalysis' ,BodyAnalysisSchema)