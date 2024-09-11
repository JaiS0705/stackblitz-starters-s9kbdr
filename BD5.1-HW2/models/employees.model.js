const { DataTypes, sequelize } = require('../lib/index.js');
const employees = sequelize.define('employees', {
  name: DataTypes.TEXT,
  department: DataTypes.TEXT,
  salary: DataTypes.INTEGER,
  designation: DataTypes.TEXT,
});
module.exports = { employees };
