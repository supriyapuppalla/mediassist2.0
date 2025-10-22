import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';
import Logo from '../assets/logo.jpg'; // your logo file

export default function Nav() {
  const { user, logout } = useAuth();

  return (
    <header className="header p-4 flex items-center justify-between bg-green-50 shadow-md">
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img
          src={Logo}
          alt="MediAssist Logo"
          className="w-10 h-10 rounded-full border-2 border-green-600 object-cover"
        />
        <h1 className="text-xl font-semibold text-green-700">MediAssist</h1>
      </div>

      {/* Navigation */}
      <nav>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Hi, {user.name}</span>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-100 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
