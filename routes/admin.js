const express = require('express');
const router = express.Router();

const auth = require('../controller/auth/adminAuth')

router.post('/login',auth.login);

module.exports = router;
