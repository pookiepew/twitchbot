const express = require('express');

const { initializeBot } = require('../controllers/bot');

const router = express.Router();

// http://localhost/bot/initialize
router.get('/initialize', initializeBot);

module.exports = router;
