const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String }, // Optional
  address: {
    street: { type: String },
    city: { type: String, default: 'Sitamarhi' },
    state: { type: String, default: 'Bihar' },
    zip: { type: String, default: '843328' },
  },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  lastLogin: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
