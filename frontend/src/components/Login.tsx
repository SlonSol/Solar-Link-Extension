// src/components/Login.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import { motion } from 'framer-motion';
import InputSpotlightBorder from './core/InputSpotlightBorder'; // Импортируем модифицированный компонент

interface LoginProps {
  setToken: (token: string) => void;
}



const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/login/', {
        username,
        password,
      });
      setToken(response.data.access);
      localStorage.setItem('token', response.data.access);
      navigate('/');
    } catch (error: any) {
      setMessage(error.response?.data?.detail || 'Authentication failed.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      {/* Header */}
      <Header />

      <motion.div
        className="w-full flex flex-col items-center mt-8"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
      >
        {/* Main Content */}
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
          {/* Username Field */}
          <InputSpotlightBorder
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password Field */}
          <InputSpotlightBorder
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" 
          className='relative border border-gray-100  inline-flex h-12 overflow-hidden p-[3px] rounded-lg'>
            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFFFFF_0%,#FFD15D_50%,#FFFFFF_100%)]' />
            <span className='inline-flex border border-gray-100  h-full w-full cursor-pointer items-center p-3 rounded-lg justify-center bg-white text-black backdrop-blur-3xl'>
            Login
            </span>
          </button>
        </form>
        <button className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'>
      <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
      <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl'>
        Click Me
      </span>
    </button>
        
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-yellow-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
