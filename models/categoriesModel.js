// categories.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Categories = sequelize.define('Categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // user_id: {
    //     type: DataTypes.INTEGER

    // }
}, {
    tableName: 'strx_categories',
    timestamps: false, // Disable timestamps for this example
});

module.exports = Categories;