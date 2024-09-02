import React, { useState } from 'react';
import { HiHome, HiUser, HiBell, HiCog, HiDocument, HiVideoCamera } from 'react-icons/hi';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import '../styles/main.scss';  // Correctly import the CSS file

const WelcomePage = () => {
    const [collapsed, setCollapsed] = useState(true);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="welcome-page">
            <Navbar />
            <div className="flex">
                {/* Pass the handleToggleSidebar function to the Sidebar component */}
                <Sidebar isCollapsed={collapsed} handleToggleSidebar={handleToggleSidebar} />

                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>

                    
                </main>
            </div>
        </div>
    );
};

export default WelcomePage;
