const express = require("express");
const router = express.Router();
const Rsvp = require("../models/Rsvp");

// ✅ CREATE RSVP
router.post("/", async (req, res) => {
  try {
    const { name, phone, attending, eventId, guestCount } = req.body;

    // 🔍 DEBUG (optional - remove later)
    console.log("RSVP DATA:", req.body);

    const rsvp = new Rsvp({
      name,
      phone,
      attending,
      eventId,

      // ✅ FIX: ensure saved
      guestCount: guestCount ? Number(guestCount) : 1
    });

    await rsvp.save();

    res.json(rsvp);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});


// ✅ GET RSVPS BY EVENT (for dashboard later)
router.get("/:eventId", async (req, res) => {
  try {
    const data = await Rsvp.find({ eventId: req.params.eventId })
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;