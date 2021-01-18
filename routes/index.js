const express = require('express');

const {
  authenticateWithTwitch,
  refreshAccessToken
} = require('../controllers/auth');

const router = express.Router();

router.get('/authenticate', authenticateWithTwitch);

router.get('/refresh-token', refreshAccessToken);

module.exports = router;
