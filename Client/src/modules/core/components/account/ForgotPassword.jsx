import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCircleArrowRight } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        let hasError = false;
        setEmailError('');
        if (!email) {
            setEmailError('Email không được để trống.');
            hasError = true;
        } else if (! /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setEmailError('Email không hợp lệ.');
            hasError = true;
        }
        if (!hasError) {
            console.log('forgotpassword with:', { email });
            setEmail('');
            setShowChangePasswordForm(true); // Hiển thị form đổi mật khẩu sau khi xử lý email thành công
        }
    };
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPasswordError('');
        if (newPassword !== confirmPassword) {
            setPasswordError('Mật khẩu không khớp.');
        } else {
            console.log('Password changed successfully');
            setNewPassword('');
            setConfirmPassword('');
            // Chuyển hướng về trang đăng nhập sau khi đổi mật khẩu thành công
            navigate('/sign-in');
        }
    };

    return (
        <div
            className="flex md:justify-center justify-center items-center"
            style={{
                background: `linear-gradient(90deg, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0) 35%), url('/thumbnail1.png')`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left',
                height: '120vh',
            }}>
            <div
                className="bg-white shadow-lg rounded-lg w-full md:max-w-md max-w-sm py-10 md:px-8 px-6 md:mr-9 md:mx-0 mx-4">
                <div className="flex flex-col">
                    {/* Logo */}
                    <motion.img src="/logo.png" alt="Logo" className="md:w-16 md:h-16 w-14 h-14 md:mb-4 mb-3"
                                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }} />

                    <motion.h1
                        className="md:text-3xl text-2xl font-bold text-gray-700 mb-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Quên mật khẩu
                    </motion.h1>

                    {/* Form nhập email */}
                    {!showChangePasswordForm && (
                        <form onSubmit={handleSubmit} className="w-full mt-5">
                            {/* Email */}
                            <motion.div
                                className="md:mb-4 mb-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9 }}
                            >
                                <input
                                    type="email"
                                    id="email"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out ${emailError ? 'border-red-500' : ''}`}
                                    placeholder="Nhập email của bạn"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
                            </motion.div>
                            <div
                                className="text-3xl mt-4 flex justify-center text-teal-400 cursor-pointer"
                                onClick={handleSubmit} // Nhấn vào icon sẽ submit form
                            >
                                <FaCircleArrowRight />
                            </div>
                        </form>
                    )}

                    {/* Form đổi mật khẩu */}
                    {showChangePasswordForm && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9 }}
                            className="mt-5"
                        >
                            <h2 className="text-xl font-bold text-gray-700 mb-4">Đổi mật khẩu</h2>
                            <form className="w-full" onSubmit={handlePasswordChange}>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                                        placeholder="Nhập mật khẩu mới"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                                        placeholder="Xác nhận mật khẩu mới"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
                                <button
                                    type="submit"
                                    className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                >
                                    Đổi mật khẩu
                                </button>
                            </form>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
