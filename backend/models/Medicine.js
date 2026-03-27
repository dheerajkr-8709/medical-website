const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, default: 'Generic' },
  genericName: { type: String, default: '' },
  composition: { type: String, default: '' },
  category: { type: String, required: true },
  manufacturer: { type: String, default: '' },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stock: { type: Boolean, default: true },
  status: { type: String, enum: ['In Stock', 'Out of Stock'], default: 'In Stock' }, 
  prescriptionRequired: { type: Boolean, default: false },
  mfgDate: { type: String, default: '' },
  expDate: { type: String, default: '' },
  shelfLife: { type: String, default: '' },
  description: { type: String, default: 'High-quality medicine for local delivery.' },
  uses: { type: String, default: '' },
  dosage: { type: String, default: 'As prescribed' },
  sideEffects: { type: String, default: '' },
  warnings: { type: String, default: '' },
  image: { type: String, required: true },
  additionalImages: { type: [String], default: [] },
  ratings: { 
    average: { type: Number, default: 4.5 },
    count: { type: Number, default: 0 }
  }
}, { timestamps: true });

medicineSchema.index({ name: 'text', description: 'text', category: 'text', composition: 'text', brand: 'text' });

module.exports = mongoose.model('Medicine', medicineSchema);
