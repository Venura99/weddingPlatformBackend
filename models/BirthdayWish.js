const mongoose = require('mongoose');

const birthdayWishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  department: {
    type: String,
    default: '',
    trim: true
  },

  message: {
    type: String,
    required: true,
    trim: true
  },

  imageUrl: {
    type: String,
    default: ''
  },

  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'approved'
  }

}, { timestamps: true });

module.exports = mongoose.model('BirthdayWish', birthdayWishSchema);
