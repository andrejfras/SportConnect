import './Register.css';
import React, { useState } from 'react';
import { auth } from './firebase';  
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Registered successfully:', userCredential.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="branding">
          <h3>SportConnect</h3>
          <h1>Register</h1>
      </div>

      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleRegister}>Register</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
