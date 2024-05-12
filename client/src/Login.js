import React, { useState } from 'react';
import { loginUser } from './apiService'; 
import { Link, useHistory } from 'react-router-dom'; 
import './Login.css'; // Importa el archivo CSS

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const history = useHistory(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            if (response && response.message === 'Login successful') {
                alert('Login successful');
                history.push(`/main/${response.user.firstName}`);
            } else {
                setLoginError('Invalid email or password');
            }
        } catch (error) {
            setLoginError('An error occurred while logging in');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <div id="logo" style={{textAlign: 'center'}}>
                <img src={require('./logoSblanca.png')} alt="Logo" />
            </div>
            <form onSubmit={handleLogin} className="login-form">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <div className="button-container">
                    <button type="submit">Enter</button>
                </div>
            </form>
            <Link to="/register" id="signup-link">Sign Up for SkillShare</Link>
            <br></br>
            <br></br>
            {loginError && <p>{loginError}</p>}
        </div>
    );
}

export default Login;
