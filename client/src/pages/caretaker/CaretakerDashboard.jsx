// client/src/pages/caretaker/CaretakerDashboard.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import AddReminderModal from '../../components/AddReminderModal';
import AddAppointmentModal from '../../components/AddAppointmentModal';
import AddExpiryModal from '../../components/AddExpiryModal';
import SendEmergencyModal from '../../components/SendEmergencyModal';

export default function CaretakerDashboard() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [show, setShow] = useState({ reminder: false, appointment: false, expiry: false, emergency: false });
  const [newPatient, setNewPatient] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  // Fetch all patients linked to caretaker
  const fetchPatients = () => {
    api.get('/patients')
      .then(res => setPatients(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => { fetchPatients(); }, []);

  // Add new patient
  const addPatient = (e) => {
    e.preventDefault();
    api.post('/patients', newPatient)
  .then(res => {
    setMessage('Patient added successfully!');
    setNewPatient({ name: '', email: '', password: '' });
    fetchPatients();
  })
   
      .catch(err => setMessage(err.response?.data?.message || 'Failed to add patient'));
  };

  // Handle opening modal for specific action
  const handleOpen = (patient, type) => {
    setSelectedPatient(patient);
    setShow({ reminder: false, appointment: false, expiry: false, emergency: false, [type]: true });
  };

  // Handle closing modal
  const handleClose = () => {
    setSelectedPatient(null);
    setShow({ reminder: false, appointment: false, expiry: false, emergency: false });
  };

  // Refresh after adding any new entry
  const handleAdded = () => {
    handleClose();
    fetchPatients();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Caretaker Dashboard</h2>

      {/* 🧩 Add Patient Form */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="font-semibold mb-3">Add New Patient</h3>
        {message && <p className="text-green-600 mb-2">{message}</p>}
        <form onSubmit={addPatient} className="space-y-2">
          <input
            value={newPatient.name}
            onChange={e => setNewPatient({ ...newPatient, name: e.target.value })}
            placeholder="Name"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            value={newPatient.email}
            onChange={e => setNewPatient({ ...newPatient, email: e.target.value })}
            placeholder="Email"
            type="email"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            value={newPatient.password}
            onChange={e => setNewPatient({ ...newPatient, password: e.target.value })}
            placeholder="Password"
            type="password"
            className="w-full p-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add Patient
          </button>
        </form>
      </div>

      {/* 👥 Patient List */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="font-semibold mb-3">My Patients</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.length === 0 && <p>No patients added yet.</p>}
          {patients.map(patient => (
            <div key={patient._id} className="p-4 border rounded-lg shadow-sm bg-green-50">
              <p className="font-semibold">{patient.name}</p>
              <p className="text-sm text-gray-600">{patient.email}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <button onClick={() => handleOpen(patient, 'reminder')} className="px-3 py-1 bg-green-600 text-white rounded">+ Reminder</button>
                <button onClick={() => handleOpen(patient, 'appointment')} className="px-3 py-1 bg-green-600 text-white rounded">+ Appointment</button>
                <button onClick={() => handleOpen(patient, 'expiry')} className="px-3 py-1 bg-green-600 text-white rounded">+ Expiry</button>
                <button onClick={() => handleOpen(patient, 'emergency')} className="px-3 py-1 bg-red-600 text-white rounded">Emergency</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ⚙️ Modals */}
      {selectedPatient && show.reminder && (
        <AddReminderModal
          patientId={selectedPatient._id} 
          onClose={handleClose}
          onAdded={handleAdded}
        />
      )}
      {selectedPatient && show.appointment && (
        <AddAppointmentModal
          patient={selectedPatient}
          onClose={handleClose}
          onAdded={handleAdded}
        />
      )}
      {selectedPatient && show.expiry && (
        <AddExpiryModal
          patient={selectedPatient}
          onClose={handleClose}
          onAdded={handleAdded}
        />
      )}
      {selectedPatient && show.emergency && (
        <SendEmergencyModal
          patient={selectedPatient}
          onClose={handleClose}
          onAdded={handleAdded}
        />
      )}
    </div>
  );
}
