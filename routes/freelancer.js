const express = require('express');
const router = express.Router();

const auth = require('../controller/auth/freelancerAuth')

router.post('/register',auth.registerFreelancer);
router.post('/login',auth.loginFreelancer);
router.post('/verify_email',auth.verifyFreelancer);

module.exports = router;
