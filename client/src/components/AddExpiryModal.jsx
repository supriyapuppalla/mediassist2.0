import React, { useState } from 'react';
import api from '../services/api';

export default function AddExpiryModal({ patient, onClose, onAdded }) {
  const [form, setForm] = useState({ medicine: '', expiryDate: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/patients/${patient._id}/expiry`, form);
      setMsg('Expiry date added successfully!');
      onAdded();
    } catch (err) {
      setMsg('Failed to add expiry');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Add Expiry for {patient.name}</h2>
        {msg && <p className="text-green-600">{msg}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Medicine Name"
            className="w-full p-2 border rounded"
            value={form.medicine}
            onChange={(e) => setForm({ ...form, medicine: e.target.value })}
            required
          />
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={form.expiryDate}
            onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
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
