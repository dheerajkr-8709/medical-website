const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Auth/Register
router.post('/login', userController.loginOrRegister);

// Cart Sync
router.post('/syncCart', userController.syncCart);
router.get('/:userId/cart', userController.getCart);
router.delete('/:userId/cart', userController.clearCart);

module.exports = router;
