const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Prescription = require('../models/Prescription');
const { adminAuth } = require('../middleware/auth');

// Ensure directory exists
const uploadDir = 'uploads/prescriptions';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// @route   POST api/prescriptions/upload
// @desc    Upload a new prescription
router.post('/upload', upload.single('prescription'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const prescription = new Prescription({
      phoneNumber,
      imageUrl: `/uploads/prescriptions/${req.file.filename}`,
      status: 'Pending'
    });

    await prescription.save();

    // Trigger socket.io event if needed (passing io in app.set)
    const io = req.app.get('socketio');
    if (io) {
      io.emit('newPrescription', prescription);
    }

    res.status(201).json({
      message: 'Prescription uploaded successfully',
      prescription
    });
  } catch (err) {
    console.error('Prescription Upload Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/prescriptions
// @desc    Get all prescriptions (Admin)
router.get('/', adminAuth, async (req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT api/prescriptions/:id/status
// @desc    Update prescription status
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id, 
      { status, notes }, 
      { new: true }
    );
    if (!prescription) return res.status(404).json({ message: 'Not found' });
    res.json(prescription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
