const { DataTypes, sequelize } = require('../lib/index.js');
const tracks = sequelize.define('tracks', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  release_year: DataTypes.INTEGER,
  artist: DataTypes.TEXT,
  album: DataTypes.TEXT,
  duration: DataTypes.INTEGER,
});
console.log('tracks-->', tracks);
module.exports = {
  tracks,
};
