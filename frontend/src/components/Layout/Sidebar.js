import React from 'react';
import { Link } from 'react-router-dom';
import { HiHome, HiUser, HiBell, HiCog, HiDocument, HiVideoCamera, HiPencil } from 'react-icons/hi';

const Sidebar = ({ isCollapsed, handleToggleSidebar }) => {
    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button 
                className="toggle-sidebar-btn"
                onClick={handleToggleSidebar}
            >
                {isCollapsed ? 'Menu' : 'Hide Menu'}
            </button>
            <ul>
                <li>
                    <Link to="/dashboard">
                        <HiHome size={24} />
                        {!isCollapsed && 'Dashboard'}
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <HiUser size={24} />
                        {!isCollapsed && 'Profile'}
                    </Link>
                </li>
                <li>
                    <Link to="/notifications">
                        <HiBell size={24} />
                        {!isCollapsed && 'Notifications'}
                    </Link>
                </li>
                <li>
                    <Link to="/settings">
                        <HiCog size={24} />
                        {!isCollapsed && 'Settings'}
                    </Link>
                </li>
                <li>
                    <Link to="/projects">
                        <HiDocument size={24} />
                        {!isCollapsed && 'Projects'}
                    </Link>
                </li>
                <li>
                    <Link to="/editor">
                        <HiPencil size={24} />
                        {!isCollapsed && 'Editor'}
                    </Link>
                </li>
                <li>
                    <Link to="/videochat">
                        <HiVideoCamera size={24} />
                        {!isCollapsed && 'Video Chat'}
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
