// categories.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Locations = sequelize.define('Locations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parent_id: {
        type: DataTypes.INTEGER,
    },
    // user_id: {
    //     type: DataTypes.INTEGER

    // }
}, {
    tableName: 'strx_locations',
    timestamps: false, // Disable timestamps for this example
});

module.exports = Locations;