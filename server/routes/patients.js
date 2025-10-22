const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient'); // check filename exactly
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

// GET all patients for logged-in caretaker
router.get('/', auth, async (req, res) => {
  try {
    const patients = await Patient.find({ caretakerId: req.user.id });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/patients to add a patient
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const patient = new Patient({ name, email, password: hashed, caretakerId: req.user.id });
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
