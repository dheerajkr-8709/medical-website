const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const { adminAuth } = require('../middleware/auth');

// Public Search
router.get('/search', medicineController.searchMedicines);
router.get('/', medicineController.getAllMedicines);
router.get('/:id', medicineController.getMedicineById);

// Admin Routes (Protected)
router.post('/', adminAuth, medicineController.createMedicine);
router.put('/:id', adminAuth, medicineController.updateMedicine);
router.delete('/:id', adminAuth, medicineController.deleteMedicine);

module.exports = router;
