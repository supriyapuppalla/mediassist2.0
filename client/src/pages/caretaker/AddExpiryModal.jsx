// client/src/pages/caretaker/AddExpiryModal.jsx
import React, { useState } from 'react';
import api from '../../services/api';

export default function AddExpiryModal({ patient, onClose, onAdded }) {
  const [medicineName, setMedicineName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/expiry', { patientId: patient._id, medicineName, expiryDate });
      onAdded();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add expiry');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3">Add Expiry for {patient.name}</h3>
        <form onSubmit={submit} className="space-y-3">
          <input required value={medicineName} onChange={e=>setMedicineName(e.target.value)} placeholder="Medicine name" className="w-full p-2 border rounded"/>
          <input required type="date" value={expiryDate} onChange={e=>setExpiryDate(e.target.value)} className="w-full p-2 border rounded"/>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
