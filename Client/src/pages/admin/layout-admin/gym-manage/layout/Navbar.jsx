import { NavLink, useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Button } from '@mui/material';

const Navbar = () => {
    const navigate = useNavigate();


    return (
        <div className=" w-full">
            <nav className="bg-gradient-to-r from-green-500 to-teal-500 w-full p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo / Title */}
                    <div className="flex items-center justify-center">
                        <Button 
                            variant="" 
                            onClick={() => navigate("/admin/post-manage")} 
                            startIcon={<IoArrowBackCircleSharp />}
                            style={{ color: "white"}} 
                        >
                        </Button>
                        <div className="text-white text-2xl font-medium tracking-wider transform transition-transform hover:scale-105">
                            Quản Lý Phòng Tập
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex space-x-8">
                        <NavLink
                            to="ad-room"
                            className={({ isActive }) =>
                                `text-white text-lg transition-colors duration-300 ease-in-out transform hover:scale-110 ${
                                    isActive
                                        ? 'text-yellow-300 border-b-4 border-yellow-400'
                                        : 'hover:text-yellow-300'
                                }`
                            }
                        >
                            <span className="hover:underline">Danh sách phòng tập</span>
                        </NavLink>
                        <NavLink
                            to="gym-course"
                            className={({ isActive }) =>
                                `text-white text-lg transition-colors duration-300 ease-in-out transform hover:scale-110 ${
                                    isActive
                                        ? 'text-yellow-300 border-b-4 border-yellow-400'
                                        : 'hover:text-yellow-300'
                                }`
                            }
                        >
                            <span className="hover:underline">Danh sách khóa học</span>
                        </NavLink>
                        <NavLink
                            to="gym-cost"
                            className={({ isActive }) =>
                                `text-white text-lg transition-colors duration-300 ease-in-out transform hover:scale-110 ${
                                    isActive
                                        ? 'text-yellow-300 border-b-4 border-yellow-400'
                                        : 'hover:text-yellow-300'
                                }`
                            }
                        >
                            <span className="hover:underline">Bảng giá</span>
                        </NavLink>
                        <NavLink
                            to="gym-statistical"
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
