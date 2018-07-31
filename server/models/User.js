const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    default: ''
  },
  LastName: {
    type: String,
    default: ''
  },
  UserName: {
    type: String,
    default: ''
  },
  Email: {
    type: String,
    default: ''
  },
  Phone: {
    type: Number ,
    default: 0
  },
  Description: {
    type: String ,
    default: ''
  },
  // Photo: {
  //   type: Data,
  //   default: 'Cliente'
  // },
  Password: {
    type: String,
    default: ''
  },
  idDeleted: {
    type: Boolean,
    default: false
  },
   Role:{
    type:String,
    default:'Client'
}


});

UserSchema.methods.generateHash = function(Password) {
    return bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null);
  };
  
  UserSchema.methods.validPassword = function(Password) {
    return bcrypt.compareSync(Password, this.Password);
  };
  module.exports = mongoose.model('User', UserSchema);