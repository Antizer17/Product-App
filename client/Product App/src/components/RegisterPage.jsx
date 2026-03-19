import React, { useState } from 'react';
import axios from 'axios';

const Register = () => { // Capitalized to match your main.jsx Route
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           
            const response = await fetch('http://localhost:5000/register', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({username:formData.username,
                    password:formData.password
                })

            });
            setMessage('hm')
            const data = await response.json()
            setMessage('hmmm')
            if (response.ok) {
                setMessage('Registration Successful! Redirecting...');
                console.log('success')
                window.location.href = '/'; // Or your dashboard
            }else {
            setMessage(data.message || 'Registration failed');
            console.log('fail D:')
        }
        } catch (error) {
            setMessage('Invalid username or password.');
            console.error('Registration Error:', error);
        }
    };

    return (
        <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Register
                </button>
            </form>
            {message && <p style={{ marginTop: '10px', color: message.includes('Successful') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
};

export default Register;