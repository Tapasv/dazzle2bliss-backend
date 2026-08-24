const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: String,
  price: { type: Number, required: true },
  originalPrice: Number,
  discount: Number,
  image: { type: String, required: true },
  description: String,
  fullDescription: String,
  features: [String],
  includes: String,
  setupTime: String,
  rating: { type: Number, default: 4.5 },
  ratingCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);