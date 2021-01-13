const express = require('express');

const { exchangeCodeForTokens } = require('../controllers/auth');

const router = express.Router();

router.get( '/twitch/auth', exchangeCodeForTokens );

module.exports = router;