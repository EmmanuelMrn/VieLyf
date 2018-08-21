const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ClientUnregisteredSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  Phone: {
    type: Number ,
    default: "0"
  },
  Description: {
    type: String ,
    default: ''
  },
  Nutritionist_id: {
    type: String,
    required: true
  },
  // Photo: {
  //   type: Data,
  //   default: 'Cliente'
  // },
  idDeleted: {
    type: Boolean,
    default: false
  }
});


  module.exports = mongoose.model('ClientUnregistered', ClientUnregisteredSchema);