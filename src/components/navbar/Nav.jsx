import React from "react";
import { Link } from "react-router-dom";
import './nav.scss';

const Nav = () => {
    const isLoggedIn = !!localStorage.getItem('jwtToken');

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = '/login';
    }

    return (
        <div className="nav-container">
            <div className="left-container">
                <Link to='/' className="title">Quan's Blog</Link>
            </div>
            <div className="right-container">
                <Link to='/'>Home</Link>
                {isLoggedIn && <Link to='posts'>New Post</Link>}
                {isLoggedIn && <button onClick={handleLogout}>Log Out</button>}
            </div>
            
        </div>
    )
}

export default Nav;