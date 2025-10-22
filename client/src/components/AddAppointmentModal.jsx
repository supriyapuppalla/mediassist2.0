import React, { useState } from 'react';
import api from '../services/api';

export default function AddAppointmentModal({ patient, onClose, onAdded }) {
  const [form, setForm] = useState({ date: '', doctor: '', reason: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/patients/${patient._id}/appointments`, form);
      setMsg('Appointment added successfully!');
      onAdded();
    } catch (err) {
      setMsg('Failed to add appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Add Appointment for {patient.name}</h2>
        {msg && <p className="text-green-600">{msg}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Doctor Name"
            className="w-full p-2 border rounded"
            value={form.doctor}
            onChange={(e) => setForm({ ...form, doctor: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Reason for Visit"
            className="w-full p-2 border rounded"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            required
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
            <button type="submit" disabled={loading} className="px-3 py-1 bg-green-600 text-white rounded">
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
