import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function PatientActionsModal({ patient, onClose }) {
  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState('');
  const [time, setTime] = useState('');

  const fetchMedicines = () => {
    api.get(`/medicines?patientId=${patient._id}`)
      .then(res => setMedicines(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => { fetchMedicines(); }, []);

  const addMedicine = async () => {
    try {
      await api.post('/medicines', { patientId: patient._id, medicineName, time });
      fetchMedicines();
      setMedicineName(''); setTime('');
    } catch (err) { console.log(err); }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-lg space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{patient.name} - Actions</h2>
          <button onClick={onClose} className="text-red-600 font-bold text-xl">&times;</button>
        </div>

        {/* Add Medicine */}
        <div className="space-y-2">
          <h3 className="font-semibold">Add Medicine Reminder</h3>
          <div className="flex gap-2">
            <input placeholder="Medicine Name" value={medicineName} onChange={e=>setMedicineName(e.target.value)} className="border p-2 rounded w-full"/>
            <input type="time" value={time} onChange={e=>setTime(e.target.value)} className="border p-2 rounded"/>
            <button onClick={addMedicine} className="bg-green-600 text-white px-4 rounded hover:bg-green-700">Add</button>
          </div>
        </div>

        {/* List of Medicines */}
        <div className="space-y-2">
          <h3 className="font-semibold">Medicines</h3>
          {medicines.length===0 ? <p>No medicines yet.</p> : medicines.map(m => (
            <div key={m._id} className="flex justify-between items-center border p-2 rounded">
              <span>{m.medicineName} at {m.time}</span>
              <span className={`px-2 py-1 rounded text-white ${m.taken ? 'bg-green-600' : 'bg-red-500'}`}>{m.taken ? 'Taken' : 'Pending'}</span>
            </div>
          ))}
        </div>

        {/* TODO: Add similar blocks for Appointments, Expiry, Emergency */}
      </div>
    </div>
  );
}
