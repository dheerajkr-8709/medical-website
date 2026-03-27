const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder", 
  key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret"
});

// Create Razorpay Order
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    
    // Amount is in units (e.g. 500 for ₹500), Razorpay needs paise
    const options = {
      amount: Math.round(amount * 100), 
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    res.status(500).json({ message: "Unable to create payment order" });
  }
};

// Verify Payment Signature
exports.verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderDetails 
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "placeholder_secret")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Signature verified, save order to DB
      const newOrder = new Order({
        ...orderDetails,
        paymentStatus: "Paid",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature
      });

      const savedOrder = await newOrder.save();
      return res.status(201).json({ 
        message: "Payment Verified & Order Placed!", 
        order: savedOrder 
      });
    } else {
      return res.status(400).json({ message: "Invalid payment signature!" });
    }
  } catch (err) {
    console.error("Payment Verification Error:", err);
    res.status(500).json({ message: "Error verifying payment" });
  }
};
