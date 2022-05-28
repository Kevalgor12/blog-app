var express = require('express');
var router = express.Router();
const usercontroller = require("../controllers/usercontroller");

/* GET login page. */
router.get('/login', usercontroller.login);

/* GET signup page. */
router.get('/signup', usercontroller.signup);

/* insert new user. */
router.post('/signupuser', usercontroller.signupuser);

/* login user. */
router.post('/loginuser', usercontroller.loginuser);

module.exports = router;