var express = require('express');
const blogcrudcontroller = require('../controllers/blogcrudcontroller');
var router = express.Router();
let multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/files')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
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

/* GET login page. */
router.get('/login', blogcrudcontroller.login);

/* GET signup page. */
router.get('/signup', blogcrudcontroller.signup);

/* insert new user. */
router.post('/signupuser', blogcrudcontroller.signupuser);

/* login user. */
router.get('/loginuser', blogcrudcontroller.loginuser);

/* GET all data. */
router.get('/blogs', blogcrudcontroller.fetchAll);

/* GET particular data. */
router.get('/blogs/:blogid', blogcrudcontroller.fetchparticular);

/* delete particular data. */
router.delete('/delete/:blogid', blogcrudcontroller.deleteParticular);

/* insert data. */
router.post('/insert', upload.single('imagepath'), blogcrudcontroller.insert);

/* update particular data. */
router.put('/update/:blogid', upload.single('imagepath'), blogcrudcontroller.updateparticular);

module.exports = router;
