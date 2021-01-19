const express = require('express');

const { initializeBot, disconnectBot } = require('../controllers/bot');

const router = express.Router();

router.get('/initialize', initializeBot);

router.get('/disconnect', disconnectBot);

module.exports = router;
