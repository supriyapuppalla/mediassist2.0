const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  time: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  taken: { type: Boolean, default: false }
});

module.exports = mongoose.model('Medicine', MedicineSchema);
