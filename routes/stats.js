const express = require('express');
const router = express.Router();
const { Product, Contact, sequelize } = require('../models');
const auth = require('../middlewhere/auth');

router.get('/', auth, async (req, res) => {
  const totalProducts = await Product.count();
  const totalContacts = await Contact.count();
  const byCelebration = await Contact.findAll({
    attributes: ['celebration', [sequelize.fn('COUNT', sequelize.col('celebration')), 'count']],
    group: ['celebration']
  });
  res.json({ totalProducts, totalContacts, byCelebration });
});

module.exports = router;