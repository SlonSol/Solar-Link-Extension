// src/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import HomePage from './components/Home';
import Settings from './components/Settings';
import IntroLogo from './components/IntroLogo';
import AnimatedTabs from './components/AnimatedTabs'; // Исправленный импорт
// import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    if (!token) {
      navigate('/login');
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[364px] h-[600px] px-[20px] py-[16px] bg-white rounded-lg shadow-lg overflow-y-auto transform bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,245,238,.5)_100%)] relative">
          
          {showIntro ? (
            <IntroLogo onComplete={handleIntroComplete} />
          ) : (
            // <AnimatePresence exitBeforeEnter>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />} />
                <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
                <Route path="/profile" element={token ? <Profile token={token} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
                <Route path="/settings" element={token ? <Settings /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
              </Routes>
            // </AnimatePresence>
          )}
          {!showIntro && token && <AnimatedTabs />}
        </div>
      </div>
    </div>
  );
};

export default App;
