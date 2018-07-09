const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  startDateTime: {
      year: {type: Number},
      month: {type: Number},
      Day: {type: Number},
      Hour: {type: Number},
      Minutes: {type: Number},
  },
  endDateTime: {
    year: {type: Number},
    month: {type: Number},
    Day: {type: Number},
    Hour: {type: Number},
    Minutes: {type: Number},
},
classes: {
    type: String,
    default: 'color-1'
},
  Nutriologist_id: {
    type: String,
    default: '',
  }
});

module.exports = mongoose.model('Agenda', AgendaSchema);
