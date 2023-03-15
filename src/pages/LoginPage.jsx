import React, { useState, useEffect } from "react";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch ('https://blog-api-ifcw.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                // Store the JWT in local storage
                localStorage.setItem('jwtToken', data.token);
                console.log('Token stored in local storage:', data.token);
                // Login was successful, do something here (e.g. redirect to dashboard)
                window.location.href = '/dashboard';
                console.log('Login successful:', data);
              } else {
                // Login failed, show an error message or something
                console.log('Login failed:', data.message);
              }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    return (
        <div>
            <h2>Welcome to Login Page</h2>
            {isLoading ? (
                <p>Logging In...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type='text' value={username} onChange={(event) => setUsername(event.target.value)} />
                </label>
                <label>
                    Password:
                    <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                <button type="submit">Log in</button>
            </form>
            )}
        </div>
    )
};

export default LoginPage;
