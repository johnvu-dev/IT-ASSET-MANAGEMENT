// models/task.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Create and configure Sequelize instance

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
    tableName: 'tasks',
    timestamps: false, // Disable timestamps for this example
});

module.exports = Task;
