// accessories.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Accessories = sequelize.define('Accessories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    // user_id: {
    //     type: DataTypes.INTEGER

    // }
}, {
    tableName: 'strx_accessories',
    timestamps: false, // Disable timestamps for this example
});

module.exports = Accessories;