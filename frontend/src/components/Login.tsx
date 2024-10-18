// src/components/Login.tsx
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Header from './Header'
import { motion } from 'framer-motion';

interface LoginProps {
  setToken: (token: string) => void
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/users/login/', {
        username,
        password,
      })
      setToken(response.data.access)
      localStorage.setItem('token', response.data.access)
      navigate('/')
    } catch (error: any) {
      setMessage(error.response?.data?.detail || 'Authentication failed.')
    }
  }

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
      {/* <div className=""> */}
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
          />
          <button type="submit" 
          className='relative border border-gray-100  inline-flex h-12 overflow-hidden p-[3px] rounded-lg'>
            <span className='absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFFFFF_0%,#FFD15D_50%,#FFFFFF_100%)]' />
            <span className='inline-flex border border-gray-100  h-full w-full cursor-pointer items-center p-3 rounded-lg justify-center bg-white text-black backdrop-blur-3xl'>
            Login
            </span>
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-yellow-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      {/* </div> */}
      </motion.div>
    </div>
  )
}

export default Login
