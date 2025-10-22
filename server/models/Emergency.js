// server/models/Emergency.js
const mongoose = require('mongoose');

const EmergencySchema = new mongoose.Schema({
  caretakerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // caretaker who sent (optional)
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  message: { type: String, default: 'Emergency alert' },
  handled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Emergency', EmergencySchema);
