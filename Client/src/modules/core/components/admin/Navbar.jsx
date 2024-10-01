import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-green-500 p-4 fixed w-full z-10 shadow-lg"> {/* top 0 */}
            <div className="container mx-auto flex justify-between">
                <div className="text-white text-2xl font-bold">Quản Lý Sân Bóng</div>
                <div className="flex space-x-6">
                    <NavLink
                        to="/manage-soccer/list"
                        className={({ isActive }) =>
                            `text-white text-lg transition-colors duration-300 ease-in-out ${
                                isActive ? 'text-yellow-300 border-b-2 border-yellow-300' : 'hover:text-yellow-300'
                            }`
                        }
                    >
                        Danh Sách Sân
                    </NavLink>
                    <NavLink
                        to="/manage-soccer/lichdat"
                        className={({ isActive }) =>
                            `text-white text-lg transition-colors duration-300 ease-in-out ${
                                isActive ? 'text-yellow-300 border-b-2 border-yellow-300' : 'hover:text-yellow-300'
                            }`
                        }
                    >
                        Lịch Đặt
                    </NavLink>
                    <NavLink
                        to="/manage-soccer/thongke"
                        className={({ isActive }) =>
                            `text-white text-lg transition-colors duration-300 ease-in-out ${
                                isActive ? 'text-yellow-300 border-b-2 border-yellow-300' : 'hover:text-yellow-300'
                            }`
                        }
                    >
                        Thống Kê
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
