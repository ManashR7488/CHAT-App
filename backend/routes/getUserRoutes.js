const express = require('express');
const getUser = require('../controllers/getUser');
const { isLoggedIn } = require('../middleware/isLoggedIn');

const router = express.Router();

router.route('/').post(getUser);


module.exports = router;