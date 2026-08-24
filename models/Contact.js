const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contact = sequelize.define('Contact', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  celebration: { type: DataTypes.STRING, allowNull: false },
  message: DataTypes.TEXT,
  source: {
    type: DataTypes.ENUM('contact_form', 'hero_form', 'product_inquiry'),
    defaultValue: 'contact_form'
  }
});

module.exports = Contact;