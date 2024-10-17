// src/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import IntroLogo from './components/IntroLogo'; // Импортируем новый компонент

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(false); // Изначально скрыть анимацию

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }

    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    localStorage.setItem('hasSeenIntro', 'true');
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="relative min-h-screen bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-[364px] h-[600px] px-[20px] py-[16px] bg-white rounded-lg shadow-lg overflow-y-auto transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,245,208,.5)_100%)]">
            {showIntro ? (
              <IntroLogo onComplete={handleIntroComplete} /> // Показать анимацию
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
