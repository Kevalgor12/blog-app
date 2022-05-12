const blogcrudmodel = require('../models/blogcrudmodel');

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
    signupuser: (req, res) => {
        let newuser = {
            username: req.body.username,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password
        };
        blogcrudmodel.signupuser(newuser, (result) => {
            res.send(result);
        })
    },
    loginuser: (req, res) => {
        blogcrudmodel.loginuser(req.body.email, req.body.password, (result) => {
            res.send(result);
        })
    },
    fetchAll: (req, res) => {
        blogcrudmodel.fetchAll((result) => {
            res.send(result);
        })
    },
    fetchparticular: (req, res) => {
        blogcrudmodel.fetchparticular(req.params.blogid, (result) => {
            res.send(result);
        });
    },
    deleteParticular: (req, res) => {
        blogcrudmodel.deleteparticular(req.params.blogid, (result) => {
            res.send(result);
        });
    },
    insert: (req, res) => {
        let newblog = {
            title: req.body.title,
            imagepath: req.file.path,
            description: req.body.description,
            publisheddate: req.body.publisheddate,
            author: req.body.author
        };
        blogcrudmodel.insert(newblog, (result) => {
            // console.log(req.file);
            res.send(result);
            // res.status(200).json(result);
        })
    },
    updateparticular: (req, res) => {
        let newblog = [
            req.body.title,
            req.file.path,
            req.body.description,
            req.body.publisheddate,
            req.body.author,
            req.params.blogid
        ];
        blogcrudmodel.updateparticular(newblog, (result) => {
            res.send(result);
        })
    }
}