var Sequelize = require('sequelize');

var connection = new Sequelize('scraped-data', 'root', 'root', {
    host: 'localhost',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    dialect: 'mysql'
});

module.exports = { connection };