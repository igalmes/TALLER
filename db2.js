const { Sequelize, Model } = require("sequelize");

const sequelize = new Sequelize('cac_2022', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;