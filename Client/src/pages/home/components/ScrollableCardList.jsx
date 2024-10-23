// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// const items = [
//     { link: "/", title: "Tham Gia Ngay mỗi giờ tập cho lần đầu", deal: "Giảm 50%", imagedeal:"/bg-deal.png" },
//     { link: "/", title: "Tham Gia Ngay mỗi giờ tập cho lần đầu", deal: "Giảm 50%", imagedeal:"/bongda-deal.png" },
//     { link: "/", title: "Tham Gia Ngay mỗi giờ tập cho lần đầu", deal: "Giảm 50%", imagedeal:"/deal-swim.png" },
//     { link: "/", title: "Tham Gia Ngay mỗi giờ tập cho lần đầu", deal: "Giảm 50%", imagedeal:"/bg-deal.png" },
//     { link: "/", title: "Tham Gia Ngay mỗi giờ tập cho lần đầu", deal: "Giảm 50%", imagedeal:"/tenis-deal.png" },
//     { link: "/", title: "Tham Gia Ngay mỗi giờ tập cho lần đầu", deal: "Giảm 50%", imagedeal:"/bongro-deal.png" },
//     { link: "/", title: "Tham Gia Ngay mỗi giờ tập cho lần đầu", deal: "Giảm 50%", imagedeal:"/bongda-deal.png" },
//     { link: "/", title: "Tham Gia Ngay mỗi giờ tập cho lần đầu", deal: "Giảm 50%", imagedeal:"/bg-deal.png" },
// ];

// const ScrollableCardList = () => {
//     return (
//         <div className="py-4 px-2 sm:px-4 sm:py-8">
//             <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-600 mb-2 sm:mb-4">
//                 DEAL Hot Dành Cho Bạn
//             </h2>
//             <div className="px-3 relative overflow-hidden rounded-lg">
//                 <Swiper
//                     spaceBetween={10}
//                     slidesPerView={4}
//                     navigation={false}
//                     autoplay={{ delay: 3000 }}
//                     pagination={{ clickable: true }}
//                     breakpoints={{
//                         320: { slidesPerView: 1, spaceBetween: 16 },
//                         475: { slidesPerView: 2, spaceBetween: 12 },
//                         640: { slidesPerView: 3, spaceBetween: 12 },
//                         768: { slidesPerView: 4, spaceBetween: 12 },
//                         960: { slidesPerView: 5, spaceBetween: 12 },
//                     }}
//                     modules={[Navigation, Pagination, Autoplay]}
//                 >
//                     {items.map((item, index) => (
//                         <SwiperSlide key={index}>
//                             <a href={item.link} className="flex-none p-2" style={{ textDecoration: 'none' }}>
//                                 <div className="relative w-full h-32 sm:h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
//                                     <img src={item.imagedeal} alt="Deal Background" className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 hover:scale-110" />
//                                     <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 bg-opacity-60 bg-black text-white transition duration-300 hover:bg-opacity-80">
//                                         <h3 className="text-xs sm:text-lg font-semibold mb-2 transition-colors duration-300">{item.title}</h3>
//                                         <div className="text-xl font-semibold mb-2 text-red-500">{item.deal}</div>
//                                         <button className="px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition duration-300">
//                                             Đăng Kí Ngay
//                                         </button>
//                                     </div>
//                                 </div>
//                             </a>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>
//         </div>
//     );
// };

// export default ScrollableCardList;
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const ScrollableCourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/course'); 
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu khóa học:', error);
            }
        };

        fetchCourses();
    }, []);

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
                    {courses.map((course, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full h-full rounded-lg p-6 md:ml-4 mt-4">
                                <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
                                    {course.thumbnail ? (
                                        <img
                                            src={course.thumbnail}
                                            alt="banner"
                                            className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 hover:scale-110"
                                        />
                                    ) : (
                                        <img
                                            src="/no-image.png"
                                            alt="No Image"
                                            className="w-full h-full object-contain absolute inset-0 transition-transform duration-300 hover:scale-110"
                                        />
                                    )}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                                        <h3 className="text-lg font-semibold mb-2 text-white">{course.name || "Tên khóa học"}</h3>
                                        <div className="text-xl font-semibold mb-2 text-red-500">
                                            {course.price ? `${Number(course.price).toLocaleString('vi-VN')} VNĐ` : "Giá"}
                                        </div>
                                        <button className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition duration-300">
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ScrollableCourseList;
