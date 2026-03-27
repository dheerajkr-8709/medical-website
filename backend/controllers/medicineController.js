const Medicine = require('../models/Medicine');

// Get all medicines with filters
exports.getAllMedicines = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, status } = req.query;
    let query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const medicines = await Medicine.find(query).sort({ createdAt: -1 });
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get medicine by ID
exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Add medicine
exports.createMedicine = async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin: Update medicine
exports.updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    res.status(200).json(medicine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin: Delete medicine
exports.deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search for autocomplete suggestions
exports.searchMedicines = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(200).json([]);
    
    // Exact or partial name match
    const results = await Medicine.find({
      name: { $regex: q, $options: 'i' }
    })
      .select('name image category price discount')
      .limit(8)
      .sort({ name: 1 });
      
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
