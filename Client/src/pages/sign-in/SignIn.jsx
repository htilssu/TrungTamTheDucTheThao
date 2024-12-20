import {useState} from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {signIn} from '../../utils/auth.util.js';
import {saveToken} from '../../utils/token.util.js';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    let hasError = false;

    const showToast = (message) => {
      const toastId = message;
      if (!toast.isActive(toastId)) {
          toast.error(message, {toastId});
      }
      return false;
    };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      showToast('Email không được để trống.');
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setError('Email không hợp lệ.');
      hasError = true;
    }

    if (!password.trim()) {
      showToast('Mật khẩu không được để trống.');
      hasError = true;
    } else if (password.length < 6 || password.length > 18) {
      showToast('Mật khẩu phải từ 6 kí tự đến 18 kí tự.');
      return true;}
    if (import.meta.env.DEV) {
      console.log('Signing in with email:', email);
    }

    if (!hasError) {
      const data = await (await signIn(email, password)).json();
        //save token
        if (import.meta.env.DEV) {
          console.log('data =', data);
        }
        const token = data.detail;
        saveToken(token);
        if (import.meta.env.DEV) {
          console.log('token =', token);
        }
        if (token) {
          toast.success('Đăng nhập tài khoản thành công!');
          navigate('/');
        } else {
          showToast('Email hoặc mật khẩu không chính xác.');
        }

    }

  }

  return (
      <div
          className="flex md:justify-end justify-center items-center"
          style={{
            background: `linear-gradient(90deg, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0) 35%), url('/thumbnail1.png')`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left',
            height: '120vh',
          }}
      >
        <div
            className="bg-white shadow-xl border-2 border-r-gray-700 w-full md:max-w-md max-w-sm py-10 md:px-8 px-6 md:mr-9 md:mx-0 mx-4">
          <div className="flex flex-col">
            {/* Logo */}
            <motion.img
                src="/logo.png"
                alt="Logo"
                className="md:w-16 md:h-16 w-14 h-14 md:mb-4 mb-3"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            />
            {/* Sport Center */}
            <motion.div
                className="absolute top-3 left-0 transform -translate-y-1/2 px-4 lg:block hidden"
                style={{width: '30%'}}
                initial={{x: '-50%'}}
                animate={{x: '35%'}}
                transition={{duration: 1.4, ease: 'easeInOut'}}
            >
              <h1
                  className="text-white shadow-lg"
                  style={{
                    fontFamily: 'Air Americana',
                    fontStyle: 'italic',
                    fontSize: '170px',
                    margin: '0',
                    lineHeight: '1.1',
                  }}
              >
                SPORT
              </h1>
              <h1
                  className="text-white shadow-lg"
                  style={{
                    fontFamily: 'Air Americana',
                    fontStyle: 'italic',
                    fontSize: '140px',
                    margin: '0',
                    lineHeight: '1.1',
                  }}
              >
                CENTER
              </h1>
            </motion.div>
            {/* Title */}
            <motion.h1
                className="md:text-3xl text-2xl font-bold text-gray-700 mb-2"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
              Sport Center
            </motion.h1>
            {/* Description */}
            <motion.p
                className="text-gray-500 mb-4"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7}}
            >
              Welcome to Sport Center!
            </motion.p>
            <motion.p
                className="text-gray-400 mb-6 text-sm"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
            >
              Please sign in to your account and enjoy
            </motion.p>
            {/* Log Error */}
            {error && (
                <motion.p
                    className="text-red-500 text-sm mb-4"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5}}
                >
                  {error}
                </motion.p>
            )}
            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full">
              {/* Email */}
              <motion.div
                  className="md:mb-4 mb-3"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.9}}
              >
                {/* Email Label */}
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                >
                  Email
                </label>
                {/* Email Input */}
                <input
                    type="email"
                    id="email"
                    className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
              </motion.div>
              {/* Password */}
              <motion.div
                  className="md:mb-6 mb-5"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 1}}
              >
                {/* Password Laybel */}
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                >
                  Mật khẩu
                </label>
                {/* Password Input */}
                <input
                    type="password"
                    id="password"
                    className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
              </motion.div>
              {/* Checkbox Remember and Forgot Password*/}
              <motion.div
                  className="flex items-center justify-between md:mb-4 mb-3"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 1.1}}
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
                    href="/forgot-password"
                    className="inline-block align-baseline md:font-bold font-medium md:text-sm text-teal-500 hover:text-teal-400 transition duration-200"
                >
                  Quên mật khẩu?
                </a>
              </motion.div>
              {/* Sign In Button */}
              <motion.div
                  className="md:mb-4 mb-3"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 1.2}}
              >
                <button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition duration-200"
                >
                  Đăng nhập
                </button>
              </motion.div>
              {/* No Account */}
              <motion.div
                  className="flex md:mb-6 mb-5 items-center justify-center"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 1.3}}
              >
                <p className="text-gray-500 text-sm">
                  Nếu chưa có tài khoản?{' '}
                  <a
                      href="/sign-up"
                      className="text-blue-500 hover:text-blue-400"
                  >
                    Đăng ký
                  </a>
                </p>
              </motion.div>
            </form>
            <ToastContainer/>
          </div>
        </div>
      </div>);
};

export default SignIn;