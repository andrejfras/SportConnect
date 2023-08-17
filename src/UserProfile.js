import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Login from './Login';
import Register from './Register';
import './UserProfile.css'

function App() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        location: {
            country: "",
            city: ""
        },
        sports: [],
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            setUser(userAuth);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const userRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(userRef);
                
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (!data.sports) {
                        data.sports = [];
                    }
                    if (!data.location) {
                        data.location = { country: "", city: "" };
                    }
                    setUserData(data);
                } else {
                    console.log("No such document!");
                    setUserData({
                        firstName: "",
                        lastName: "",
                        gender: "",
                        birthDate: "",
                        location: {
                            country: "",
                            city: ""
                        },
                        sports: [],
                    });
                }
            };
            fetchData();
        }
    }, [user]);

    const handleUpdate = async () => {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, userData, { merge: true });
    };

    return (
        <div className="user-profile-container">
            <div className="user-profile-content">
                {!user ? (
                    <>
                        <Login />
                        <Register />
                    </>
                ) : (
                    <>
                        <h2>User Profile</h2>
                       
                        <input 
                            value={userData.firstName}
                            onChange={e => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                            placeholder="First Name"
                        />

                        <input 
                            value={userData.lastName}
                            onChange={e => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                            placeholder="Last Name"
                        />

                        <select 
                            value={userData.gender}
                            onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>

                        <input 
                            type="date"
                            value={userData.birthDate}
                            onChange={e => setUserData(prev => ({ ...prev, birthDate: e.target.value }))}
                        />
                        <input
                            value={userData.location ? userData.location.country : ""}
                            onChange={e => setUserData(prev => ({ ...prev, location: { ...prev.location, country: e.target.value } }))}
                            placeholder="Country"
                        />
                        <input
                            value={userData.location ? userData.location.city : ""}
                            onChange={e => setUserData(prev => ({ ...prev, location: { ...prev.location, city: e.target.value } }))}
                            placeholder="City"
                        />
                        <div>
                            <h3>Choose sports</h3>
                            <div className="checkbox-container">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={userData.sports ? userData.sports.includes("football") : false}
                                    onChange={() => {
                                        const newSports = userData.sports.includes("football")
                                            ? userData.sports.filter(skill => skill !== "football")
                                            : [...userData.sports, "football"];
                                        setUserData(prev => ({ ...prev, sports: newSports }));
                                    }}
                                />
                                Football
                            </label>
                            </div>
                            <div className="checkbox-container">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={userData.sports ? userData.sports.includes("basketball") : false}
                                    onChange={() => {
                                        const newSports = userData.sports.includes("basketball")
                                            ? userData.sports.filter(skill => skill !== "basketball")
                                            : [...userData.sports, "basketball"];
                                        setUserData(prev => ({ ...prev, sports: newSports }));
                                    }}
                                />
                                Basketball
                            </label>
                            </div>
                            <div className="checkbox-container">  
                            <label>
                                <input
                                    type="checkbox"
                                    checked={userData.sports ? userData.sports.includes("volleyball") : false}
                                    onChange={() => {
                                        const newSports = userData.sports.includes("volleyball")
                                            ? userData.sports.filter(skill => skill !== "volleyball")
                                            : [...userData.sports, "volleyball"];
                                        setUserData(prev => ({ ...prev, sports: newSports }));
                                    }}
                                />
                                Volleyball
                            </label>
                            </div>
                            <div className="checkbox-container">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={userData.sports ? userData.sports.includes("handball") : false}
                                    onChange={() => {
                                        const newSports = userData.sports.includes("handball")
                                            ? userData.sports.filter(skill => skill !== "handball")
                                            : [...userData.sports, "handball"];
                                        setUserData(prev => ({ ...prev, sports: newSports }));
                                    }}
                                />
                                Handball
                            </label>
                            </div>
                        </div>
                        <button onClick={handleUpdate}>Update Profile</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
