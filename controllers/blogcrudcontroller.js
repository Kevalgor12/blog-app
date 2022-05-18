// using sequelize

const dotenv = require('dotenv');
dotenv.config();
const blogmodel = require('../models/blogmodel');
const usermodel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt);
        usermodel.create({
            username: req.body.username,
            email: req.body.email.toLowerCase(),
            mobile: req.body.mobile,
            password: password
        }).then(() => {
            res.status(200).json({
                msg: "user insert successfully!!!"
            });
        }).catch((err) => {
            if (err) {
                res.status(406).json({ error: "insertion failed." });
            }
        });
    },
    loginuser: async (req, res) => {
        let userexistance = await usermodel.findOne({
            where: {
                email: req.body.email
            }
        })
        if (userexistance) {
            const password_valid = bcrypt.compareSync(req.body.password, userexistance.password);
            if (password_valid) {
                const user = {
                    userId: userexistance.userId,
                    username: userexistance.username,
                    email: userexistance.email,
                    password: userexistance.password
                }
                const token = jwt.sign(user, process.env.SECRET);
                return res.status(200)
                .cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + (24*60*60*1000)) })
                .json({ message: "User login successful." });
            } else {
                res.status(401).json({ error: "password incorrect." });
            }
        }
    },
    fetchAll: (req, res) => {
        blogmodel.findAll().then((result) => {
            res.send(result);
        }).catch((err) => {
            if (err) {
                res.status(400).json({ error: "error occured in fetching data." });
            }
        });
    },
    fetchparticular: (req, res) => {
        blogmodel.findAll({ where: { blogId: req.params.blogid } }).then((result) => {
            res.send(result);
        }).catch((err) => {
            if (err) {
                res.status(400).json({ error: "error occured in fetching data." });
            }
        });
    },
    deleteparticular: (req, res) => {
        blogmodel.destroy({ where: { blogId: req.params.blogid } }).then((result) => {
            res.status(200).json({
                msg: `${req.params.blogid} deleted successfully.`
            });
        }).catch((err) => {
            if (err) {
                res.status(400).json({ error: "error occured in deleting data." });
            }
        });
    },
    insert: (req, res) => {
        blogmodel.create({
            title: req.body.title,
            imagepath: req.file.path,
            description: req.body.description,
            publisheddate: req.body.publisheddate,
            author: req.body.author
        }).then(() => {
            res.status(200).json({
                msg: 'inserted successfully.'
            });
        }).catch((err) => {
            if (err) {
                res.status(402).json({ error: "insertion failed." });
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
            res.status(200).json({
                msg: `${req.params.blogid} updated successfully.`
            });
        }).catch((err) => {
            if (err) {
                res.status(400).json({ error: "error occured in updating data." });
            }
        });
    }
}