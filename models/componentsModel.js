// categories.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Components = sequelize.define('Components', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location_id: {
        type: DataTypes.INTEGER,
    },
    category_id: {
        type: DataTypes.INTEGER,
    },
    user_id: {
         type: DataTypes.INTEGER

    }
}, {
    tableName: 'strx_components',
    timestamps: false, // Disable timestamps for this example
});

module.exports = Components;