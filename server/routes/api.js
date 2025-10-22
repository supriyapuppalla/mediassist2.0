const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Models
const User = require('../models/User');
const Reminder = require('../models/Reminder');
const Appointment = require('../models/Appointment');
const Expiry = require('../models/Expiry');
const Medicine = require('../models/Medicine');

/* ---------------------- AUTHENTICATED USER INFO ---------------------- */
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/* ---------------------- REMINDERS ---------------------- */
router.post('/reminders', auth, async (req, res) => {
  try {
    const r = new Reminder({ ...req.body, caretakerId: req.user.id });
    await r.save();
    res.json(r);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/reminders', auth, async (req, res) => {
  try {
    const items = await Reminder.find({
      $or: [{ caretakerId: req.user.id }, { patientId: req.user.id }]
    }).limit(200);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------------------- APPOINTMENTS ---------------------- */
router.post('/appointments', auth, async (req, res) => {
  try {
    const a = new Appointment({ ...req.body, caretakerId: req.user.id });
    await a.save();
    res.json(a);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/appointments', auth, async (req, res) => {
  try {
    const items = await Appointment.find({
      $or: [{ caretakerId: req.user.id }, { patientId: req.user.id }]
    }).limit(200);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------------------- EXPIRY TRACKER ---------------------- */
router.post('/expiry', auth, async (req, res) => {
  try {
    const e = new Expiry({ ...req.body, caretakerId: req.user.id });
    await e.save();
    res.json(e);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/expiry', auth, async (req, res) => {
  try {
    const items = await Expiry.find({ caretakerId: req.user.id }).limit(200);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------------------- EMERGENCY ---------------------- */
router.post('/emergency', auth, async (req, res) => {
  // Placeholder for Firebase notifications
  res.json({ ok: true, message: 'Emergency alert received.' });
});

/* ---------------------- MEDICINES ---------------------- */
// Get all medicines for logged-in patient
router.get('/medicines', auth, async (req, res) => {
  try {
    const medicines = await Medicine.find({ patientId: req.user.id });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add medicine (for caretaker)
router.post('/medicines', auth, async (req, res) => {
  try {
    const { name, dosage, time, expiryDate, patientId } = req.body;
    const med = new Medicine({ name, dosage, time, expiryDate, patientId, caretakerId: req.user.id });
    await med.save();
    res.json(med);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Toggle medicine taken status
router.patch('/medicines/:id/taken', auth, async (req, res) => {
  try {
    const med = await Medicine.findById(req.params.id);
    if (!med) return res.status(404).json({ message: 'Medicine not found' });

    med.taken = !med.taken;
    await med.save();
    res.json(med);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/* ---------------------- PATIENT DASHBOARD ---------------------- */
router.get('/patients/:id/dashboard', auth, async (req, res) => {
  try {
    const patientId = req.params.id;

    const medicines = await Medicine.find({ patientId });
    const appointments = await Appointment.find({ patientId });
    const expiry = await Expiry.find({ patientId });

    res.json({ medicines, appointments, expiry });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
