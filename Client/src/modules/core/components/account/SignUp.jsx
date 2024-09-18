import { useState } from 'react';
import { motion } from 'framer-motion';
import {FaFacebook, FaGithub} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {Link} from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    // State cho từng lỗi
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repasswordError, setRepasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        let hasError = false;

        // Reset lỗi
        setEmailError('');
        setPhoneError('');
        setPasswordError('');
        setRepasswordError('');

        // Kiểm tra các điều kiện cho từng trường
        if (!email) {
            setEmailError('Email không được để trống.');
            hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Email không hợp lệ.');
            hasError = true;
        }

        if (!phonenumber) {
            setPhoneError('Số điện thoại không được để trống.');
            hasError = true;
        } else if (!/^\d{10}$/.test(phonenumber)) {
            setPhoneError('Số điện thoại không hợp lệ.');
            hasError = true;
        }

        if (!password) {
            setPasswordError('Mật khẩu không được để trống.');
            hasError = true;
        } else if (password.length < 6) {
            setPasswordError('Mật khẩu phải có ít nhất 6 ký tự.');
            hasError = true;
        }

        if (password !== repassword) {
            setRepasswordError('Mật khẩu nhập lại không khớp.');
            hasError = true;
        }

        // Nếu không có lỗi, tiến hành đăng ký
        if (!hasError) {
            console.log('Signing up with:', { email, phonenumber, password });
            setEmail('');
            setPhonenumber('');
            setPassword('');
            setRepassword('');
        }
    };

    return (

        <div
            className="flex md:justify-end justify-center items-center"
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
                                initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}/>

                    {/* Sport Center */}
                    <motion.div
                        className="absolute top-28 left-0 transform -translate-y-1/2 px-4 lg:block hidden"
                        style={{width: '30%'}}
                        initial={{x: '-50%'}}
                        animate={{x: '35%'}}
                        transition={{duration: 1.4, ease: 'easeInOut'}}>

                        <h1 className="text-white shadow-lg"
                            style={{
                                fontFamily: 'Air Americana',
                                fontStyle: 'italic',
                                fontSize: '170px',
                                margin: '0',
                                lineHeight: '1.1',
                            }}>
                            SPORT
                        </h1>
                        <h1 className="text-white shadow-lg"
                            style={{
                                fontFamily: 'Air Americana',
                                fontStyle: 'italic',
                                fontSize: '140px',
                                margin: '0',
                                lineHeight: '1.1',
                            }}>
                            CENTER
                        </h1>
                    </motion.div>
                    <div className="flex flex-col">
                        <motion.h1
                            className="md:text-3xl text-2xl font-bold text-gray-700 mb-2"
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6}}
                        >
                            Đăng ký tài khoản
                        </motion.h1>

                        <motion.p
                            className="text-gray-500 mb-4"
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.7}}
                        >
                            Vui lòng điền thông tin để tạo tài khoản
                        </motion.p>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="w-full">
                            {/* Email */}
                            <motion.div
                                className="md:mb-4 mb-3"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.9}}
                            >
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
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

                            {/* Số điện thoại */}
                            <motion.div
                                className="md:mb-4 mb-3"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 1}}
                            >
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phonenumber">
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    id="phonenumber"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out ${phoneError ? 'border-red-500' : ''}`}
                                    placeholder="Nhập số điện thoại"
                                    value={phonenumber}
                                    onChange={(e) => setPhonenumber(e.target.value)}
                                />
                                {phoneError && <p className="text-red-500 text-sm mt-2">{phoneError}</p>}
                            </motion.div>

                            {/* Mật khẩu */}
                            <motion.div
                                className="md:mb-4 mb-3"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 1.1}}
                            >
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out ${passwordError ? 'border-red-500' : ''}`}
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                            </motion.div>

                            {/* Nhập lại mật khẩu */}
                            <motion.div
                                className="md:mb-6 mb-5"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 1.2}}
                            >
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repassword">
                                    Nhập lại mật khẩu
                                </label>
                                <input
                                    type="password"
                                    id="repassword"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out ${repasswordError ? 'border-red-500' : ''}`}
                                    placeholder="Nhập lại mật khẩu"
                                    value={repassword}
                                    onChange={(e) => setRepassword(e.target.value)}
                                />
                                {repasswordError && <p className="text-red-500 text-sm mt-2">{repasswordError}</p>}
                            </motion.div>

                            <motion.div
                                className="md:mb-4 mb-3"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 1.3}}
                            >
                                <button
                                    type="submit"
                                    className="w-full bg-teal-500 hover:bg-teal-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                                >
                                    Đăng ký
                                </button>
                            </motion.div>
                            <motion.div
                                className="md:mb-4 mb-3"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 1.3}}
                            >
                                <div className="flex items-center justify-center">
                                    <label className="text-center">
                                        Bạn đã có tài khoản?{' '}
                                        <Link to="/sign-in" className="text-blue-500 hover:text-blue-400">
                                            Đăng nhập
                                        </Link>
                                    </label>
                                </div>
                            </motion.div>
                            <motion.div className="flex items-center mb-6" initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}} transition={{duration: 1.4}}>
                                <div className="border-t border-gray-300 w-full"></div>
                                <p className="text-gray-500 px-4">or</p>
                                <div className="border-t border-gray-300 w-full"></div>
                            </motion.div>
                            <motion.div
                                className="md:mb-4 mb-3"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 1.3}}
                            >
                                <div className="flex justify-center space-x-5 mt-4">
                                    {/* Liên kết đến Google */}
                                    <a
                                        href="https://accounts.google.com/signin"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-4xl text-red-600"
                                    >
                                        <FcGoogle/>
                                    </a>

                                    {/* Liên kết đến Facebook */}
                                    <a
                                        href="https://www.facebook.com/login"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-4xl text-blue-600"
                                    >
                                        <FaFacebook/>
                                    </a>

                                    {/* Liên kết đến GitHub */}
                                    <a
                                        href="https://github.com/login"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-4xl text-gray-800"
                                    >
                                        <FaGithub/>
                                    </a>
                                </div>
                            </motion.div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
        ;
};

export default SignUp;
