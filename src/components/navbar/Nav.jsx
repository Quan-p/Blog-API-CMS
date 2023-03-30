import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './nav.scss';

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const checkAuthentication = () => {
        const jwtToken = localStorage.getItem('jwtToken');
        setIsLoggedIn(!!jwtToken);
    }

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        localStorage.removeItem('authorId');
        setIsLoggedIn(false);
        navigate('/login');
        // window.location.href = '/login';
    }

    useEffect(() => {
        checkAuthentication();
    }, []);

    return (
        <div className="nav-container">
            <div className="left-container">
                {isLoggedIn ? (
                    <Link to='/dashboard' className="title">Quan's Blog</Link>
                ) : (
                    <Link to='/' className="title">Quan's Blog</Link>
                )}
            </div>
            <div className="right-container">
                {isLoggedIn ? (
                    <Link to='/dashboard' >Home</Link>
                ) : (
                    <Link to='/'>Home</Link>
                )}
                {isLoggedIn && <Link to='new_post'>New Post</Link>}
                {isLoggedIn && <button className='logout-btn' onClick={handleLogout}>Log Out</button>}
            </div>
            
        </div>
    )
}

export default Nav;