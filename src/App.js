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
import UserSidebar from './UserSidebar';
import { auth, db } from './firebase'; 
import { doc, getDocs, setDoc, deleteDoc, collection } from 'firebase/firestore'; 
import MyEvents from './MyEvents';
import {  getEvents, attendEvent, unattendEvent } from './firebaseOps';
import { deleteEvent } from './firebaseOps';



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const fetchEvents = async () => {
      const eventsRef = collection(db, "events");
      const querySnapshot = await getDocs(eventsRef);
      const eventsData = [];
      querySnapshot.forEach((doc) => {
        eventsData.push({ ...doc.data(), id: doc.id });
      });
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const eventsData = await getEvents();
    setEvents(eventsData);
  };

  useEffect(() => {
      fetchEvents();
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

  const handleAttend = (eventId) => {
    if (!currentUser) {
        console.error("User not logged in");
        return;
    }

    attendEvent(eventId, currentUser)
        .then(() => {
            fetchEvents();
        })
        .catch(error => {
            console.error("Error attending event:", error);
        });
  };

  const handleUnattend = (eventId) => {
    if (!currentUser) {
        console.error("User not logged in");
        return;
    }

    unattendEvent(eventId, currentUser)
        .then(() => {
            fetchEvents();
        })
        .catch(error => {
            console.error("Error unattending event:", error);
        });
  };



  const handleDeleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
        return; 
    }

    try {
        const userRef = doc(db, "users", currentUser.uid);
        await deleteDoc(userRef); 
        
      
        await currentUser.delete();
        console.log("Profile deleted successfully");
    } catch (error) {
        console.error("Error deleting profile: ", error);
      
    }
  };

  const handleDelete = async (eventId) => {
    try {
        await deleteEvent(eventId);
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    } catch (error) {
        console.error("Error deleting event:", error);
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
                <Route path="/events" element={<EventsList currentUser={currentUser} />} />
                <Route path="/" element={currentUser ? (
                    <div className="events-feed">
                    {events.map(event => (
                        <div key={event.id} className="event">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p>{event.location}</p>
                            <p>{event.dateTime}</p>
                            <p>Attendees: {event.attendees.length}</p>

                            {/* Show the Attend/Unattend button only if the user is not the creator of the event */}
                            {event.creator !== currentUser.uid && 
                                (
                                    event.attendees.includes(currentUser.uid) ? 
                                    <button onClick={() => handleUnattend(event.id)}>Unattend</button> :
                                    <button onClick={() => handleAttend(event.id)}>Attend</button>
                                )
                            }

                            {/* Display Delete button only if the current user is the creator of the event */}
                            {currentUser && event.creator === currentUser.uid && (
                                <>
                                    <p>Event Creator: {event.creator}</p>
                                    <p>Current User: {currentUser.uid}</p>
                                    <button onClick={() => handleDelete(event.id)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))}

                  </div>
                ) : (
                    <div className="container">Please log in or register.</div>
                )} />
                <Route path="/create-event" element={currentUser ? <CreateEvent currentUser={currentUser} /> : <Navigate to="/login" replace />} />
                <Route path="/my-events" element={<MyEvents currentUser={currentUser} />} />
            </Routes>
        </div>
    </div>
</Router>

  );
}

export default App;


