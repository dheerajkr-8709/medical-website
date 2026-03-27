const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  image: { type: String, required: true },
  link: { type: String },
  isActive: { type: Boolean, default: true },
  discountText: { type: String }, // e.g. "Flat ₹500 OFF"
  minOrderValue: { type: Number }, // e.g. 1000
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);
