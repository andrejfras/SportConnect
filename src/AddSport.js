import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

function AddSport() {
    const [name, setName] = useState('');
    const [numOfPlayers, setNumOfPlayers] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "sports"), {
                name,
                numOfPlayers: parseInt(numOfPlayers, 10)
            });
            setName('');
            setNumOfPlayers('');
            alert('Sport added successfully!');
        } catch (e) {
            console.error("Error adding sport: ", e);
        }
    };

    return (
        <div>
            <h2>Add Sport</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Sport Name"
                    required
                />
                <input 
                    value={numOfPlayers}
                    onChange={e => setNumOfPlayers(e.target.value)}
                    placeholder="Number of Players"
                    required
                    type="number"
                />
                <button type="submit">Add Sport</button>
            </form>
        </div>
    );
}

export default AddSport;
