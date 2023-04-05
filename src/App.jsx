import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.scss';
import Nav from './components/navbar/Nav';
import Dashboard from './pages/Dashboard';
import NewPost from './pages/NewPost';
import PostDetails from './pages/PostDetails';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<div className='App'>
			<Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
			<Routes>
				<Route
					path='/'
					element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
				/>
				<Route
					path='/login'
					element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
				/>
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/new_post' element={<NewPost />} />
				<Route path='/posts/:postid' element={<PostDetails />} />
			</Routes>
		</div>
	);
}

export default App;
