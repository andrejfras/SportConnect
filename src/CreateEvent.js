import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import "./CreateEvent.css"

function CreateEvent({ currentUser }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [dateTime, setDateTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Construct the new event object
        const newEvent = {
            title,
            description,
            location,
            dateTime,
            attendees: [currentUser.uid],
            creator: currentUser.uid  // Set the creator ID here
        };

        try {
            await addDoc(collection(db, 'events'), newEvent);
            // You might want to reset the form fields or navigate the user elsewhere
            setTitle('');
            setDescription('');
            setLocation('');
            setDateTime('');
        } catch (error) {
            console.error("Error adding event:", error);
            // Handle the error, maybe show an error message to the user
        }
    };

    return (
        <div className="container">
            <div className="content">
                <h2>Create Event</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Event Title"
                        required
                    />
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Event Description"
                        required
                    />
                    <input
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        placeholder="Event Location"
                        required
                    />
                    <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={e => setDateTime(e.target.value)}
                        required
                    />
                    <button type="submit">Create Event</button>
                </form>
            </div>
        </div>
    );
}

export default CreateEvent;
