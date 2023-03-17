import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.scss'
import Nav from './components/navbar/Nav';
import Dashboard from './pages/Dashboard';
import NewPost from './pages/NewPost';

function App() {
  const [usernameData, setUsernameData] = useState('');

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage setUsernameData={setUsernameData} />} />
        <Route path="/dashboard" element={<Dashboard usernameData={usernameData} />} />
        <Route path="/new_post" element={<NewPost usernameData={usernameData} />} />
      </Routes>
    </div>
  )
}

export default App
