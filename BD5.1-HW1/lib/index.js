const sq = require('sequelize');
const sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD5.1-HW1/Companies.sqlite',
});
module.exports = {
  DataTypes: sq.DataTypes,
  sequelize,
};
