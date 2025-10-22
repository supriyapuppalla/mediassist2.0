const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const authMiddleware = require('../middleware/auth'); // make sure this exists

// Get all medicines for logged-in patient
router.get('/', authMiddleware, async (req, res) => {
  try {
    const patientId = req.user.id;
    const medicines = await Medicine.find({ patientId });
    res.json(medicines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle medicine taken status
router.patch('/:id/taken', authMiddleware, async (req, res) => {
  try {
    const med = await Medicine.findById(req.params.id);
    if (!med) return res.status(404).json({ message: 'Medicine not found' });

    med.taken = !med.taken;
    await med.save();

    res.json(med);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
