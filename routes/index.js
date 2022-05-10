var express = require('express');
const blogcrudcontroller = require('../controllers/blogcrudcontroller');
var router = express.Router();

/* GET home page. */
router.get('/', blogcrudcontroller.welcomemessage);

/* GET all data. */
router.get('/blogs', blogcrudcontroller.fetchAll);

/* GET particular data. */
router.get('/blogs/:blogid', blogcrudcontroller.fetchparticular);

/* delete particular data. */
router.delete('/blogs/:blogid', blogcrudcontroller.deleteParticular);

/* insert data. */
router.post('/blogs', blogcrudcontroller.insert);

/* update particular data. */
router.put('/blogs/:blogid', blogcrudcontroller.updateparticular);

module.exports = router;
