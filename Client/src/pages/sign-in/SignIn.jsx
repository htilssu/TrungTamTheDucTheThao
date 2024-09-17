import {useState} from 'react';
import {motion, progress} from 'framer-motion';
import {FcGoogle} from 'react-icons/fc'; //google icon
import {BsFacebook} from 'react-icons/bs'; //facebook icon

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ.');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    setError('');
    if (process.env.NODE_ENV === 'development') {
      console.log('Signing in with email:', email);
    }
    setEmail('');
    setPassword('');
  };

  return (
      <div
          className="flex relative md:justify-end h-screen max-h-screen overflow-y-hidden justify-center items-center"
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
            <motion.img src="/logo.png" alt="Logo" className="md:w-16 md:h-16 w-14 h-14 md:mb-4 mb-3" initial={{
              opacity: 0,
              y: -20,
            }} animate={{
              opacity: 1,
              y: 0,
            }} transition={{duration: 0.5}}/>

            {/* Sport Center */}
            <motion.div
                className="absolute top-28 left-0 transform -translate-y-1/2 px-4 lg:block hidden"
                style={{width: '30%'}}
                initial={{x: '-50%'}}
                animate={{x: '35%'}}
                transition={{
                  duration: 1.4,
                  ease: 'easeInOut',
                }}>

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

            {/* Image */}
            <motion.img alt="Moving Image"
                        src="/pngegg.png"
                        className="absolute bottom-0 left-1/3 transform -translate-x-1/2 lg:block hidden"
                        style={{width: '300px'}}
                        initial={{
                          x: '0%',
                          y: '160%',
                          rotate: 0,
                        }}
                        animate={{
                          x: '-10%',
                          y: '95%',
                          rotate: 45,
                        }}
                        transition={{
                          duration: 1.4,
                          ease: 'easeInOut',
                        }}
            />

            {/* Title */}
            <motion.h1
                className="md:text-3xl text-2xl font-bold text-gray-700 mb-2"
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{duration: 0.6}}
            >
              Sport Center
            </motion.h1>

            {/* Description */}
            <motion.p
                className="text-gray-500 mb-4"
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{duration: 0.7}}
            >
              Welcome to Sport Center!
            </motion.p>
            <motion.p
                className="text-gray-400 mb-6 text-sm"
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
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
                  className="md:mb-4 mb-3" initial={{
                opacity: 0,
                y: 20,
              }} animate={{
                opacity: 1,
                y: 0,
              }} transition={{duration: 0.9}}>
                {/* Email Label */}
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                {/* Email Input */}
                <input type="email" id="email"
                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                       placeholder="Nhập email của bạn"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                />
              </motion.div>

              {/* Password */}
              <motion.div className="md:mb-6 mb-5" initial={{
                opacity: 0,
                y: 20,
              }} animate={{
                opacity: 1,
                y: 0,
              }} transition={{duration: 1}}>
                {/* Password Laybel */}
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Mật khẩu
                </label>
                {/* Password Input */}
                <input type="password" id="password"
                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                       placeholder="Nhập mật khẩu"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                />
              </motion.div>

              {/* Checkbox Remember and Forgot Password*/}
              <motion.div className="flex items-center justify-between md:mb-4 mb-3" initial={{
                opacity: 0,
                y: 20,
              }} animate={{
                opacity: 1,
                y: 0,
              }} transition={{duration: 1.1}}>
                <div className="flex items-center">
                  <input type="checkbox" id="remember-me" className="mr-2 leading-tight"/>
                  <label htmlFor="remember-me" className="text-gray-700 text-sm">
                    Nhớ mật khẩu
                  </label>
                </div>
                <a href="/forgot-password"
                   className="inline-block align-baseline md:font-bold font-medium md:text-sm text-teal-500 hover:text-teal-400 transition duration-200">
                  Quên mật khẩu?
                </a>
              </motion.div>

              {/* Sign In Button */}
              <motion.div className="md:mb-4 mb-3" initial={{
                opacity: 0,
                y: 20,
              }} animate={{
                opacity: 1,
                y: 0,
              }} transition={{duration: 1.2}}>
                <button type="submit"
                        className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200">
                  Đăng nhập
                </button>
              </motion.div>

              {/* No Account */}
              <motion.div className="flex md:mb-6 mb-5 items-center justify-center" initial={{
                opacity: 0,
                y: 20,
              }} animate={{
                opacity: 1,
                y: 0,
              }} transition={{duration: 1.3}}>
                <p className="text-gray-500 text-sm">
                  Nếu chưa có tài khoản?{' '}
                  <a href="/register" className="text-blue-500 hover:text-blue-400">
                    Đăng ký
                  </a>
                </p>
              </motion.div>

              {/* Option Login */}
              <motion.div className="flex items-center mb-6" initial={{
                opacity: 0,
                y: 20,
              }} animate={{
                opacity: 1,
                y: 0,
              }} transition={{duration: 1.4}}>
                <div className="border-t border-gray-300 w-full"></div>
                <p className="text-gray-500 px-4">or</p>
                <div className="border-t border-gray-300 w-full"></div>
              </motion.div>

              <motion.div
                  className="flex items-center justify-center space-x-4"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{duration: 1.5}}
              >
                {/* Google */}
                <div className="w-10 h-10">
                  <FcGoogle className="w-full h-full" alt="Google Icon"/>
                </div>
                {/* Facebook */}
                <div className="w-10 h-10 mt-1">
                  <BsFacebook style={{
                    color: '#1877F2',
                    fontSize: '35px',
                  }}/>
                </div>
                {/* Instagram */}
                <div className="w-11 h-11">
                  <img
                      src="/instagram.png"
                      alt="Instagram Icon"
                      className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default SignIn;
