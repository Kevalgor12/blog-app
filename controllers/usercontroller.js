const usermodel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
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
                .cookie("jwttoken", token, { httpOnly: true, expires: new Date(Date.now() + (30*60*1000)) })
                .json({ message: "User login successful." });
            }
        }
        return res.status(401).json({ error: "email or password is incorrect." });
    },
}