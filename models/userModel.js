const Sequelize = require('sequelize');
const sequelize = require('../db'); // Assuming you've set up Sequelize connection

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
    tableName: 'users',
    timestamps: false, // Disable timestamps for this example
});

module.exports = User;
