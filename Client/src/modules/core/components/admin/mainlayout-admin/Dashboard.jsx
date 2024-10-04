import { useState } from 'react';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import Content from './Content.jsx';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <div className="flex">
            <Navbar />
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-48'}`}
            />
            <div className={`flex-1 mt-16 transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-12'}`}>
                <div className={""}>
                    <Content />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
