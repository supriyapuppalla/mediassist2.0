const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  medicineName: { type: String, required: true },
  time: { type: String, required: true },
  taken: { type: Boolean, default: false },
  caretakerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);
