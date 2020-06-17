const Sequelize = require('sequelize');

module.exports = new Sequelize('nodeTest', 'raphael', 'weakpass', { // Exporting this as a module to use in other files
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false});

