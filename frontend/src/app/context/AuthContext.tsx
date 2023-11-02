'use client'

import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:8000/api/login', { username: email, password });
    localStorage.setItem('token', res.data);
    setUser(email);
  };

  const register = async (email, password) => {
    const res = await axios.post('http://localhost:8000/api/register', { username: email, password });
    localStorage.setItem('token', res.data);
    setUser(email);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};