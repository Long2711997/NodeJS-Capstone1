const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('capstone1', 'root', '1234', {
    host: 'localhost',
    port: 3307,
    dialect: 'mysql'
})

module.exports = sequelize;