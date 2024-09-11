const { DataTypes, sequelize } = require('../lib/index.js');
const { user } = require('./user.model.js');
const { track } = require('./track.model.js');
const like = sequelize.define('like', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: 'id',
    },
  },
  trackId: {
    type: DataTypes.INTEGER,
    reference: {
      model: track,
      key: 'id',
    },
  },
});

user.belongsToMany(track, { through: like });
track.belongsToMany(user, { through: like });

module.exports = { like };
