import { Outlet } from "react-router-dom";
import NavbarRoom from './layout/NavbarRoom';


const RoomLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 w-full">
            <div>
                <NavbarRoom/>
            </div>

            {/* Đảm bảo khoảng cách với Navbar */}
            <div className="container mx-auto p-4 pt-10">
                <Outlet />
            </div>
        </div>
    );
};

export default RoomLayout;