const sq = require('sequelize');
const sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD5.2-HW3/company.sqlite',
});
module.exports = { DataTypes: sq.DataTypes, sequelize };
