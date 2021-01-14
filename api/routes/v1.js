const express = require('express');

const { exchangeCodeForTokens } = require('../controllers/auth');

const router = express.Router();

// http://localhost/v1/auth/code
router.get('/auth/code', exchangeCodeForTokens);

module.exports = router;
