const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const allowRoles = require('../middlewares/roleMiddleware');
const ownerController = require('../controllers/ownerController');

// Store Owner dashboard
router.get(
  '/store/ratings',
  verifyToken,
  allowRoles(['OWNER']),
  ownerController.getStoreRatings
);

module.exports = router;
