import React, { useState, useEffect } from "react";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {

    }

    return (
        <div>
            <h2>Welcome to Login Page</h2>
            <form>
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
        </div>
    )
};

export default LoginPage;
