// src/components/Register.tsx
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Header from './Header'

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/users/register/', {
        username,
        email,
        password,
      })
      setMessage('Registration successful! You can now log in.')
      navigate('/login')
    } catch (error: any) {
      setMessage(error.response?.data?.detail || 'Registration failed.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="w-full flex flex-col items-center mt-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Register an Account</h2>
        {message && <p className="mb-4 text-center text-green-500">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 animated-border"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 animated-border"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 animated-border"
          />
          <button
            type="submit"
            className="animated-button w-full"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
