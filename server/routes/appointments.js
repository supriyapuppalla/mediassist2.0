// server/routes/appointments.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');

router.post('/', auth, async (req, res) => {
  try {
    const { patientId, doctorName, date, notes } = req.body;
    const a = new Appointment({
      caretakerId: req.user.id,
      patientId,
      doctorName,
      date: new Date(date),
      notes
    });
    await a.save();
    res.status(201).json(a);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/', auth, async (req, res) => {
  try {
    const patientId = req.query.patientId || req.user.id;
    const items = await Appointment.find({ patientId }).sort({ date: 1 }).limit(500);
    res.json(items);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
