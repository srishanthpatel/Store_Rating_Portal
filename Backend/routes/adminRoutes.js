const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const allowRoles = require('../middlewares/roleMiddleware');
const adminController = require('../controllers/adminController');

// Only accessible by Admins
router.get(
  '/users',
  verifyToken,
  allowRoles(['ADMIN']),
  adminController.getAllUsers
);
router.post(
  '/stores',
  verifyToken,
  allowRoles(['ADMIN']),
  adminController.addStore
);
router.post(
  '/owners',
  verifyToken,          // makes sure caller is logged in
  allowRoles(['ADMIN']),// makes sure caller is an Admin
  adminController.addOwner
);
// adminRoutes.js — should contain BOTH routes
router.get('/summary', verifyToken, allowRoles(['ADMIN']), adminController.getSummary);
router.get('/stores',  verifyToken, allowRoles(['ADMIN']), adminController.getAllStores);
router.get('/users',  verifyToken, allowRoles(['ADMIN']), adminController.getAllUsers);


module.exports = router;
