'use client'

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../context/AuthContext';

export function Navbar() {
  const { user, login, register, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      try {
        await login(email, password);
        setEmail("");
        setPassword("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      try {
        await register(email, password);
        setEmail("");
        setPassword("");
        setIsRegistering(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleRegistering = () => {
    setEmail("");
    setPassword("");
    setIsRegistering(!isRegistering);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-lg">
      <div>
        <Link href="/">
          <p className="text-xl font-bold text-gray-800">Sphere</p>
        </Link>
      </div>
      { user ? (
        <div className="flex items-center gap-4">
          <span className="font-bold">{`Hello, ${user.username}`}</span>
          <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none">Logout</button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none"
            placeholder={isRegistering ? "Register Email" : "Login Email"}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none"
            placeholder={isRegistering ? "Register Password" : "Login Password"}
          />
          <button
            onClick={isRegistering ? handleRegister : handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
          <button
            onClick={toggleRegistering}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
          >
            {isRegistering ? "Back to Login" : "Sign Up"}
          </button>
        </div>
      )}
    </nav>
  );
}