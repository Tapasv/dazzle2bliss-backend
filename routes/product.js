const express = require('express');
const router = express.Router();
const { Product } = require('../models');
const auth = require('../middlewhere/auth');

router.get('/', async (req, res) => {
  const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
  res.json(products);
});

router.post('/', auth, async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

router.put('/:id', auth, async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  await product.update(req.body);
  res.json(product);
});

router.delete('/:id', auth, async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  await product.destroy();
  res.json({ message: 'Deleted' });
});

module.exports = router;