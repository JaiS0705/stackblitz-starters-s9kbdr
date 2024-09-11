const { DataTypes, sequelize } = require('../lib/index.js');
const user = sequelize.define('user', {
  username: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
  },
});

module.exports = { user };
