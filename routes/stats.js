const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const totalContacts = await Contact.countDocuments();
  const byCelebration = await Contact.aggregate([
    { $group: { _id: '$celebration', count: { $sum: 1 } } }
  ]);
  res.json({ totalProducts, totalContacts, byCelebration });
});

module.exports = router;