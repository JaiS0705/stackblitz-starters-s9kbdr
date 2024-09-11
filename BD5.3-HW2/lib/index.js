const sq = require('sequelize');
const sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD5.3-HW2/employee.sqlite',
});

module.exports = {
  DataTypes: sq.DataTypes,
  sequelize,
};
