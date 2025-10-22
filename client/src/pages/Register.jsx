import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const nav = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'patient' });
  const [err, setErr] = useState('');
  async function submit(e){
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      nav('/login');
    } catch (er) { setErr(er.response?.data?.message || 'Registration failed'); }
  }
  return (
    <div className="max-w-md mx-auto mt-12 card">
      <h2 className="text-2xl font-semibold mb-4">Create account</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Full name" className="w-full p-3 rounded-md border" />
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full p-3 rounded-md border" />
        <input value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" type="password" className="w-full p-3 rounded-md border" />
        <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})} className="w-full p-3 rounded-md border">
          <option value="patient">Patient</option>
          <option value="caretaker">Caretaker</option>
        </select>
        <div className="flex items-center justify-between">
          <button className="btn btn-primary" type="submit">Create account</button>
          <a href="/login" className="text-sm text-gray-600">Already have account</a>
        </div>
      </form>
    </div>
  );
}