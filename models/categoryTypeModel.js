// categories.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Category_Type = sequelize.define('Category_Type', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        
    },
    category_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // user_id: {
    //     type: DataTypes.INTEGER

    // }
}, {
    tableName: 'strx_category_type',
    timestamps: false, // Disable timestamps for this example
});

module.exports = Category_Type;