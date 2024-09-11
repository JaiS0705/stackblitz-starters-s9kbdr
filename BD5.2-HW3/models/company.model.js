const { DataTypes, sequelize } = require('../lib/index.js');
const company = sequelize.define('companies', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: DataTypes.TEXT,
  industry: DataTypes.TEXT,
  foundedYear: DataTypes.INTEGER,
  headquarters: DataTypes.TEXT,
  revenue: DataTypes.INTEGER,
});

module.exports = { company };
