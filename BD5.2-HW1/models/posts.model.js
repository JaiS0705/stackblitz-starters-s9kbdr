const { DataTypes, sequelize } = require('../lib/index.js');
const posts = sequelize.define('posts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: DataTypes.TEXT,
  author: DataTypes.TEXT,
  content: DataTypes.TEXT,
  title: DataTypes.TEXT,
});

module.exports = {
  posts,
};
