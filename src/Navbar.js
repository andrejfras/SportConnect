import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ currentUser, handleLogout }) {
    return (
        <div className="navbar">
            <div className="navbar-content">
                <Link to="/">Home</Link>
                {currentUser && <Link to="/profile">Profile</Link>}
                <Link to='/create-event'>Create Event</Link>
                <Link to="/events">Events</Link>

            </div>
            {currentUser && (
                <div className="navbar-logout">
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                </div>
            )}
        </div>
    );
}

export default Navbar;
