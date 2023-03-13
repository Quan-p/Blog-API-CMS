import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.scss'
import Nav from './components/navbar/Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
