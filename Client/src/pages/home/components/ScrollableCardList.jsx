
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const items = [
    {  course: "Tham Gia Ngay mỗi giờ tập cho lần đầu", price: "Giảm 50%", imagecourse: "/bg-deal.png" },
    {  course: "Tham Gia Ngay mỗi giờ tập cho lần đầu", price: "Giảm 50%", imagecourse: "/bongda-deal.png" },
    {  course: "Tham Gia Ngay mỗi giờ tập cho lần đầu", price: "Giảm 50%", imagecourse: "/deal-swim.png" },
    {  course: "Tham Gia Ngay mỗi giờ tập cho lần đầu", price: "Giảm 50%", imagecourse: "/bg-deal.png" },
    {  course: "Tham Gia Ngay mỗi giờ tập cho lần đầu", price: "Giảm 50%", imagecourse: "/tenis-deal.png" },
    {  course: "Tham Gia Ngay mỗi giờ tập cho lần đầu", price: "Giảm 50%", imagecourse: "/bongro-deal.png" },
    {  course: "Tham Gia Ngay mỗi giờ tập cho lần đầu", price: "Giảm 50%", imagecourse: "/bongda-deal.png" },
    {  course: "Tham Gia Ngay mỗi giờ tập cho lần đầu", price: "Giảm 50%", imagecourse: "/bg-deal.png" },
];

const ScrollableCardList = () => {
    const [showCourseInfo, setShowCourseInfo] = useState(false); // State để quản lý hiển thị modal

    const handleShowCourseInfo = () => {
        setShowCourseInfo(true); // Hiển thị modal khi click vào nút
    };

    const handleCloseCourseInfo = () => {
        setShowCourseInfo(false); // Đóng modal
    };

    return (
        <div className="py-4 px-2 sm:px-4 sm:py-8">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-600 mb-2 sm:mb-4">
                DEAL Hot Dành Cho Bạn
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
                    {items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <a href={item.link} className="flex-none p-2" style={{ textDecoration: 'none' }}>
                                <div className="relative w-full h-32 sm:h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
                                    <img src={item.imagecourse} alt="Deal Background" className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 hover:scale-110" />
                                    <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 bg-opacity-60 bg-black text-white transition duration-300 hover:bg-opacity-80">
                                        <h3 className="text-xs sm:text-lg font-semibold mb-2 transition-colors duration-300">{item.course}</h3>
                                        <div className="text-xl font-semibold mb-2 text-red-500">{item.price}</div>
                                        <button
                                            className="px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition duration-300"
                                            onClick={handleShowCourseInfo}
                                        >
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Hiển thị modal thông tin khóa học */}
            {showCourseInfo && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-2xl ">
                    <div className="flex justify-end">
                           <button
                             className=" text-yellow-400 rounded-full p-1"
                             onClick={handleCloseCourseInfo}
                           > 
                             X 
                           </button>
                         </div>
                        <h1 className="text-center text-xl font-bold mb-4">Thông tin khóa học</h1>
                        <div className="mb-4">
                          <img src="https://scontent.fhan4-2.fna.fbcdn.net/v/t39.30808-6/461032767_1067810321378944_4184342991974083756_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHnKIMCMOBvT0W7vKeGiccaVQrwP6R7lLBVCvA_pHuUsF2wLeTyfSINEzeg0UDo8_CdBnKgE6197KIgEFignTZ2&_nc_ohc=8vQo8aADi8AQ7kNvgEWeN5l&_nc_ht=scontent.fhan4-2.fna&_nc_gid=Ao1x_402GYyB8aUaAWuevif&oh=00_AYCY4JaFyvZYMWP7CJj1q-oXWToFguFNDL0QnDK5934DaA&oe=66F92CB5" alt="" className='w-24' />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input type="text" placeholder="Tên khóa học" className="bg-gray-200 p-4 rounded-lg text-center" />
                            <input type="number" placeholder="Số lượng" className="bg-gray-200 p-4 rounded-lg text-center" />
                            <input type="text" placeholder="Thời gian học" className="bg-gray-200 p-4 rounded-lg text-center" />
                            <textarea placeholder="Mô tả khóa học" className="bg-gray-200 p-4 rounded-lg text-center"></textarea>
                            <input type="number" placeholder="Giá" className="bg-gray-200 p-4 rounded-lg text-center" />
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

export default ScrollableCardList;

