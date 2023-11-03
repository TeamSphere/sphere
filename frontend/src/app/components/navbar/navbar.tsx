'use client'

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { Transition } from 'react-transition-group';

export function Navbar() {
  const { user, login, register, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
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

  const handleRegister = async (e: React.FormEvent) => {
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

  const toggleRegistering = (e: React.MouseEvent | any) => {
    setEmail("");
    setPassword("");
    setIsRegistering(!isRegistering);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Sphere</p>
            </Link>
          </div>
          <div className="hidden md:block">
            { user ? (
              <div className="ml-10 flex items-baseline space-x-4">
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{`Hello, ${user}`}</span>
                <button onClick={logout} className="bg-orange-500 hover:bg-orange-700 text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
              </div>
            ) : (
              <div className="ml-10 flex items-baseline space-x-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="dark:bg-gray-700 focus:outline-none transition duration-150 ease-in-out px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-700 dark:text-gray-300"
                  placeholder={isRegistering ? "Register Email" : "Login Email"}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="dark:bg-gray-700 focus:outline-none transition duration-150 ease-in-out px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-700 dark:text-gray-300"
                  placeholder={isRegistering ? "Register Password" : "Login Password"}
                />
                <button
                  onClick={isRegistering ? handleRegister : handleLogin}
                  className="bg-orange-500 hover:bg-orange-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {isRegistering ? "Register" : "Login"}
                </button>
                <button
                  onClick={toggleRegistering}
                  className="bg-gray-500 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {isRegistering ? "Back to Login" : "Sign Up"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}