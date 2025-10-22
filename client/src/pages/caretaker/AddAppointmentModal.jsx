// client/src/pages/caretaker/AddAppointmentModal.jsx
import React, { useState } from 'react';
import api from '../../services/api';

export default function AddAppointmentModal({ patient, onClose, onAdded }) {
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', { patientId: patient._id, doctorName, date, notes });
      onAdded();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add appointment');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3">Add Appointment for {patient.name}</h3>
        <form onSubmit={submit} className="space-y-3">
          <input required value={doctorName} onChange={e=>setDoctorName(e.target.value)} placeholder="Doctor name" className="w-full p-2 border rounded"/>
          <input required type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} className="w-full p-2 border rounded"/>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notes" className="w-full p-2 border rounded"></textarea>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
