const { DataTypes, sequelize } = require('../lib/index.js');
const employee = sequelize.define('employees', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: DataTypes.TEXT,
  salary: DataTypes.INTEGER,
  department: DataTypes.TEXT,
  designation: DataTypes.TEXT,
});

module.exports = {
  employee,
};
