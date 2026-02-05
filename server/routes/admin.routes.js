const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

// All routes here should be protected
router.use(auth);

router.post('/metadata', adminController.updateMetadata);
router.post('/settings', adminController.updateSettings);
router.get('/stats', adminController.getStats);

module.exports = router;
