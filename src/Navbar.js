import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ currentUser, handleLogout }) {
    return (
        <div className="navbar">
            <div className="navbar-content">
                <div className="navbar-logo">
                    SportConnect
                </div>
                <div className="navbar-links">
                    <Link to="/">Home</Link>
                    <Link to="/events">Events</Link>
                    {currentUser ? (
                        <>
                            <Link to="/create-event">Create Event</Link>
                            <Link to="/my-events">My Events</Link>
                            <Link to="/profile">Profile</Link>
                            <Link to="/" onClick={handleLogout}>Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Log In</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;

