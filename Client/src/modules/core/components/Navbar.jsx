import {useEffect, useRef, useState} from 'react';

// Component cho một Menu Item
// eslint-disable-next-line react/prop-types
const MegaItem = ({ title, description, link }) => {
    return (
        <a href={link} className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 ease-in-out">
            <div className="font-semibold">{title}</div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{description}</span>
        </a>
    );
};

// Component Mega Menu
const MegaMenu = () => {
    const menuItems = [
        {
            title: "CLB GYM",
            description: "Connect with third-party tools that you are already using.",
            link: "/online-stores"
        },
        {
            title: "SÂN BÓNG",
            description: "Segment your audience for targeted marketing.",
            link: "/soocer"
        },
        {
            title: "SÂN BÓNG RỔ",
            description: "Manage your customer relationships effectively.",
            link: "/marketing-crm"
        },
        {
            title: "SÂN TENNIS",
            description: "Analyze data to make informed decisions.",
            link: "/analytics"
        }
        ,
        {
            title: "TUẤN MÈO",
            description: "Analyze data to make informed decisions.",
            link: "/analytics"
        }
    ];

    return (
        <div className="mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600">
            <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
                {menuItems.map((item, index) => (
                    <MegaItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        link={item.link}
                    />
                ))}
            </div>
        </div>
    );
};

const UserMenuItem = ({ link, text }) => {
    return (
        <li>
            <a
                href={link}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
                {text}
            </a>
        </li>
    );
};

// Component chính của Navbar
const Navbar = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toggle User Menu
    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };
    const UsermenuRef = useRef(null); // Ref cho UserMenu
    const UserbuttonRef = useRef(null); // Ref cho nút UserMenu

    // Đóng menu user khi nhấn bên ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (UsermenuRef.current && !UsermenuRef.current.contains(event.target) && UserbuttonRef.current && !UserbuttonRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        // Gán sự kiện mousedown cho document
        document.addEventListener('mousedown', handleClickOutside);
        // Xóa sự kiện khi component bị hủy
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const menuRef = useRef(null); // Ref cho MegaMenu
    const buttonRef = useRef(null); // Ref cho nút "Dịch Vụ"
    // Hàm xử lý sự kiện khi chuột rời khỏi khu vực menu hoặc nút "Dịch Vụ"
    const handleMouseLeave = (event) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.relatedTarget) &&  // Kiểm tra nếu chuột không đi vào trong menu
            buttonRef.current &&
            !buttonRef.current.contains(event.relatedTarget)   // Kiểm tra nếu chuột không đi vào trong nút "Dịch Vụ"
        ) {
            setIsMegaMenuOpen(false);  // Đóng menu
        }
    };

    // Toggle Mega Menu
    const toggleMegaMenu = () => {
        setIsMegaMenuOpen(!isMegaMenuOpen);
    };
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo và Tiêu đề */}
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/vite.svg" className="h-8" alt="Logo" />
                    <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">SPORT CENTER</span>
                </a>

                {/* Biểu tượng menu trên di động */}
                <button
                    data-collapse-toggle="navbar-menu"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                    aria-controls="navbar-menu"
                    aria-expanded={isMobileMenuOpen}
                    onClick={toggleMobileMenu}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                {/* Menu người dùng */}
                <div className="flex items-center md:order-2 space-x-4 md:space-x-8 rtl:space-x-reverse">
                    <div className="relative">
                        <button
                            type="button"
                            ref={UserbuttonRef}
                            onClick={toggleUserMenu}
                            className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            aria-expanded={isUserMenuOpen}
                            aria-haspopup="true"
                        >
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="/avatarH.png" alt="User Avatar" />
                        </button>

                        {/* User menu dropdown */}
                        {isUserMenuOpen && (
                            <div ref={UsermenuRef} className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                <div className="px-4 py-3">
                                    <span className="block text-sm font-medium text-gray-900 dark:text-white">Tuan Anh</span>
                                    <span className="block text-sm text-gray-500 dark:text-gray-400">ngokhong@gmail.com</span>
                                </div>
                                <ul className="py-2">
                                    <UserMenuItem link="/dashboard" text="Dashboard" />
                                    <UserMenuItem link="/settings" text="Settings" />
                                    <UserMenuItem link="/earnings" text="Earnings" />
                                    <UserMenuItem link="/logout" text="Sign out" />
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navbar items cho màn hình lớn */}
                <div className="hidden md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="/"
                               className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">Trang
                                Chủ</a>
                        </li>
                        <li>
                            <div className="flex space-x-4">
                                <button
                                    ref={buttonRef}
                                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                                    className={`flex items-center text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition duration-200 ${isMegaMenuOpen ? 'text-blue-600' : ''}`}
                                >
                                    Dịch Vụ
                                    {/* Mũi tên biểu tượng thay đổi */}
                                    <svg
                                        className={`ml-2 w-4 h-4 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : 'rotate-0'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                            </div>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Khóa Học</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Đặt
                                Lịch</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Liên Hệ</a>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Menu di động */}
            {isMobileMenuOpen && (
                <div id="navbar-menu" className="md:hidden">
                    <ul className="flex flex-col p-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <li>
                            <a href="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Trang Chủ</a>
                        </li>
                        <li>
                            {/* Nút Dịch Vụ */}
                            <div className="py-2 px-3">
                                <button
                                    onClick={toggleMegaMenu}
                                    className={`flex items-center text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition duration-200 ${isMegaMenuOpen ? 'text-blue-600' : ''}`}
                                >
                                    Dịch Vụ
                                    {/* Mũi tên biểu tượng thay đổi */}
                                    <svg
                                        className={`ml-2 w-4 h-4 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : 'rotate-0'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                            </div>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Khóa Học</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Đặt Lịch</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Liên Hệ</a>
                        </li>
                    </ul>
                </div>
            )}

            {/* Mega menu xuất hiện khi isMegaMenuOpen là true */}
            {isMegaMenuOpen && (
                <div
                    ref={menuRef}
                    onMouseLeave={handleMouseLeave} // Gọi hàm xử lý khi rời khỏi menu
                    onMouseEnter={() => setIsMegaMenuOpen(true)} // Giữ menu mở khi chuột vào bên trong MegaMenu
                >
                    <MegaMenu />
                </div>
            )}
        </nav>
    );
};

export default Navbar;
