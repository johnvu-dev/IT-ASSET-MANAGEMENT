// Assets.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Assets = sequelize.define('Assets', {
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
    tableName: 'strx_assets',
    timestamps: false, // Disable timestamps for this example
});

module.exports = Assets;