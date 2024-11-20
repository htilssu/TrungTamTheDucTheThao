import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import {wGet} from "../../../utils/request.util.js";

const ScrollableCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [showCourseInfo, setShowCourseInfo] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = wGet('/api/course');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu khóa học:', error);
      }
    };

    fetchCourses().then();
  }, []);

  const handleViewCourseDetail = (course) => {
    setCurrentCourse(course); // Lưu khóa học hiện tại
    setShowCourseInfo(true); // Hiển thị modal
  };

  const handleCloseCourseInfo = () => {
    setShowCourseInfo(false); // Đóng modal
    setCurrentCourse(null); // Xóa thông tin khóa học hiện tại
  };

  return (
    <div className="py-4 px-2 sm:px-4 sm:py-8">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-600 mb-2 sm:mb-4">
        Danh Sách Khóa Học
      </h2>
      <div className="px-3 relative overflow-hidden rounded-lg">
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          navigation={false}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            475: { slidesPerView: 2, spaceBetween: 12 },
            640: { slidesPerView: 3, spaceBetween: 12 },
            768: { slidesPerView: 4, spaceBetween: 12 },
            960: { slidesPerView: 5, spaceBetween: 12 },
          }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {courses?.map((course, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full rounded-lg p-6 md:ml-4 mt-4">
                <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
                  <img
                    src={
                      course.imgSrc ||
                      'https://png.pngtree.com/thumb_back/fh260/back_our/20190622/ourmid/pngtree-sports-competition-hd-background-image_226416.jpg'
                    }
                    alt="banner"
                    className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold mb-2 text-white">{course.name || 'Tên khóa học'}</h3>
                    <div className="text-xl font-semibold mb-2 text-red-500">
                      {course.price
                        ? `${Number(course.price).toLocaleString('vi-VN')} VNĐ`
                        : 'Giá'}
                    </div>
                    <button
                      className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition duration-300"
                      onClick={() => handleViewCourseDetail(course)}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Hiển thị modal thông tin khóa học */}
      {showCourseInfo && currentCourse && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-2xl">
            <div className="flex justify-end">
              <button
                className="text-yellow-400 rounded-full p-1"
                onClick={handleCloseCourseInfo}
              >
                X
              </button>
            </div>
            <h1 className="text-center text-xl font-bold mb-4">{currentCourse.name}</h1>
            <div className="grid grid-cols-2 gap-4 mb-4">


              <p className="bg-gray-100 p-4 rounded-lg text-center">
                Giá: {currentCourse.price
                  ? `${Number(currentCourse.price).toLocaleString('vi-VN')} VNĐ`
                  : 'N/A'}
              </p>
              <p className="bg-gray-100 p-4 rounded-lg text-center">
                Thời gian: {currentCourse.time || 'N/A'}
              </p>
              <p className="bg-gray-100 p-4 rounded-lg text-center">
                Ngày bắt đầu: {currentCourse.startDate || 'N/A'}
              </p>
              <p className="bg-gray-100 p-4 rounded-lg text-center">
                Ngày kết thúc: {currentCourse.endDate || 'N/A'}
              </p>
              <p className="bg-gray-100 p-4 rounded-lg text-center">
                Số lượng: {currentCourse.slot || 'N/A'}
              </p>

              <p className="bg-gray-100 p-4 rounded-lg text-center">
                Mô tả: {currentCourse.description || 'N/A'}
              </p>
            </div>
            <div className="text-center">
              <button className="bg-yellow-500 text-white py-2 px-4 rounded-full">
                Đăng ký học
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrollableCourseList;
