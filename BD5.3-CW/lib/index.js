const sq = require('sequelize');
const sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD5.3-CW/tracks.sqlite',
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
