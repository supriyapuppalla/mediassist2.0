// server/routes/emergency.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Emergency = require('../models/Emergency');

router.post('/', auth, async (req, res) => {
  try {
    const { patientId, message } = req.body;
    const em = new Emergency({ caretakerId: req.user.id, patientId, message });
    await em.save();
    // (optionally push notifications via Firebase here)
    res.status(201).json(em);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/', auth, async (req, res) => {
  try {
    const patientId = req.query.patientId || req.user.id;
    const items = await Emergency.find({ patientId }).sort({ createdAt: -1 }).limit(100);
    res.json(items);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
