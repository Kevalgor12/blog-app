var express = require('express');
const blogcrudcontroller = require('../controllers/blogcrudcontroller');
const multer = require('multer');
const { checkToken } = require('./middleware/authentication');
var router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/files')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
});

const allowMimeType = [
    'image/jpeg',
    'image/jpg',
    'image/png'
]

const fileFilter = (req, file, cb) => {
    let isValid = false;
    if (allowMimeType.includes(file.mimetype) > -1) {
        isValid = true;
    }
    cb(null, isValid);
}

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
});

/* GET home page. */
router.get('/', blogcrudcontroller.welcomemessage);

/* GET all data. */
router.get('/blogs', checkToken, blogcrudcontroller.fetchAll);

/* GET blog.ejs page. */
router.get('/userblog', checkToken, (req,res) => {
    res.render('blog');
});

/* GET particular data. */
router.get('/blogs/:blogid', checkToken, blogcrudcontroller.fetchparticular);

/* delete particular data. */
router.delete('/delete/:blogid', checkToken, blogcrudcontroller.deleteparticular);

/* insert data. */
router.post('/insert', upload.single('imagepath'), checkToken, blogcrudcontroller.insert);

/* update particular data. */
router.put('/update/:blogid', upload.single('imagepath'), checkToken, blogcrudcontroller.updateparticular);

module.exports = router;