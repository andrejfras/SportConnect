import { db } from './firebase'; 
import { doc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

export const getEvents = async () => {
    const eventsRef = collection(db, "events");
    const snapshot = await getDocs(eventsRef);
    const events = [];
    snapshot.forEach(doc => {
        events.push({ ...doc.data(), id: doc.id });
    });
    return events;
};


export const attendEvent = async (eventId, currentUser) => {
    const eventRef = doc(db, 'events', eventId);
    await updateDoc(eventRef, {
        attendees: arrayUnion(currentUser.uid)
    });
};

export const unattendEvent = async (eventId, currentUser) => {
    const eventRef = doc(db, 'events', eventId);
    await updateDoc(eventRef, {
        attendees: arrayRemove(currentUser.uid)
    });
};


export const deleteEvent = async (eventId) => {
    const eventRef = doc(db, 'events', eventId);
    await deleteDoc(eventRef);
};

