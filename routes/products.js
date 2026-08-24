const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error('Fetch products error:', err.message);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Create product error:', err.message);
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    console.error('Update product error:', err.message);
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Delete product error:', err.message);
    res.status(400).json({ message: err.message });
  }
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// POST /api/products/upload-image  (admin only)
router.post('/upload-image', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image file provided' });

    const b64 = req.file.buffer.toString('base64');
    const dataUri = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'dazzle2bliss/products'
    });

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    res.status(500).json({ message: 'Image upload failed' });
  }
});

module.exports = router;