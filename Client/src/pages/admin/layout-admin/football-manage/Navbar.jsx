import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className=" w-full">
            <nav className="bg-gradient-to-r from-gray-800 to-teal-500 w-full p-4 px-14 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo / Title */}
                    <div className="text-white text-2xl font-medium tracking-wider transform transition-transform hover:scale-105">
                        Quản Lý Sân Bóng
                    </div>

                    {/* Links */}
                    <div className="flex space-x-8">
                        <NavLink
                            to="list"
                            className={({ isActive }) =>
                                `text-white text-lg transition-colors duration-300 ease-in-out transform hover:scale-110 ${
                                    isActive
                                        ? 'text-yellow-300 border-b-4 border-yellow-400'
                                        : 'hover:text-yellow-300'
                                }`
                            }
                        >
                            <span className="hover:underline">Danh Sách Sân</span>
                        </NavLink>
                        <NavLink
                            to="lichdat"
                            className={({ isActive }) =>
                                `text-white text-lg transition-colors duration-300 ease-in-out transform hover:scale-110 ${
                                    isActive
                                        ? 'text-yellow-300 border-b-4 border-yellow-400'
                                        : 'hover:text-yellow-300'
                                }`
                            }
                        >
                            <span className="hover:underline">Lịch Đặt</span>
                        </NavLink>
                        <NavLink
                            to="thongke"
                            className={({ isActive }) =>
                                `text-white text-lg transition-colors duration-300 ease-in-out transform hover:scale-110 ${
                                    isActive
                                        ? 'text-yellow-300 border-b-4 border-yellow-400'
                                        : 'hover:text-yellow-300'
                                }`
                            }
                        >
                            <span className="hover:underline">Thống Kê</span>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
