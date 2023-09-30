// categories.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Departments = sequelize.define('Departments', {
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
    // user_id: {
    //     type: DataTypes.INTEGER

    // }
}, {
    tableName: 'strx_departments',
    timestamps: false, // Disable timestamps for this example
});

module.exports = Departments;