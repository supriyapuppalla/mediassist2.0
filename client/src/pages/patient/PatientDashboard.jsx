// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../services/api';
// import { useAuth } from '../../contexts/Auth';

// import medicineImg from '../../assets/medicine.png';
// import appointmentImg from '../../assets/appointment.png';
// import expiryImg from '../../assets/expiry.png';
// import tipsImg from '../../assets/health.png';
// import emergencyImg from '../../assets/emergency.png';

// export default function PatientDashboard() {
//   const nav = useNavigate();
//   const { user } = useAuth(); // use correct hook
//   const [appointments, setAppointments] = useState([]);
//   const [medicines, setMedicines] = useState([]);

//   useEffect(() => {
//     if (!user) return;

//     // fetch medicines and appointments for logged-in patient
//     api.get('/medicines')
//       .then((res) => setMedicines(res.data))
//       .catch((err) => console.log(err));

//     api.get('/appointments')
//       .then((res) => setAppointments(res.data))
//       .catch((err) => console.log(err));
//   }, [user]);

//   const cards = [
//     { title: 'Medicine Reminder', icon: medicineImg, path: '/patient/medicine-reminders', count: medicines.length },
//     { title: 'Doctor Appointment', icon: appointmentImg, path: '/patient/appointments', count: appointments.length },
//     { 
//       title: 'Expiry Tracker', 
//       icon: expiryImg, 
//       path: '/patient/expiry-tracker', 
//       count: medicines.filter(m => new Date(m.expiryDate) <= new Date(Date.now() + 7*24*60*60*1000)).length 
//     },
//     { title: 'Health Tips', icon: tipsImg, path: '/patient/health-tips', count: 0 },
//     { title: 'Emergency', icon: emergencyImg, path: '/patient/emergency-alert', count: 0 },
//   ];

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-green-700">Patient Dashboard</h2>
//         <p className="text-gray-600">Track your medicines, appointments, expiry alerts, and emergencies.</p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cards.map((card) => (
//           <div
//             key={card.title}
//             onClick={() => nav(card.path)}
//             className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl p-5 flex flex-col items-center transition relative"
//           >
//             <img src={card.icon} alt={card.title} className="h-16 w-16 mb-3" />
//             <h3 className="text-lg font-semibold text-green-700">{card.title}</h3>
//             {card.count > 0 && (
//               <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
//                 {card.count}
//               </span>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/Auth';

import medicineImg from '../../assets/medicine.png';
import appointmentImg from '../../assets/appointment.png';
import expiryImg from '../../assets/expiry.png';
import tipsImg from '../../assets/health.png';
import emergencyImg from '../../assets/emergency.png';

export default function PatientDashboard() {
  const nav = useNavigate();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [expiry, setExpiry] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      api.get('/appointments'),
      api.get('/reminders'),
      api.get('/expiry'),
      api.get('/emergency')
    ]).then(([a, r, e, em]) => {
      setAppointments(a.data || []);
      setMedicines(r.data || []);
      setExpiry(e.data || []);
      setEmergencies(em.data || []);
    }).catch(err => {
      console.error('Dashboard fetch error', err);
    }).finally(()=> setLoading(false));
  }, [user]);

  const cards = [
    { title: 'Medicine Reminder', icon: medicineImg, path: '/patient/medicine-reminders', count: medicines.length },
    { title: 'Doctor Appointment', icon: appointmentImg, path: '/patient/appointments', count: appointments.length },
    { title: 'Expiry Tracker', icon: expiryImg, path: '/patient/expiry-tracker', count: expiry.length },
    { title: 'Health Tips', icon: tipsImg, path: '/patient/health-tips', count: 0 },
    { title: 'Emergency', icon: emergencyImg, path: '/patient/emergency-alert', count: emergencies.length },
  ];

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-700">Patient Dashboard</h2>
        <p className="text-gray-600">Track your medicines, appointments, expiry alerts, and emergencies.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(card => (
          <div key={card.title} onClick={() => nav(card.path)} className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl p-5 flex flex-col items-center transition relative">
            <img src={card.icon} alt={card.title} className="h-16 w-16 mb-3" />
            <h3 className="text-lg font-semibold text-green-700">{card.title}</h3>
            {card.count > 0 && <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">{card.count}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
