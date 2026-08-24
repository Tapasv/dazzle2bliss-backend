const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  celebration: { type: String, required: true },
  message: String,
  source: {
    type: String,
    enum: ['contact_form', 'hero_form', 'product_inquiry'],
    default: 'contact_form'
  }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);