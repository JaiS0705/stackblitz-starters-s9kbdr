const { DataTypes, sequelize } = require('../lib/index.js');
const companies = sequelize.define('companies', {
  name: DataTypes.TEXT,
  industry: DataTypes.TEXT,
  founded_year: DataTypes.INTEGER,
  headquarters: DataTypes.TEXT,
  revenue: DataTypes.INTEGER,
  employee_count: DataTypes.INTEGER,
});
module.exports = {
  companies,
};
