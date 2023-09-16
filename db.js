// db.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('testdb', 'root', 'Miras2021!', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;