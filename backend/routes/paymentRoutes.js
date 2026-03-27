const express = require("express");
const router = express.Router();
const { createRazorpayOrder, verifyPayment } = require("../controllers/paymentController");

// Create Razorpay Order
router.post("/create-order", createRazorpayOrder);

// Verify Signature & Complete Payment
router.post("/verify-payment", verifyPayment);

module.exports = router;
