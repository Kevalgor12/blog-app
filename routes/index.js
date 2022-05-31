var express = require('express');
const usercontroller = require('../controllers/usercontroller');
var router = express.Router();

/* GET home page. */
router.get('/', usercontroller.welcomemessage);

module.exports = router;