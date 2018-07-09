const mongoose = require('mongoose');
const PatientsSchema = new mongoose.Schema({
    Client_id: {
        type: String,
        default: '',
      },
      Nutriologist_id: {
        type: String,
        default: '',
      }
    });


module.exports = mongoose.model('Patients', PatientsSchema);