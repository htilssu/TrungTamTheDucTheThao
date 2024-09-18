import {FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from 'react-icons/fa';
import {IoIosArrowForward} from 'react-icons/io';
import {Link} from 'react-router-dom';

const termsLinks = [
  {
    text: 'Thỏa thuận người dùng',
    path: '/user-agreement',
  },
  {
    text: 'Quyền riêng tư',
    path: '/privacy-policy',
  },
  {
    text: 'Quy định - chính sách',
    path: '/rules-policies',
  },
];

const introductionLinks = [
  {
    text: 'Về chúng tôi',
    path: '/about-us',
  },
  {
    text: 'Tin tức',
    path: '/news',
  },
  {
    text: 'Liên hệ',
    path: '/contact',
  },
];

const Footer = () => {
  return (
      <footer className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap flex-col md:flex-row justify-between items-start w-full">
            <div className="text-white flex flex-col gap-2 w-full md:w-1/2 lg:w-1/4 p-2">
              <div className="flex items-center mb-2">
                <img src="#" alt="Liên hệ" className="w-6 h-6 mr-2"/>
                <span className="text-lg font-semibold">SportNgoKhong.vn</span>
              </div>
              <p>Công ty Thể Dục Thể Thao và Sự Kiện SportNgoKhong</p>
              <p>
                Giấy Phép cung ứng dịch vụ Trung gian Thanh toán số 22/GP-NHNN của
                Ngân hàng Nhà nước Việt Nam
              </p>
              <div className="flex items-center">
                <Link to={'#'} className="block mr-4">
                  <img src="#" alt="" className="w-20 h-10"/>
                </Link>
                <Link to={'#'} className="block">
                  <img src="#" alt="" className="w-20 h-10"/>
                </Link>
              </div>
            </div>
            <div className="text-white flex flex-col gap-2 w-full md:w-1/2 lg:w-1/4 p-2">
              <h3 className="text-lg font-semibold mb-2">Điều khoản</h3>
              {termsLinks.map((link) => (
                  <Link to={link.path} key={link.path} className="flex items-center">
                    <IoIosArrowForward size={20}/>
                    <p className="ml-2">{link.text}</p>
                  </Link>))}
            </div>

            <div className="text-white flex flex-col gap-2 w-full md:w-1/2 lg:w-1/4 p-2">
              <h3 className="text-lg font-semibold mb-2">Hotline</h3>
              <p>Email: contact@example.com</p>
              <p>Điện thoại: +84 123 456 789</p>
            </div>
            <div className="text-white flex flex-col gap-2 w-full md:w-1/2 lg:w-1/4 p-2 ">
              <h3 className="text-lg font-semibold mb-2">Địa chỉ</h3>
              <p>Địa chỉ: Số 123 Đường ABC, Quận XYZ, TP HCM</p>
            </div>
          </div>

          <div className="text-white flex flex-col w-full gap-2 md:flex-col mt-4">
            <h3 className="text-lg font-semibold mb-2">Giới thiệu</h3>
            {introductionLinks.map((link) => (
                <div key={link.path}>
                  <Link to={link.path} className="flex items-center">
                    <IoIosArrowForward size={20}/>
                    <p className="ml-2">{link.text}</p>
                  </Link>
                </div>
            ))}
          </div>

          <div className="mt-6 text-center text-white">
            <h3 className="text-lg font-semibold mb-2">Theo dõi chúng tôi</h3>
            <div className="flex justify-center space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                <FaFacebook size={24}/>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                <FaTwitter size={24}/>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                <FaLinkedin size={24}/>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                <FaInstagram size={24}/>
              </a>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Bản quyền © 2024-2025 SportNgoKhong.vn. Trung tâm thể dục thể thao
              hàng đầu Việt Nam.
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
