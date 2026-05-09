const express = require('express');
const router = express.Router();

const multer = require('multer');

const {
  CloudinaryStorage
} = require('multer-storage-cloudinary');

const cloudinary = require('../config/cloudinary');

const Memory = require('../models/Memory');


// CLOUDINARY STORAGE
const storage = new CloudinaryStorage({

  cloudinary,

  params: async (req, file) => {

    return {

      folder: 'linkora/memories',

      allowed_formats: [
        'jpg',
        'jpeg',
        'png',
        'webp'
      ],

      transformation: [

        {
          width: 1400,
          crop: 'limit',
          quality: 'auto:good',
          fetch_format: 'auto'
        }

      ]

    };

  }

});


// MULTER
const upload = multer({
  storage
});


// UPLOAD MEMORY
router.post(
  '/upload',
  upload.single('image'),
  async (req, res) => {

    try {

      const {
        eventId,
        guestName,
        message
      } = req.body;

      if (!req.file) {

        return res.status(400).json({
          message: 'Image upload failed'
        });

      }

      const memory = new Memory({

        eventId,

        guestName,

        message,

        imageUrl: req.file.path,

        status: 'pending',

      });

      await memory.save();

      res.json({
        success: true,
        memory
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: err.message
      });

    }

  }
);


// GET MEMORIES
router.get('/:eventId', async (req, res) => {

  try {

    const memories = await Memory.find({
  eventId: req.params.eventId,
  status: 'approved'
}).sort({ createdAt: -1 });

    res.json(memories);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message
    });

  }

});

// ADMIN GET ALL MEMORIES
router.get('/admin/all/:eventId', async (req, res) => {

  try {

    const memories = await Memory.find({
  eventId: req.params.eventId,
//   status: 'approved'
}).sort({ createdAt: -1 });

    res.json(memories);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message
    });

  }

});


// APPROVE MEMORY
router.put('/approve/:id', async (req, res) => {

  try {

    const memory = await Memory.findByIdAndUpdate(

      req.params.id,

      {
        status: 'approved'
      },

      {
        new: true
      }

    );

    res.json(memory);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message
    });

  }

});


// DELETE MEMORY
router.delete('/:id', async (req, res) => {

  try {

    await Memory.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;