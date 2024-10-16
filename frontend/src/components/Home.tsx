// src/components/Home.tsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      {/* Header */}
      <Header />

      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
        {isMenuOpen ? (
          // Close Menu Icon (X)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Menu Icon (Hamburger)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-white border border-gray-300 rounded-lg shadow-lg">
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Personal Account
          </Link>
        </div>
      )}

      {/* Main Content */}
      <h1 className="text-3xl font-bold">Hello World</h1>
    </div>
  )
}

export default Home
