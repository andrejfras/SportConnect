import React, { useState } from 'react';
import { db } from './firebase';  // Ensure you've exported Firestore from firebase.js
import { collection, addDoc } from 'firebase/firestore';

function CreateEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [dateTime, setDateTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Save the event details to Firestore
        try {
            await addDoc(collection(db, "events"), {
                title,
                description,
                location,
                dateTime,
                creator: 'TODO: Add user ID here', // You'll need to replace this with the actual user ID once user authentication is implemented
                attendees: []
            });
            console.log("Event created successfully!");
        } catch (error) {
            console.error("Error creating event: ", error);
        }

        // Clear the form
        setTitle('');
        setDescription('');
        setLocation('');
        setDateTime('');
    };

    return (
        <div>
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
    );
}

export default CreateEvent;
