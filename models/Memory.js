const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({

  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },

  guestName: {
    type: String,
    required: true
  },

  message: {
    type: String,
    default: ''
  },

  imageUrl: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'approved'
  }

}, { timestamps: true });

module.exports = mongoose.model('Memory', memorySchema);