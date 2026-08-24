const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  subCategory: DataTypes.STRING,
  price: { type: DataTypes.FLOAT, allowNull: false },
  originalPrice: DataTypes.FLOAT,
  discount: DataTypes.INTEGER,
  image: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  fullDescription: DataTypes.TEXT,
  features: {
    type: DataTypes.TEXT,
    get() {
      const raw = this.getDataValue('features');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('features', JSON.stringify(val || []));
    }
  },
  includes: DataTypes.TEXT,
  setupTime: DataTypes.STRING,
  rating: { type: DataTypes.FLOAT, defaultValue: 4.5 },
  ratingCount: { type: DataTypes.INTEGER, defaultValue: 0 }
});

module.exports = Product;