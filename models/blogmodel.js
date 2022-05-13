const Sequelize = require('sequelize');
const sequelize = require('../dbconnection/dbconnection');
const blog = sequelize.define('blog', {
    blogId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: true
    },
    imagepath: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    publisheddate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    author: {
        type: Sequelize.STRING,
        allowNull: true
    },
},
{
    freezeTableName: true,
    timestamps: false
});

module.exports = blog;