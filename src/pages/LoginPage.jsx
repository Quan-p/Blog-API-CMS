import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import './loginPage.scss';

const LoginPage = ({ setIsLoggedIn }) => {
	const [username, setUsernameInput] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		try {
			const response = await fetch(
				'https://blog-api-ifcw.onrender.com/login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ username, password }),
				}
			);
			const data = await response.json();
			if (response.ok) {
				// Store the JWT in local storage
				sessionStorage.setItem('jwtToken', data.token);
				sessionStorage.setItem('username', data.body.username);
				sessionStorage.setItem('authorId', data.body._id);
				setIsLoggedIn(true);
				console.log('Token stored in local storage:', data.token);
				navigate('/dashboard');
				console.log('Login successful:', data);
			} else {
				// Login failed, show an error message or something
				console.log('Login failed:', data.message);
			}
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	return (
		<div className='body'>
			<div className='login-container'>
				{isLoading ? (
					<BounceLoader color='#1d3557' size={25} />
				) : (
					<form className='login-form' onSubmit={handleSubmit}>
						<label>Username:</label>
						<input
							type='text'
							value={username}
							onChange={(event) =>
								setUsernameInput(event.target.value)
							}
						/>
						<label>Password:</label>
						<input
							type='password'
							value={password}
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>
						<button className='login-btn' type='submit'>
							Log in
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default LoginPage;
