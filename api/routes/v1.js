const express = require('express');

const {
  authenticateWithTwitch,
  refreshAccessToken
} = require('../controllers/auth');
const { getUserDetails } = require('../controllers/user');

const router = express.Router();

// http://localhost/authenticate
router.get('/authenticate', authenticateWithTwitch);

// http://localhost/refresh-token
router.get('/refresh-token', refreshAccessToken);

// http://localhost/user twitch login username
router.get('/user', getUserDetails);

module.exports = router;
