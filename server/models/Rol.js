const mongoose = require('mongoose')
const Rol = new mongoose.Schema({
    Tipo: {
      type: String,
      default: 'Cliente'
    },
});  
module.exports = mongoose.model('Rol', Rol);