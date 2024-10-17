// src/components/Login.tsx
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Header from './Header'

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
      navigate('/profile')
    } catch (error: any) {
      setMessage(error.response?.data?.detail || 'Authentication failed.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="w-full flex flex-col items-center mt-8">
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
          <button
            type="submit"
            className="w-full border-2 border-yellow-500 text-black bg-white hover:bg-yellow-50 p-3 rounded-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            Login
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
      </div>
    </div>
  )
}

export default Login
