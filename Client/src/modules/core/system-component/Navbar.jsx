import { useState } from 'react';

// Component cho Mega Menu
const MegaMenu = () => {
    return (
        <div className="mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600">
            <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
                <ul>
                    <li>
                        <a href="#" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 ease-in-out">
                            <div className="font-semibold">Online Stores</div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party tools that you are already using.</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 ease-in-out">
                            <div className="font-semibold">Segmentation</div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Segment your audience for targeted marketing.</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 ease-in-out">
                            <div className="font-semibold">Marketing CRM</div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Manage your customer relationships effectively.</span>
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="#" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 ease-in-out">
                            <div className="font-semibold">Online Stores</div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party tools that you are already using.</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 ease-in-out">
                            <div className="font-semibold">Segmentation</div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Segment your audience for targeted marketing.</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 ease-in-out">
                            <div className="font-semibold">Marketing CRM</div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Manage your customer relationships effectively.</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

// Component chính của Navbar
const Navbar = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

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
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
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
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>

                {/* Menu người dùng */}
                <div className="flex items-center md:order-2 space-x-4 md:space-x-8 rtl:space-x-reverse">
                    <div className="relative">
                        <button
                            type="button"
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
                            <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                <div className="px-4 py-3">
                                    <span className="block text-sm font-medium text-gray-900 dark:text-white">Tuan Anh</span>
                                    <span className="block text-sm text-gray-500 dark:text-gray-400">ngokhong@gmail.com</span>
                                </div>
                                <ul className="py-2">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navbar items cho màn hình lớn */}
                <div className="hidden md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">Trang Chủ</a>
                        </li>
                        <li>
                            <button
                                onClick={toggleMegaMenu}
                                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                                aria-haspopup="true"
                            >
                                Dịch Vụ
                                <svg className="w-2.5 h-2.5 ms-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Lớp Học</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Đặt Lịch</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Liên Hệ</a>
                        </li>
                    </ul>
                </div>

                {/* Menu di động */}
                {isMobileMenuOpen && (
                    <div id="navbar-menu" className="md:hidden">
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Home</a>
                            </li>
                            <li>
                                <button
                                    onClick={toggleMegaMenu}
                                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    aria-haspopup="true"
                                >
                                    Company
                                    <svg className="w-2.5 h-2.5 ms-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Services</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Contact</a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Mega menu */}
            {isMegaMenuOpen && <MegaMenu />}
        </nav>
    );
};

export default Navbar;
