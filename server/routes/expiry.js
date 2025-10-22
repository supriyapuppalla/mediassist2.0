// server/routes/expiry.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Expiry = require('../models/Expiry');

router.post('/', auth, async (req, res) => {
  try {
    const { patientId, medicineName, expiryDate } = req.body;
    const e = new Expiry({
      caretakerId: req.user.id,
      patientId,
      medicineName,
      expiryDate: new Date(expiryDate)
    });
    await e.save();
    res.status(201).json(e);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/', auth, async (req, res) => {
  try {
    const patientId = req.query.patientId || req.user.id;
    const items = await Expiry.find({ patientId }).sort({ expiryDate: 1 }).limit(500);
    res.json(items);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
