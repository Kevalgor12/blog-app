// using sequelize

const blogmodel = require('../models/blogmodel');

module.exports = {
    welcomemessage: (req, res) => {
        res.render('welcome');
    },
    login: (req, res) => {
        res.render('login');
    },
    signup: (req, res) => {
        res.render('signup');
    },
    // signupuser: (req, res) => {
    //     let newuser = {
    //         username: req.body.username,
    //         email: req.body.email,
    //         mobile: req.body.mobile,
    //         password: req.body.password
    //     };
    //     blogcrudmodel.signupuser(newuser, (result) => {
    //         res.send(result);
    //     })
    // },
    // loginuser: (req, res) => {
    //     blogcrudmodel.loginuser(req.body.email, req.body.password, (result) => {
    //         res.send(result);
    //     })
    // },
    fetchAll: (req, res) => {
        blogmodel.findAll().then((result) => {
            res.send(result);
        }).catch((err) => {
            if (err) {
                res.send('Error');
            }
        });
    },
    fetchparticular: (req, res) => {
        blogmodel.findAll({ where: { blogId: req.params.blogid } }).then((result) => {
            res.send(result);
        }).catch((err) => {
            if (err) {
                res.send('Error');
            }
        });
    },
    deleteparticular: (req, res) => {
        blogmodel.destroy({ where: { blogId: req.params.blogid } }).then((result) => {
            res.send(`${req.params.blogid} deleted successfully.`);
        }).catch((err) => {
            if (err) {
                res.send('Error');
            }
        });
    },
    insert: (req, res) => {
        // console.log(req.file);
        blogmodel.create({
            title: req.body.title,
            imagepath: req.file.path,
            description: req.body.description,
            publisheddate: req.body.publisheddate,
            author: req.body.author
        }).then(() => {
            res.send('inserted successfully.');
        }).catch((err) => {
            if (err) {
                res.send('Error');
            }
        });
    },
    updateparticular: (req, res) => {
        blogmodel.update({
                title: req.body.title,
                imagepath: req.file.path,
                description: req.body.description,
                publisheddate: req.body.publisheddate,
                author: req.body.author
            },
            {
                where: { blogId: req.params.blogid }
            }).then(() => {
                res.send(`${req.params.blogid} updated successfully.`);
            }).catch((err) => {
                if (err) {
                    res.send('Error');
                }
            });
    }
}