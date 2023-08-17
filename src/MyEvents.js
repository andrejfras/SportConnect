import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { unattendEvent } from './firebaseOps';

function MyEvents({ currentUser }) {
    const [myEvents, setMyEvents] = useState([]);

    const handleUnattend = (eventId) => {
        unattendEvent(eventId, currentUser)
            .then(() => {
                
                setMyEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
            })
            .catch(error => {
                console.error("Error unattending event:", error);
            });
    }

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
                        <button onClick={() => handleUnattend(event.id)}>Unattend</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyEvents;
