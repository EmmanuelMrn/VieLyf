const mongoose = require('mongoose');
const RolesSchema = new mongoose.Schema({
   _id: {
       type: String,
       default: ''
   },
   Role: {
       type: String,
       default: ''
   },
});

module.exports = mongoose.model('Roles', RolesSchema);
