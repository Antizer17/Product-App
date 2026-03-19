import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Status 200-299
                setMessage('Login Successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = '/'; 
                }, 1000);
            } else {
                // Status 401, 404, 500 etc.
                setMessage(data.message || 'Invalid username or password.');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            setMessage('Server connection failed. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // UI Styles (Keeping your existing aesthetic)
    const containerStyle = {
        maxWidth: '350px',
        margin: '80px auto',
        padding: '20px',
        textAlign: 'center',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        boxSizing: 'border-box',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px'
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        backgroundColor: isLoading ? '#ccc' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s'
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <button type="submit" disabled={isLoading} style={buttonStyle}>
                    {isLoading ? 'Authenticating...' : 'Login'}
                </button>
            </form>
            
            {message && (
                <p style={{ 
                    marginTop: '20px', 
                    padding: '10px',
                    borderRadius: '4px',
                    backgroundColor: message.includes('Successful') ? '#d4edda' : '#f8d7da',
                    color: message.includes('Successful') ? '#155724' : '#721c24' 
                }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default Login;