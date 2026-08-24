const express = require('express');
const router = express.Router();
const { Contact } = require('../models');
const auth = require('../middlewhere/auth');

router.post('/', async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({ message: 'Saved', id: contact.id });
});

router.get('/', auth, async (req, res) => {
  const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });
  res.json(contacts);
});

module.exports = router;