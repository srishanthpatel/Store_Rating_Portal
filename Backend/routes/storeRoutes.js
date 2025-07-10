const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const storeController = require('../controllers/storeController');

router.get('/all', verifyToken, storeController.getAllStores);

module.exports = router;
