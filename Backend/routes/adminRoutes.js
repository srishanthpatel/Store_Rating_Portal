const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const allowRoles = require('../middlewares/roleMiddleware');
const adminController = require('../controllers/adminController');

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
  '/admins',
  verifyToken,
  allowRoles(['ADMIN']),
  adminController.addAdmin
);
router.post(
  '/users',
  verifyToken,
  allowRoles(['ADMIN']),
  adminController.adduser
);
router.post(
  '/owners',
  verifyToken,          
  allowRoles(['ADMIN']),
  adminController.addOwner
);

router.get('/summary', verifyToken, allowRoles(['ADMIN']), adminController.getSummary);
router.get('/stores',  verifyToken, allowRoles(['ADMIN']), adminController.getAllStores);
router.get('/users',  verifyToken, allowRoles(['ADMIN']), adminController.getAllUsers);




module.exports = router;
