const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');

router.post('/events', admin.createEvent);
router.put('/events/:id', admin.updateEvent);
router.get('/events', admin.getEvents);

module.exports = router;