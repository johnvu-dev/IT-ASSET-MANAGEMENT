// db.js
/**
 * This function does connect to mysql.
 *
 * @param {type} parameters The parameters to the function.
 * @returns {type} The return value of the function.
 */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('itassetmgm', 'root', 'Miras2021!', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
