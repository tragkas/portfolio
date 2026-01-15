import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  // Theme State
  const [isDark, setIsDark] = useState<boolean>(true);

  // Initialize theme from local storage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(true);
    }
  }, []);

  // Update HTML class when theme changes
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home toggleTheme={toggleTheme} isDark={isDark} />} />
        <Route path="/login" element={<Login toggleTheme={toggleTheme} isDark={isDark} />} />
        <Route path="/dashboard" element={<Dashboard toggleTheme={toggleTheme} isDark={isDark} />} />
      </Routes>
    </Router>
  );
};

export default App;