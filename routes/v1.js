const express = require('express');

const {
  exchangeCodeForTokens,
  getCodeFromTwitch,
} = require('../controllers/auth');

const router = express.Router();

// http://localhost:8888/v1/twitch/code
router.get('/twitch/code', getCodeFromTwitch);

// http://localhost:8888/v1/twitch/auth
router.get('/twitch/auth', exchangeCodeForTokens);

module.exports = router;
