// client/src/components/AddReminderModal.jsx
import React, { useState } from 'react';
import api from '../services/api';

export default function AddReminderModal({ patientId, onClose, onAdded }) {
  const [medicineName, setMedicineName] = useState('');
  const [time, setTime] = useState('');

  const handleAdd = async () => {
    try {
      await api.post('/reminders', { patientId, medicineName, time });
      alert('Reminder added successfully!');
      onAdded(); // refresh the reminders list
      onClose(); // close the modal
    } catch (err) {
      console.error(err);
      alert('Failed to add reminder');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-semibold text-green-700 mb-3">Add Medicine Reminder</h2>
        <input
          className="border w-full mb-2 p-2 rounded"
          placeholder="Medicine Name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
        />
        <input
          className="border w-full mb-2 p-2 rounded"
          placeholder="Time (e.g. 8:00 AM)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">Add</button>
        </div>
      </div>
    </div>
  );
}
