const mysqlConnection = require('../dbconnection');

module.exports = {
    fetchAll: (result) => {
        mysqlConnection.query('SELECT * FROM blog', (err, rows, fields) => {
            if (!err) {
                result(rows);
            }
            else {
                result(err);
            }
        })
    },
    fetchparticular: (blogid, result) => {
        mysqlConnection.query('SELECT * FROM blog WHERE blogId = ?', blogid, (err, rows, fields) => {
            if (!err) {
                result(rows);
            }
            else {
                result(err);
            }
        })
    },
    deleteparticular: (blogid, result) => {
        mysqlConnection.query('DELETE FROM blog WHERE blogId = ?', blogid, (err, rows, fields) => {
            if (!err) {
                result(`${blogid} deleted succesfully`);
            }
            else {
                result(err);
            }
        })
    },
    insert: (newblog, result) => {
        mysqlConnection.query('INSERT INTO blog SET ?', newblog, (err, rows, fields) => {
            if (!err) {
                result("new blog inserted succesfully");
            }
            else {
                result(err);
            }
        })
    },
    updateparticular: (newblog, result) => {
        mysqlConnection.query(`UPDATE blog SET title = ?, imagepath = ?, description = ?, publisheddate = ?, author = ? WHERE blogId = ?`, newblog, (err, rows, fields) => {
            if (!err) {
                result(`${newblog[5]} blog updated succesfully`);
            }
            else {
                result(err);
            }
        })
    }
}