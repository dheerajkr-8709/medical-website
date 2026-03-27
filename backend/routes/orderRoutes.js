const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Guest orders don't need auth
router.post('/', orderController.createOrder);

// Admin endpoints (Simple admin gate, or no auth for now for speed as requested)
router.get('/', orderController.getOrders);
router.put('/:id/status', orderController.updateStatus);

module.exports = router;
