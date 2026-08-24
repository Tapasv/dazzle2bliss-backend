const sequelize = require('../config/db');
const Product = require('./Product');
const Contact = require('./Contact');

const syncDB = async () => {
  await sequelize.authenticate();
  console.log('MySQL connected');
  await sequelize.sync(); // creates tables if they don't exist
  console.log('Tables synced');
};

module.exports = { sequelize, Product, Contact, syncDB };