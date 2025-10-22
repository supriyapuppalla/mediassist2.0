const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const auth = require('../middleware/auth');

// POST /api/reminders → caretaker adds reminder for a patient
router.post('/', auth, async (req, res) => {
  try {
    const { patientId, medicineName, time } = req.body;
    console.log('Received data:', { patientId, medicineName, time, caretakerId: req.user.id });
    const reminder = new Reminder({
      patientId,
      medicineName,
      time,
      caretakerId: req.user.id
    });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/reminders/:patientId → get all reminders for a specific patient
// router.get('/:patientId', auth, async (req, res) => {
//   try {
//     const reminders = await Reminder.find({ patientId: req.params.patientId });
//     res.json(reminders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// GET /api/reminders → all reminders for logged-in caretaker
router.get('/', auth, async (req, res) => {
  try {
    const reminders = await Reminder.find({ caretakerId: req.user.id }).populate('patientId', 'name email');
    res.json(reminders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
