const express = require('express');
const { registerUser, loginUser, allUsers } = require('../controllers/userControllers');
const { isLoggedIn } = require('../middleware/isLoggedIn');

const router = express.Router();

router.route('/').post(registerUser).get(isLoggedIn, allUsers);
router.route('/signIn').post(loginUser);


module.exports = router;