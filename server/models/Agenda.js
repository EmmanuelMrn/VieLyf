const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  startDateTime: {
      type: Date,
  },
  endDateTime: {
    type: Date,
  },
  classes: {
      type: String,
      default: 'color-1'
  },
    Nutriologist_id: {
      type: String,
      default: '',
  },
  pending: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: String,
  },
  createdByID: {
    type: String,
  },
  createdByEmail: {
    type: String,
  },
  requestDate: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Agenda', AgendaSchema);
