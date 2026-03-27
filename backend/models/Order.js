const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  landmark: { type: String },
  items: [{
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
    name: String,
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['COD', 'UPI'], default: 'COD' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  status: { type: String, enum: ['Placed', 'Packed', 'Out for Delivery', 'Delivered', 'Cancelled'], default: 'Placed' },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  distance: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
