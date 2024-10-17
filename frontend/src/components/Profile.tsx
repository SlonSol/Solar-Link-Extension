// src/components/Profile.tsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

interface ProfileProps {
  token: string
  handleLogout: () => void
}

interface UserProfile {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  profile: {
    bio: string
  }
}

const Profile: React.FC<ProfileProps> = ({ token, handleLogout }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [bio, setBio] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setProfile(response.data)
        setFirstName(response.data.first_name)
        setLastName(response.data.last_name)
        setBio(response.data.profile.bio || '')
      } catch (error: any) {
        console.error(error)
        setError('Failed to load profile. Please log in again.')
        handleLogout()
        navigate('/login')
      }
    }
    fetchProfile()
  }, [token, handleLogout, navigate])

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        'http://localhost:8000/api/users/profile/',
        {
          first_name: firstName,
          last_name: lastName,
          profile: {
            bio: bio,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setProfile(response.data)
      setMessage('Profile updated successfully.')
      setError(null)
    } catch (error: any) {
      setError(error.response?.data?.detail || 'Failed to update profile.')
    }
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="mb-4 text-red-500">{error}</p>
        <button
          onClick={handleLogout}
          className="w-full border-2 border-red-500 text-red-500 bg-white hover:bg-red-50 p-3 rounded-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    )
  }

  if (!profile) return <div className="text-center">Loading...</div>

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      {/* Основной контент */}
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-center mb-4">Personal Account</h2>
        {message && <p className="mb-4 text-center text-green-500">{message}</p>}
        <form className="flex flex-col w-full space-y-4">
          <label className="mb-1 font-medium">First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
          />
          <label className="mb-1 font-medium">Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
          />
          <label className="mb-1 font-medium">Biography:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
            rows={4}
          />
          <button
            onClick={handleUpdate}
            className="w-full border-2 border-yellow-500 text-black bg-white hover:bg-yellow-50 p-3 rounded-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            Save
          </button>
        </form>
        <div className="flex justify-between w-full mt-4">
          <Link to="/" className="text-yellow-500 hover:underline">
            Home
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
