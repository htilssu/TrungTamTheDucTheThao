import { Outlet, NavLink } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const ManagementHome = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar cố định */}
            <Navbar/>

            {/* Đảm bảo khoảng cách với Navbar */}
            <div className="container mx-auto p-6 pt-20">
                <Outlet />
            </div>
        </div>
    );
};

export default ManagementHome;