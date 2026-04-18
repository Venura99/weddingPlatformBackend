const mongoose = require("mongoose");

const RsvpSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  name: String,
  phone: String,
  attending: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rsvp", RsvpSchema);