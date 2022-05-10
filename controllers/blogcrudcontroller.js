const blogcrudmodel = require('../models/blogcrudmodel');

module.exports = {
    welcomemessage: (req, res) => {
        res.render('index', { title: 'Express' });
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
            imagepath: req.body.imagepath,
            description: req.body.description,
            publisheddate: req.body.publisheddate,
            author: req.body.author
        };
        blogcrudmodel.insert(newblog, (result) => {
            res.send(result);
        })
    },
    updateparticular: (req, res) => {
        let newblog = [
            req.body.title,
            req.body.imagepath,
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