import React, { useState } from 'react';
import { db } from './firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import "./CreateEvent.css"

function CreateEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [dateTime, setDateTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

    
        try {
            await addDoc(collection(db, "events"), {
                title,
                description,
                location,
                dateTime,
                creator: 'TODO: Add user ID here', 
                attendees: []
            });
            console.log("Event created successfully!");
        } catch (error) {
            console.error("Error creating event: ", error);
        }

       
        setTitle('');
        setDescription('');
        setLocation('');
        setDateTime('');
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
