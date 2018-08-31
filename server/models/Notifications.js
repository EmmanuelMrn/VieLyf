const mongoose = require('mongoose');

const NotificationsSchema = new mongoose.Schema({
  text: {
      type: String,
  },
  ref: {
      type: String,  
  },
  date: {
      type: Date,
      default: new Date()
  },
  from: {
      type: String,
  },
  to: {
      type: String
  }, 
  title: {
      type: String,
      default: "Message from VieLyf"
  }
});

module.exports = mongoose.model('Notifications', NotificationsSchema);
