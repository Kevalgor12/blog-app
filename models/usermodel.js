const Sequelize = require('sequelize');
const sequelize = require('../dbconnection/dbconnection');
const user = sequelize.define('user', {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    }
},
{
    freezeTableName: true,
    timestamps: false
});

module.exports = user;