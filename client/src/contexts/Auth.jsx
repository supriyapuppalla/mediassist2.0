import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('medi_user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = (data) => {
    localStorage.setItem('medi_token', data.token);
    localStorage.setItem('medi_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('medi_token');
    localStorage.removeItem('medi_user');
    setUser(null);
  };

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
