const dotenv = require('dotenv');
dotenv.config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.sync().then((result) => {
  console.log('database connected successfully....')
}).catch((err) => {
   console.log(`Error :${err}`)
});

module.exports = sequelize;