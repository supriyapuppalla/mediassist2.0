require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const patientRoutes = require('./routes/patients');
const remindersRoutes = require('./routes/reminders');
const appointmentsRoutes = require('./routes/appointments');
const expiryRoutes = require('./routes/expiry');
const emergencyRoutes = require('./routes/emergency');



const app = express();

app.use(cors({
  origin: 'http://localhost:5174', // your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // <--- important
  credentials: true, // if you use cookies
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/reminders', remindersRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/expiry', expiryRoutes);
app.use('/api/emergency', emergencyRoutes);


// Serve client in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('MongoDB connected');
    console.log("MONGO_URI:", process.env.MONGO_URI);
    app.listen(PORT, ()=> console.log('Server started on port', PORT));
  })
  .catch(err => {
    console.error('Mongo connection error', err.message);
  });