const express = require('express');

const { getCodeFromTwitch } = require('../controllers/auth');

const router = express.Router();

// http://localhost:3000/authenticate
router.get('/', getCodeFromTwitch);

module.exports = router;
