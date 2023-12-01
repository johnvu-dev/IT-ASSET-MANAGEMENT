// Tickets.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tickets = sequelize.define('Tickets', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        
    },
    issue: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    // user_id: {
    //     type: DataTypes.INTEGER

    // }
}, {
    tableName: 'strx_Tickets',
    timestamps: false, // Disable timestamps for this example
});

module.exports = Tickets;