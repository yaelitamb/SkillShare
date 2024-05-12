import React, { useState } from 'react';
import { registerUser } from './apiService';
import { useHistory } from 'react-router-dom'; 
import './Register.css'; // Importa el archivo CSS

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [profilePhotoURL, setProfilePhotoURL] = useState('');
    const [registerError, setRegisterError] = useState('');
    const history = useHistory(); 

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(email, password, firstName, lastName, city, description, profilePhotoURL);
            if (response && response.message === 'Registration successful') {
                alert('Registration successful');
                history.push('/main');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            console.log('Error response:', error.response);
            if (error.response && error.response.data && error.response.data.error) {
                setRegisterError(error.response.data.error); // Update the state with the error message from the response
            } else {
                setRegisterError('An error occurred while registering user'); // Set a generic error message if no specific message is received
            }
        }
    };

    return (
        <div>
            <br></br>
            <div id="logo" className="small-logo" style={{textAlign: 'center'}}>
                <img src={require('./logoSblanca.png')} alt="Logo" />
            </div>
            <form onSubmit={handleRegister} className="register-form">
                <h2 className="form-title">Sign-up form</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="text" placeholder="Profile Photo URL" value={profilePhotoURL} onChange={(e) => setProfilePhotoURL(e.target.value)} />
                <div className="button-container">
                    <button type="submit">Register</button>
                </div>
            </form>
            {registerError && <p>{registerError}</p>} {/* Display the error message if it exists */}
        </div>
    );
}

export default Register;
