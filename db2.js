const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('cac_2022', 'root', '', {
    host: 'localhost',
    port: 3306, //deafult port
    dialect: 'mysql'
});

module.exports = sequelize;
