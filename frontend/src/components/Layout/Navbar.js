//nav bar component
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to="/" className="text-xl font-bold">CodeSync</Link>
                <div className="nav-links">
                    <Link to="/dashboard" className="mx-2">Dashboard</Link>
                    <Link to="/profile" className="mx-2">Profile</Link>
                    <Link to="/projects" className="mx-2">Projects</Link>
                    <Link to="/notifications" className="mx-2">Notifications</Link>
                    <Link to="/videochat" className="mx-2">Video Chat</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
