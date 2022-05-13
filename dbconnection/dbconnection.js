const Sequelize = require('sequelize');

const sequelize = new Sequelize('blogapi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.sync().then((result) => {
  console.log('database connected successfully....')
}).catch((err) => {
   console.log(`Error :${err}`)
});

module.exports = sequelize;