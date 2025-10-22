// client/src/pages/caretaker/SendEmergencyModal.jsx
import React, { useState } from 'react';
import api from '../../services/api';

export default function SendEmergencyModal({ patient, onClose, onAdded }) {
  const [message, setMessage] = useState('Emergency! Please check on me.');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/emergency', { patientId: patient._id, message });
      onAdded();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send emergency');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3">Send Emergency to {patient.name}</h3>
        <form onSubmit={submit} className="space-y-3">
          <textarea value={message} onChange={e=>setMessage(e.target.value)} className="w-full p-2 border rounded" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button type="submit" className="px-3 py-1 bg-red-600 text-white rounded">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
