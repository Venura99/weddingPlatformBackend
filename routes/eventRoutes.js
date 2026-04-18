const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Create Event
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get Event by slug
router.get("/:slug", async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    res.json(event);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;