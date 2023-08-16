import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './Login';
import Register from './Register';
import UserProfile from './UserProfile';
import CreateEvent from './CreateEvent';
import EventsList from './EventsList';
import Navbar from './Navbar';
import { auth, db } from './firebase'; 
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'; 



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
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


  const handleDeleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
        return;  // Exit the function if the user cancels
    }

    try {
        const userRef = doc(db, "users", currentUser.uid);
        await deleteDoc(userRef); // delete user data from Firestore
        
        // Delete user account
        await currentUser.delete();
        console.log("Profile deleted successfully");
    } catch (error) {
        console.error("Error deleting profile: ", error);
        // Optionally, you can show a notification or error message to the user
    }
};


  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div className="app">
        <Navbar currentUser={currentUser} handleLogout={handleLogout} />
        <div className="main-content">
          <Routes>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/login" element={<div className="container"><Login /></div>} />
            <Route path="/register" element={<div className="container"><Register /></div>} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/events" element={<EventsList />} />
            <Route path="/" element={currentUser ? <div>User is logged in.</div> : <div className="container">Please log in or register.</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


