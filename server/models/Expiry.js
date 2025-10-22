// server/models/Expiry.js
const mongoose = require('mongoose');

const ExpirySchema = new mongoose.Schema({
  caretakerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  medicineName: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expiry', ExpirySchema);
