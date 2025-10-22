import React, { useState } from 'react';
import api from '../services/api';

export default function SendEmergencyModal({ patient, onClose, onAdded }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendAlert = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/patients/${patient._id}/emergency`, { message });
      setStatus('Emergency alert sent!');
      onAdded();
    } catch (err) {
      setStatus('Failed to send alert');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Send Emergency Alert</h2>
        {status && <p className="text-green-600">{status}</p>}
        <form onSubmit={sendAlert} className="space-y-3">
          <textarea
            placeholder="Enter emergency message"
            className="w-full p-2 border rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-3 py-1 bg-red-600 text-white rounded">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
