const express = require('express');
const router = express.Router();

const auth = require('../controller/auth')

router.post('/register',auth.registerFreelancer);
router.post('/login',auth.loginFreelancer);
router.post('/verify',auth.registerFreelancer);

module.exports = router;
