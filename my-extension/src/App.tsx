// src/App.tsx
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Home from './components/Home'

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <Router>
      <div className="relative min-h-screen">
        {/* Фоновый слой */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-yellow-100 bg-[linear-gradient(to_right,#FFD700_1px,transparent_1px),linear-gradient(to_bottom,#FFD700_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#FFC700,transparent)]"></div>
        </div>

        {/* Основной контент */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-[364px] h-[600px] px-[20px] py-[16px] bg-white rounded-lg shadow-lg overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={!token ? <Login setToken={setToken} /> : <Navigate to="/profile" />}
              />
              <Route
                path="/register"
                element={!token ? <Register /> : <Navigate to="/profile" />}
              />
              <Route
                path="/profile"
                element={token ? <Profile token={token} handleLogout={handleLogout} /> : <Navigate to="/login" />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
