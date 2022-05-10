const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connection created successfully.");
    }
    else {
        console.log("Connection Failed \n Error :" + JSON.stringify(err, undefined, 2));
    }
});

module.exports = mysqlConnection;