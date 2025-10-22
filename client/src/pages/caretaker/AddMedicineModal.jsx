import React, { useState } from 'react';
import api from '../../services/api';

export default function AddMedicineModal({ patient, onClose, onAdded }) {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reminders', {
        patientId: patient._id,
        medicineName,
        dosage,
        time
      });
      onAdded();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add medicine');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3">Add Medicine for {patient.name}</h3>
        <form onSubmit={submit} className="space-y-3">
          <input required value={medicineName} onChange={e=>setMedicineName(e.target.value)} placeholder="Medicine name" className="w-full p-2 border rounded"/>
          <input value={dosage} onChange={e=>setDosage(e.target.value)} placeholder="Dosage (e.g. 1 tablet)" className="w-full p-2 border rounded"/>
          <input type="datetime-local" value={time} onChange={e=>setTime(e.target.value)} className="w-full p-2 border rounded"/>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
