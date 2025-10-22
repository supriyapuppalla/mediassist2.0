import React, { useState } from 'react';
import api from '../services/api';

export default function AddMedicineModal({ patient, onClose, onAdded }) {
  const [form, setForm] = useState({ name: '', dosage: '', time: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/patients/${patient._id}/medicines`, form);
      setMsg('Medicine added successfully!');
      onAdded();
    } catch (err) {
      setMsg('Failed to add medicine');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Add Medicine for {patient.name}</h2>
        {msg && <p className="text-green-600">{msg}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Medicine Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Dosage (e.g., 1 tablet)"
            value={form.dosage}
            onChange={(e) => setForm({ ...form, dosage: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
