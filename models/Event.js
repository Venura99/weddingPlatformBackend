const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },

  template: { type: String, default: "classic" },

  groom: String,
  bride: String,
  date: String,
  location: String,

  themeColor: { type: String, default: "#d4af37" },
  musicUrl: String,

  gallery: [String],

   parents: {
    groom: String,
    bride: String
  },

  story: [
    {
      title: String,
      description: String
    }
  ],

  schedule: [
    {
      name: String,
      time: String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", EventSchema);