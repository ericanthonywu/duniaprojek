const express = require('express');
const router = express.Router();

const auth = require('../controller/auth/ownerAuth')

router.post('/register',auth.registerOwner);
router.post('/login',auth.loginOwner);
router.post('/verify_email',auth.verifyOwner);

module.exports = router;
