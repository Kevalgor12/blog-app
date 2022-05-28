// using sequelize

const dotenv = require('dotenv');
dotenv.config();
const blogmodel = require('../models/blogmodel');

module.exports = {
    welcomemessage: (req, res) => {
        res.render('welcome');
    },
    fetchAll: (req, res) => {
        blogmodel.findAll().then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(400).json({ error: err.message });
        });
    },
    fetchparticular: (req, res) => {
        blogmodel.findAll({ where: { blogId: req.params.blogid } }).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(400).json({ error: err.message });
        });
    },
    deleteparticular: (req, res) => {
        blogmodel.destroy({ where: { blogId: req.params.blogid } }).then(() => {
            res.status(200).json({
                msg: `${req.params.blogid} deleted successfully.`
            });
        }).catch((err) => {
            res.status(400).json({ error: err.message });
        });
    },
    insert: (req, res) => {
        const {title, description, publisheddate, author} = req.body;
        const {path: imagepath} = req.file;
        // console.log(req.file);
        blogmodel.create({
            title,
            imagepath,
            publisheddate,
            author,
            description
        }).then(() => {
            res.status(200).json({
                msg: 'inserted successfully.'
            });
        }).catch((err) => {
            res.status(400).json({ error: err.message });
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
            res.status(400).json({ error: err.message });
        });
    }
}