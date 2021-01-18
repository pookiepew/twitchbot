const express = require('express');

const { initializeBot } = require('../controllers/bot');

const router = express.Router();

router.get('/initialize', initializeBot);

module.exports = router;
