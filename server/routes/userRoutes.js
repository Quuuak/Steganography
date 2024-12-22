const express = require('express');
const { Userregister, Userlogin, getUserDetails } = require('../controller/userController');
const router = express.Router();

router.post('/register', Userregister);
router.post('/login', Userlogin);
router.get('/details', getUserDetails);

module.exports = router;