import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";

const RoomLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 w-full">
            <div>
                <Navbar/>
            </div>

            {/* Đảm bảo khoảng cách với Navbar */}
            <div className="container mx-auto p-4 pt-10">
                <Outlet />
            </div>
        </div>
    );
};

export default RoomLayout;