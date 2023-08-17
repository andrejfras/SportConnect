import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { attendEvent } from './firebaseOps';

function EventsList({ events: eventsProp, currentUser }) {
    const [allEvents, setAllEvents] = useState([]);  

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsSnapshot = await getDocs(collection(db, "events"));
            setAllEvents(eventsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        fetchEvents();
    }, []);

    return (
        <div>
            {allEvents.map(event => (  
                <div key={event.id}>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p>Location: {event.location}</p>
                    <p>Date and Time: {event.dateTime}</p>
                    <p>Number of Attendees: {event.attendees ? event.attendees.length : 0}</p>
                    {currentUser && !event.attendees.includes(currentUser.uid) && (<button onClick={() => attendEvent(event.id, currentUser)}>Attend</button>)}
                    {console.log("Event ID:", event.id)}
                    {console.log("Attendees:", event.attendees)}
                    {console.log("CurrentUser UID:", currentUser && currentUser.uid)}

                </div>
            ))}
        </div>
    );
}

export default EventsList;
