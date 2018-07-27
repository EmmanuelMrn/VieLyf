const mongoose = require('mongoose');

const DietSchema = new mongoose.Schema({
   breakfastMilk: {
     type: Number,
     default:0
   },
  breakfastVeg: {
    type: Number,
    default:0
  },
  breakfastFruit: {
    type: Number,
    default:0
  },
  breakfastCereal: {
    type: Number,
    default:0
  },
  breakfastMeat: {
    type: Number,
    default:0
  },
  breakfastFat: {
    type: Number,
    default:0
  },
  breakfastSugar: {
    type: Number,
    default:0
  },
  lunchMilk:{
     type:Number,
    default:0
  },
  lunchVeg:{
     type:Number,
    default:0
  },
  lunchFruit:{
    type:Number,
   default:0
 },
 lunchCereal:{
    type:Number,
   default:0
 },
 lunchMeat:{
    type:Number,
   default:0
 },
 lunchFat:{
    type:Number,
   default:0
 },
 lunchSugar:{
    type:Number,
   default:0
 },
 dinnerMilk:{
    type:Number,
   default:0
 },
 dinnerVeg:{
    type:Number,
   default:0
 },
 dinnerFruit:{
   type:Number,
  default:0
},
dinnerCereal:{
   type:Number,
  default:0
},
dinnerMeat:{
   type:Number,
  default:0
},
dinnerFat:{
   type:Number,
  default:0
},
dinnerSugar:{
   type:Number,
  default:0
},
collationMilk:{
    type:Number,
   default:0
 },
 collationVeg:{
    type:Number,
   default:0
 },
 collationFruit:{
   type:Number,
  default:0
},
collationCereal:{
   type:Number,
  default:0
},
collationMeat:{
   type:Number,
  default:0
},
collationFat:{
   type:Number,
  default:0
},
collationSugar:{
   type:Number,
  default:0
},
patient:{
       type:String,
       default:''
   }
 });

 module.exports = mongoose.model('Diet', DietSchema);