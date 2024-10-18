// src/components/Profile.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProfileProps {
  token: string;
  handleLogout: () => void;
}

interface UserProfile {
  id: number;
  username: string;
  email: string;
}

const Profile: React.FC<ProfileProps> = ({ token, handleLogout }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
        setUsername(response.data.username);
      } catch (error: any) {
        console.error(error);
        setError('Failed to load profile. Please log in again.');
        handleLogout();
        navigate('/login');
      }
    };
    fetchProfile();
  }, [token, handleLogout, navigate]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        'http://localhost:8000/api/users/profile/',
        {
          username: username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(response.data);
      setMessage('Profile updated successfully.');
      setError(null);
    } catch (error: any) {
      setError(error.response?.data?.detail || 'Failed to update profile.');
    }
  };

  if (error) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-4 text-red-500">{error}</p>
        <button
          onClick={handleLogout}
          className="w-full border-2 border-red-500 text-red-500 bg-white hover:bg-red-50 p-3 rounded-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          Logout
        </button>
      </motion.div>
    );
  }

  if (!profile) return <div className="text-center">Loading...</div>;

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full relative p-4"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
    >
      {/* Основной контент */}
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Account</h2>
        {message && <p className="mb-4 text-center text-green-500">{message}</p>}
        <form className="flex flex-col space-y-4">
          {/* Username */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email:</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 shadow-sm focus:outline-none cursor-not-allowed"
            />
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleUpdate}
            className="w-full border-2 border-yellow-500 text-black bg-white hover:bg-yellow-50 p-3 rounded-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            Save
          </button>
        </form>
        <div className="flex justify-between w-full mt-6">
          <Link to="/profile" className="text-yellow-500 hover:underline">
            My Nodes
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
