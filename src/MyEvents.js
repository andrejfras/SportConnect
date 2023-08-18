import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { deleteEvent } from './firebaseOps';

function MyEvents({ currentUser }) {
    const [myEvents, setMyEvents] = useState([]);

    useEffect(() => {
        const fetchMyEvents = async () => {
            const eventsRef = collection(db, "events");
            const q = query(eventsRef, where("attendees", "array-contains", currentUser.uid));

            const querySnapshot = await getDocs(q);
            const eventsData = [];
            querySnapshot.forEach((doc) => {
                eventsData.push({ ...doc.data(), id: doc.id });
            });
            setMyEvents(eventsData);
        };

        fetchMyEvents();
    }, [currentUser]);

    const handleDelete = (eventId) => {
        deleteEvent(eventId)
            .then(() => {
                // Remove the event from the local state
                setMyEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
            })
            .catch(error => {
                console.error("Error deleting event:", error);
            });
    };

    return (
        <div className="my-events">
            <h2>My Events</h2>
            <ul>
                {myEvents.map(event => (
                    <li key={event.id}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>{event.location}</p>
                        <p>{event.dateTime}</p>
                        {event.creator !== currentUser.uid && (
                            <button onClick={() => handleDelete(event.id)}>Unattend</button>
                        )}
                        {event.creator === currentUser.uid && (
                            <button onClick={() => handleDelete(event.id)}>Delete</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyEvents;
