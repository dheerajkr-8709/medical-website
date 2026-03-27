const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Order Placed', 'Rejected'],
    default: 'Pending'
  },
  notes: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
