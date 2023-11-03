'use client'

import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const API_BASE_URL = 'https://sentience-399715.ew.r.appspot.com/api';

  const login = async (email, password) => {
    const res = await axios.post(`${API_BASE_URL}/login`, { username: email, password });
    localStorage.setItem('token', res.data);
    setUser(email);
  };

  const register = async (email, password) => {
    const res = await axios.post(`${API_BASE_URL}/register`, { username: email, password });
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