const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const verifyToken = require('../middlewares/authMiddleware');
const allowRoles = require('../middlewares/roleMiddleware');

router.post('/submit', verifyToken, allowRoles(['USER']), ratingController.submitOrUpdateRating);

module.exports = router;
