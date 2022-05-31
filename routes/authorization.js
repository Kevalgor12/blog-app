var express = require('express');
var router = express.Router();
const authorizationcontroller = require("../controllers/authorizationcontroller");

/* GET login page. */
router.get('/login', authorizationcontroller.login);

/* GET signup page. */
router.get('/signup', authorizationcontroller.signup);

/* insert new user. */
router.post('/signupuser', authorizationcontroller.signupuser);

/* login user. */
router.post('/loginuser', authorizationcontroller.loginuser);

module.exports = router;