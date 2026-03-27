const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

// Public Search
router.get('/search', medicineController.searchMedicines);
router.get('/', medicineController.getAllMedicines);
router.get('/:id', medicineController.getMedicineById);

// Admin Routes (To be protected with middleware later)
router.post('/', medicineController.createMedicine);
router.put('/:id', medicineController.updateMedicine);
router.delete('/:id', medicineController.deleteMedicine);

module.exports = router;
