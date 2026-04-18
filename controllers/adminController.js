const Event = require('../models/Event');

// CREATE
exports.createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.json(event);
};

// UPDATE
exports.updateEvent = async (req, res) => {
  try {
    const updateData = {
      slug: req.body.slug,
      groom: req.body.groom,
      bride: req.body.bride,
      date: req.body.date,
      location: req.body.location,
      template: req.body.template,
      gallery: req.body.gallery || [],
      story: req.body.story || [],
      schedule: req.body.schedule || []
    };

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },   // 🔥 IMPORTANT
      { new: true }
    );

    res.json(event);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};