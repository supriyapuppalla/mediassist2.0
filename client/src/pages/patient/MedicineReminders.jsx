import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function MedicineReminders() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all reminders for caretaker
  const fetchReminders = async () => {
    try {
      const res = await api.get('/medicine-reminders'); // backend should return all reminders for this caretaker
      setReminders(res.data);
    } catch (err) {
      console.error('Error fetching reminders:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700">Medicine Reminders</h2>
      <p className="text-gray-600 mt-2">Here you will see all your upcoming medicines and their schedules.</p>

      {loading ? (
        <p className="mt-4">Loading reminders...</p>
      ) : reminders.length === 0 ? (
        <p className="mt-4 text-gray-500">No reminders added yet.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {reminders.map((reminder) => (
            <div key={reminder._id} className="p-4 bg-green-50 border rounded-lg shadow-sm">
              <p className="font-semibold">{reminder.medicineName}</p>
              <p className="text-gray-600">Time: {reminder.time}</p>
              <p className="text-gray-600">Patient ID: {reminder.patientId}</p>
              <p className="text-gray-600">Taken: {reminder.taken ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
