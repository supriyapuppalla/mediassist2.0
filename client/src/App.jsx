import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PatientDashboard from "./pages/patient/PatientDashboard.jsx";
import CaretakerDashboard from "./pages/caretaker/CaretakerDashboard.jsx";
import AddAppointment from "./pages/caretaker/AddAppointment.jsx";
import MedicineReminders from "./pages/patient/MedicineReminders.jsx";
import Appointments from "./pages/patient/Appointments.jsx";
import HealthTips from "./pages/patient/HealthTips.jsx";
import ExpiryTracker from "./pages/patient/ExpiryTracker.jsx";
import EmergencyAlert from "./pages/patient/EmergencyAlert.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/caretaker-dashboard" element={<CaretakerDashboard />} />
        <Route path="/caretaker/add-appointment" element={<AddAppointment />} />
        <Route path="/patient/medicine-reminders" element={<MedicineReminders />} />
        <Route path="/patient/appointments" element={<Appointments />} />
        <Route path="/patient/health-tips" element={<HealthTips />} />
        <Route path="/patient/expiry-tracker" element={<ExpiryTracker />} />
        <Route path="/patient/emergency-alert" element={<EmergencyAlert />} />
      </Routes>
    </>
  );
}
