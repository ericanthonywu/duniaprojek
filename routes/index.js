const express = require('express');
const router = express.Router();

const auth = require('../controller/auth')

router.post('/register_freelancer',auth.registerFreelancer);

module.exports = router;
