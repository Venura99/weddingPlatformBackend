const express = require('express');
const router = express.Router();
const BirthdayWish = require('../models/BirthdayWish');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'birthday-wishes',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, quality: 'auto', fetch_format: 'auto' }]
  }
});

const upload = multer({ storage });

// POST /api/birthday-wishes  — submit a wish (photo optional)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, department, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required.' });
    }

    const wish = new BirthdayWish({
      name,
      department: department || '',
      message,
      imageUrl: req.file ? req.file.path : ''
    });

    await wish.save();
    res.status(201).json(wish);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// GET /api/birthday-wishes  — fetch all approved wishes (public display)
router.get('/', async (req, res) => {
  try {
    const wishes = await BirthdayWish.find({ status: 'approved' })
      .sort({ createdAt: -1 });
    res.json(wishes);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET /api/birthday-wishes/admin/all  — fetch every wish for admin panel
router.get('/admin/all', async (req, res) => {
  try {
    const wishes = await BirthdayWish.find().sort({ createdAt: -1 });
    res.json(wishes);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT /api/birthday-wishes/approve/:id  — approve a pending wish
router.put('/approve/:id', async (req, res) => {
  try {
    const wish = await BirthdayWish.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );

    if (!wish) return res.status(404).json({ error: 'Wish not found.' });
    res.json(wish);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/birthday-wishes/:id  — remove a wish
router.delete('/:id', async (req, res) => {
  try {
    const wish = await BirthdayWish.findByIdAndDelete(req.params.id);
    if (!wish) return res.status(404).json({ error: 'Wish not found.' });
    res.json({ message: 'Wish deleted.' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
