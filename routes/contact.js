const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// Public — called when someone submits your website form
router.post('/', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.status(201).json({ message: 'Saved' });
});

// Admin only — dashboard reads submissions
router.get('/', auth, async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

module.exports = router;