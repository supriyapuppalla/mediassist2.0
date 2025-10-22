require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');

async function seed(){
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany({});
  const pw = await bcrypt.hash('password123', 10);
  const u1 = new User({ name: 'Caretaker One', email: 'caretaker@example.com', password: pw, role: 'caretaker' });
  const u2 = new User({ name: 'Patient One', email: 'patient@example.com', password: pw, role: 'patient' });
  await u1.save(); await u2.save();
  console.log('Seeded users. Emails: caretaker@example.com, patient@example.com (password: password123)');
  process.exit();
}
seed().catch(e=>{ console.error(e); process.exit(1); });