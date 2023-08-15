import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './Login';
import Register from './Register';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out successfully");
        setCurrentUser(null);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div className="container">
        <div>
          {/* Navigation links (you can style or place them as needed) */}
          {currentUser ? (
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}

          {/* Route setup */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={currentUser ? <div>User is logged in.</div> : <div>Please log in or register.</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


