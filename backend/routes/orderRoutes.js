const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { adminAuth } = require('../middleware/auth');

// Guest orders don't need auth
router.post('/', orderController.createOrder);

// Admin endpoints (Protected)
router.get('/', adminAuth, orderController.getOrders);
router.put('/:id', adminAuth, orderController.updateStatus);

module.exports = router;
