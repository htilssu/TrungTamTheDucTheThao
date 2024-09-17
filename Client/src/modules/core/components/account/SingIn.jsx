import { useState } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    console.log('Signing in with:', { email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <div
      className="flex md:justify-end justify-center items-center"
      style={{
    background: `linear-gradient(90deg, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0) 35%), url('/public/thumbnail1.png')`,
    backgroundSize: '100% 100%', // Đảm bảo ảnh giữ kích thước thực và chiếm 100% chiều cao
    backgroundRepeat: 'no-repeat', // Không lặp lại ảnh
    backgroundPosition: 'left', // Đặt ảnh vào giữa
    height: '120vh',
  }}


    >
      <div className="bg-white shadow-lg rounded-lg w-full md:max-w-md max-w-sm py-10 md:px-8 px-6 md:mr-9 md:mx-0 mx-4">
        {/* Form đăng nhập */}
        <div className="flex flex-col">
          {/* Logo */}
          <motion.img
            src="https://via.placeholder.com/50x50"
            alt="Logo"
            className="md:w-16 md:h-16 w-14 h-14 md:mb-4 mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />

<motion.div
  className="absolute top-28 left-0 transform -translate-y-1/2 px-4"
  style={{ width: '30%' }}
  initial={{ x: '-50%' }}
  animate={{ x: '35%' }}
  transition={{ duration: 1.4, ease: 'easeInOut' }}
>
  <h1
    className="text-white shadow-lg"
    style={{
      fontFamily: 'Air America',
      fontStyle: 'italic',
      fontSize: '170px',
      margin: '0', // Xóa khoảng cách trên và dưới
      lineHeight: '1.1', // Điều chỉnh khoảng cách dòng
    }}
  >
    SPORT
  </h1>
  <h1
    className="text-white shadow-lg"
    style={{
      fontFamily: 'Air America',
      fontStyle: 'italic',
      fontSize: '140px',
      margin: '0', // Xóa khoảng cách trên và dưới
      lineHeight: '1.1', // Điều chỉnh khoảng cách dòng
    }}
  >
    CENTER
  </h1>
</motion.div>

<motion.img
  src="/public/pngegg.png" // Đường dẫn đến hình ảnh của bạn
  alt="Moving Image"
  className="absolute bottom-0 left-1/3 transform -translate-x-1/2 " // Không sử dụng rotate của Tailwind
  style={{ 
    width: '300px' // Điều chỉnh kích thước theo ý muốn
  }}
  initial={{ x: '0%', y: '160%', rotate: 0 }} // Bắt đầu từ dưới
  animate={{ x: '-10%', y: '95%', rotate: 45 }} // Di chuyển theo đường chéo lên trên và xoay 45 độ
  transition={{ duration: 1.4, ease: 'easeInOut' }}
/>






          {/* Tiêu đề */}
          <motion.h1
            className="md:text-3xl text-2xl font-bold text-gray-700 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sport Center
          </motion.h1>

          {/* Mô tả */}
          <motion.p
            className="text-gray-500 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Welcome to Sport Center!
          </motion.p>
          <motion.p
            className="text-gray-400 mb-6 text-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Please sign in to your account and enjoy
          </motion.p>

          {/* Hiển thị lỗi */}
          {error && (
            <motion.p
              className="text-red-500 text-sm mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full">
            <motion.div
              className="md:mb-4 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>

            <motion.div
              className="md:mb-6 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </motion.div>

            <motion.div
              className="flex items-center justify-between md:mb-4 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="mr-2 leading-tight"
                />
                <label htmlFor="remember-me" className="text-gray-700 text-sm">
                  Nhớ mật khẩu
                </label>
              </div>
              <a
                href="#"
                className="inline-block align-baseline md:font-bold font-medium md:text-sm text-yellow-500 hover:text-yellow-400 transition duration-200"
              >
                Quên mật khẩu?
              </a>
            </motion.div>

            <motion.div
              className="md:mb-4 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
              >
                Đăng nhập
              </button>
            </motion.div>

            {/* Nếu chưa có tài khoản */}
            <motion.div
              className="flex md:mb-6 mb-5 items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3 }}
            >
              <p className="text-gray-500 text-sm">
                Nếu chưa có tài khoản?{' '}
                <a href="#" className="text-blue-500 hover:text-blue-400">
                  Đăng ký
                </a>
              </p>
            </motion.div>

            {/* Hoặc */}
            <motion.div
              className="flex items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4 }}
            >
              <div className="border-t border-gray-300 w-full"></div>
              <p className="text-gray-500 px-4">or</p>
              <div className="border-t border-gray-300 w-full"></div>
            </motion.div>

            {/* Hình ảnh */}
            <motion.div
              className="flex items-center justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
            >
              <img
                src="https://via.placeholder.com/40x40"
                alt="Icon 1"
                className="w-10 h-10"
              />
              <img
                src="https://via.placeholder.com/40x40"
                alt="Icon 2"
                className="w-10 h-10"
              />
              <img
                src="https://via.placeholder.com/40x40"
                alt="Icon 3"
                className="w-10 h-10"
              />
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
