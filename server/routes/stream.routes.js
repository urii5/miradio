const express = require('express');
const router = express.Router();
const streamController = require('../controllers/streamController');

router.get('/metadata', streamController.getMetadata);
router.get('/history', streamController.getHistory);
router.get('/status', streamController.getStatus);
router.get('/config', streamController.getConfig);

module.exports = router;
