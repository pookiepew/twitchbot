const express = require('express');

const twitch = require('../controllers/auth');

const router = express.Router();

// host.com/v1/twitch/auth
router.get('/twitch/auth', twitch.exchangeCodeForTokens);

module.exports = router;
