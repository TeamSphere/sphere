'use client'

import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';

type AuthContextType = {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const API_BASE_URL = 'https://sentience-399715.ew.r.appspot.com/api';

  const login = async (email: string, password: string) => {
    const res = await axios.post(`${API_BASE_URL}/login`, { username: email, password });
    localStorage.setItem('token', res.data);
    setUser(email);
  };

  const register = async (email: string, password: string) => {
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};