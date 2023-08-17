import React from 'react';

function UserSidebar({ currentUser }) {
    if (!currentUser) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="user-sidebar">
        <h3>Welcome, {currentUser.firstName} {currentUser.lastName}</h3>
        <p>Email: {currentUser.email}</p>
        <p>Location: {currentUser.location}</p>
      </div>
    );
  }
  
  

export default UserSidebar;