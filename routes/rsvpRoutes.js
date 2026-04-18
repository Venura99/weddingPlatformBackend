const express = require("express");
const router = express.Router();
const Rsvp = require("../models/Rsvp");

// Submit RSVP
router.post("/", async (req, res) => {
  try {
    const rsvp = new Rsvp(req.body);
    await rsvp.save();
    res.json(rsvp);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;