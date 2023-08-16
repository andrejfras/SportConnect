import React, { useState, useEffect } from 'react';
import { db } from './firebase';  // Ensure you've exported Firestore from firebase.js
import { collection, query, getDocs } from 'firebase/firestore';

function EventsList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsQuery = query(collection(db, "events"));
            const querySnapshot = await getDocs(eventsQuery);

            const loadedEvents = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setEvents(loadedEvents);
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <h2>Upcoming Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>Location: {event.location}</p>
                        <p>Date & Time: {event.dateTime}</p>
                        {/* Add button or link to view event details if needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventsList;
