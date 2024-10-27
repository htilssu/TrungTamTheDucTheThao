import { useState } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState(true);
  const [dob, setDob] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRepassword] = useState('');
  const [isMale, setIsMale] = useState(true);
  const navigate = useNavigate(); 

  const nowDate = new Date();

  const calculateAge = (date) => {
      if (!date) return 0;
      const ageDiff = nowDate - date;
      const ageDate = new Date(ageDiff); 
      return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const toggleGender = () => {
      setIsMale(!isMale);
      setGender(isMale ? true : false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const showToast = (message) => {
        const toastId = message;
        if (!toast.isActive(toastId)) {
            toast.error(message, { toastId });
        }
    };

    const validateInput = () => {
        const validations = [
            {
                condition: !name,
                message: 'Tên không được để trống.'
            },
            {
                condition: name.length < 2 || name.length > 30,
                message: 'Tên phải có từ 2 đến 30 ký tự.'
            },
            {
                condition: !dob,
                message: 'Ngày sinh không được để trống.'
            },
            {
                condition: dob && calculateAge(dob) < 13,
                message: 'Tuổi phải lớn hơn hoặc bằng 13.'
            },
            {
                condition: !email,
                message: 'Email không được để trống.'
            },
            {
                condition: email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
                message: 'Email không hợp lệ.'
            },
            {
                condition: !password,
                message: 'Mật khẩu không được để trống.'
            },
            {
                condition: password && (password.length < 6 || password.length > 18),
                message: 'Mật khẩu phải có ít nhất 6 ký tự.'
            },
            {
                condition: password && !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,18}$/.test(password),
                message: 'Mật khẩu phải có từ 6 kí tự đến 18 kí tự, bao gồm ít nhất một chữ in hoa, một số, và một ký tự đặc biệt.'
            },
            {
                condition: !rePassword,
                message: 'Nhập lại mật khẩu không được để trống.'
            },
            {
                condition: password !== rePassword,
                message: 'Mật khẩu nhập lại không khớp.'
            }
        ];

        for (const { condition, message } of validations) {
            if (condition) {
                showToast(message);
                return true; 
            }
        }
        return false; 
    };

    const hasError = validateInput();

    if (!hasError) {
        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        lastName: name,
                        gender: gender,
                        dob: dob.toISOString().split('T')[0]
                    },
                    email: email,
                    password: password,
                    confirmPassword: rePassword
                }),
            });

            if (response.ok) {
                toast.success('Đăng ký tài khoản thành công!');
                setName('');
                setGender(true);
                setDob(null);
                setEmail('');
                setPassword('');
                setRepassword('');
                return navigate('/sign-in');
            } else {
                const errorData = await response.json();
                showToast(errorData.message || 'Đăng ký tài khoản thất bại.');
            }
        } catch {
            showToast('Lỗi khi gửi yêu cầu.');
        }
    }
};


    return (
        <div
          className="flex md:justify-end justify-center items-center"
          style={{
            background: `linear-gradient(90deg, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0) 35%), url('/thumbnail1.png')`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left",
            height: "120vh",
          }}
        >
          <div className="bg-white shadow-xl border-2 border-r-gray-700 w-full md:max-w-md max-w-sm py-4 md:px-8 px-6 md:mr-9 md:mx-0 mx-4">
            <div className="flex flex-col">
              {/* Logo */}
              <motion.img
                src="/logo.png"
                alt="Logo"
                className="md:w-16 md:h-16 w-14 h-14 md:mb-4 mb-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              />
              {/* Sport Center */}
              <motion.div
                className="absolute top-3 left-0 transform -translate-y-1/2 px-4 lg:block hidden"
                style={{ width: "30%" }}
                initial={{ x: "-50%" }}
                animate={{ x: "35%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              >
                <h1
                  className="text-white shadow-lg"
                  style={{
                    fontFamily: "Air Americana",
                    fontStyle: "italic",
                    fontSize: "170px",
                    margin: "0",
                    lineHeight: "1.1",
                  }}
                >
                  SPORT
                </h1>
                <h1
                  className="text-white shadow-lg"
                  style={{
                    fontFamily: "Air Americana",
                    fontStyle: "italic",
                    fontSize: "140px",
                    margin: "0",
                    lineHeight: "1.1",
                  }}
                >
                  CENTER
                </h1>
              </motion.div>
              {/* Title */}
              <motion.h1
                className="md:text-3xl text-2xl font-bold text-gray-700 mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Sport Center
              </motion.h1>
              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full">
                {/* Name */}
                <motion.div
                  className="md:mb-4 mb-3 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                >
                  {/* Name Label */}
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Tên
                  </label>
                  {/* Name Input */}
                  <input
                    type="text"
                    id="name"
                    className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                    placeholder="Nhập tên của bạn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </motion.div>
                {/* Gender */}
                <motion.div
                  className="md:mb-4 mb-3 mt-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                >
                    {/* Gender Input */}
                    <div className="flex items-center space-x-4">
                      <button 
                          className={`text-sm font-semibold cursor-pointer ${isMale ? 'text-teal-500' : 'text-gray-400'}`} 
                          onClick={() => setIsMale(true)}
                          aria-pressed={isMale}
                      >
                          Nam
                      </button>
                      
                      <div 
                          className={`w-8 h-4 flex items-center rounded-full p-1 cursor-pointer ${isMale ? 'bg-teal-500' : 'bg-pink-400'}`} 
                          onClick={toggleGender}
                          role="button" 
                          tabIndex={0} 
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { toggleGender(); }}}
                          aria-label="Toggle gender"
                      >
                          <div 
                              className={`bg-white w-2 h-2 rounded-full shadow-md transform duration-300 ease-in-out ${isMale ? 'translate-x-0' : 'translate-x-4'}`} 
                          />
                      </div>
                      
                      <button 
                          className={`text-sm font-semibold cursor-pointer ${!isMale ? 'text-pink-400' : 'text-gray-400'}`} 
                          onClick={() => setIsMale(false)}
                          aria-pressed={!isMale}
                      >
                          Nữ
                      </button>
                  </div>
                </motion.div>
                {/* Dob */}
                <motion.div
                  className="md:mb-4 mb-3 mt-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                >
                  {/* Dob Label */}
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Ngày sinh
                    </label>
                    {/* Dob Input */}
                    <div className="flex flex-col w-full">
                    <DatePicker 
                        selected={dob} 
                        onChange={(date) => setDob(date)} 
                        className="block shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out mt-1"
                        dateFormat="dd/MM/yyyy" 
                        placeholderText="Chọn ngày sinh"
                    />
                    </div>
                </motion.div>
                {/* Email */}
                <motion.div
                  className="md:mb-4 mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
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
                  className="md:mb-1 mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
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
                {/* RePassword */}
                <motion.div
                  className="md:mb-6 mb-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  {/* RePassword Laybel */}
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="rePassword"
                  >
                    Nhập lại mật khẩu
                  </label>
                  {/* RePassword Input */}
                  <input
                    type="password"
                    id="rePassword"
                    className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                    placeholder="Nhập lại mật khẩu"
                    value={rePassword}
                    onChange={(e) => setRepassword(e.target.value)}
                    required
                  />
                </motion.div>
                {/* Checkbox Remember*/}
                {/* Sign Up Button */}
                <motion.div
                  className="md:mb-4 mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                >
                  <button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition duration-200"
                  >
                    Đăng ký
                  </button>
                </motion.div>
                {/* Exist Account */}
                <motion.div
                  className="flex md:mb-6 mb-5 items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.3 }}
                >
                  <p className="text-gray-500 text-sm">
                    Đã có tài khoản?{" "}
                    <a
                      href="/sign-in"
                      className="text-blue-500 hover:text-blue-400"
                    >
                      Đăng nhập
                    </a>
                  </p>
                </motion.div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      );
};

export default SignUp;
