import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/Auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.jpg';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');

  // async function submit(e) {
  //   e.preventDefault();
  //   try {
  //     const res = await api.post('/auth/login', { email, password, role }); // include role
  //     login(res.data);

  //     if (res.data.user.role === 'caretaker') nav('/caretaker-dashboard');
  //     else nav('/patient-dashboard');
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Login failed');
  //   }
  // }
  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password, role });
  
      // 🔹 Save token permanently
      localStorage.setItem('token', res.data.token);
  
      // Keep your existing login context
      login(res.data);
  
      // Navigate to correct dashboard
      if (res.data.user.role === 'caretaker') nav('/caretaker-dashboard');
      else nav('/patient-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-xl">
        <div className="flex items-center mb-6">
          <img src={Logo} alt="MediAssist Logo" className="h-10 w-10 mr-3" />
          <h2 className="text-2xl font-bold text-green-700">MediAssist</h2>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={submit} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 rounded-md border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full p-3 rounded-md border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="patient"
                checked={role === 'patient'}
                onChange={() => setRole('patient')}
                className="accent-green-600"
              />
              <span>Patient</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="caretaker"
                checked={role === 'caretaker'}
                onChange={() => setRole('caretaker')}
                className="accent-green-600"
              />
              <span>Caretaker</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{' '}
          <a href="/register" className="text-green-600 font-medium hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
