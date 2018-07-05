const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  Client_id: {
    type: String,
    default: '',
  },
  Nutriologist_id: {
    type: String,
    default: '',
  }
});

module.exports = mongoose.model('Counter', CounterSchema);
