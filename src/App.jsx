import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './navbar';
import Home from './home';
import About from './about'; 
import Login from './login';
import Signup from './signup';
import Search from './search';
import Profile from './profile';
import { clearAuthSession, saveAuthSession } from '../services/authService';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));

  useEffect(() => {
    const syncAuthFromStorage = () => {
      setIsLoggedIn(Boolean(localStorage.getItem('token')));
    };

    window.addEventListener('storage', syncAuthFromStorage);

    return () => {
      window.removeEventListener('storage', syncAuthFromStorage);
    };
  }, []);

  const handleAuthSuccess = (token, user = null) => {
    saveAuthSession(token, user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    clearAuthSession();
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} /> 

      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} onAuthSuccess={handleAuthSuccess} />} /> {/* Add this line for the login route */}
        <Route path="/signup" element={<Signup isLoggedIn={isLoggedIn} onAuthSuccess={handleAuthSuccess} />} /> {/* Add this line for the signup route */}
        <Route path="/search" element={<Search />} /> {/* Add this line for the search route */}
        <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;

