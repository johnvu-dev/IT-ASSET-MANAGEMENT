// employees.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Employees = sequelize.define('Employees', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'employees',
    timestamps: false, // Disable timestamps for this example
});

module.exports = Employees;