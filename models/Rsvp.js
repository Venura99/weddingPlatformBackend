const mongoose = require("mongoose");

const RsvpSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },

  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  // ✅ ADD THIS (IMPORTANT)
  guestCount: {
    type: Number,
    default: 1
  },

  attending: {
    type: Boolean,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Rsvp", RsvpSchema);