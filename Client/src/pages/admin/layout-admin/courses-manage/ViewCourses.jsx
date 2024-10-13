import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css"; 

const ViewCourses = ({ course, onClose }) => {
    const [images] = useState([
        "https://via.placeholder.com/600x400?text=Khóa+Học+1",
        "https://via.placeholder.com/600x400?text=Khóa+Học+2",
        "https://via.placeholder.com/600x400?text=Khóa+Học+3",
    ]);

    if (!course) {
        return <div className="text-center text-lg text-gray-500">No course selected.</div>;
    }

    return (
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg px-8 py-6 mt-8 relative" style={{ height: '500px', overflowY: 'auto' }}>
            <button onClick={onClose} className="absolute top-4 right-4 text-red-500 text-2xl">
                &times; 
            </button>

            <div className="mb-4">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    modules={[Navigation, Pagination, Autoplay]}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img src={image} alt={`Khóa học ${index + 1}`} className="w-full h-auto rounded-lg" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <h2 className="text-3xl font-semibold mb-4 text-gray-800 text-center">Thông Tin Khóa Học</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg shadow-xl">
                    <h4 className="font-semibold text-lg text-gray-700">Thông Tin Khóa Học</h4>
                    <p className="text-gray-600"><strong>Tên Khóa Học:</strong> {course.name}</p>
                    <p className="text-gray-600"><strong>Giá:</strong> 1,500,000 VND</p>
                    <p className="text-gray-600"><strong>Số Lượng Học Viên:</strong> 50 học viên</p>
                    <p className="text-gray-600"><strong>Giảng Viên:</strong> {course.coach}</p>
                    <p className={`text-lg ${course.status === 'Đang diễn ra' ? 'text-green-600' : course.status === 'Sắp diễn ra' ? 'text-yellow-600' : 'text-red-600'}`}>
                        <strong>Trạng Thái:</strong> {course.status}
                    </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-xl">
                    <h4 className="font-semibold text-lg text-gray-700">Mô Tả Khóa Học</h4>
                    <p className="text-gray-600">
                        Đây là mô tả chi tiết về khóa học. Khóa học này sẽ giúp bạn nắm vững các khái niệm cơ bản và nâng cao trong lĩnh vực mà bạn đang quan tâm. 
                        Nội dung khóa học sẽ bao gồm lý thuyết, bài tập thực hành, và các dự án thực tế để giúp bạn áp dụng những gì đã học.
                    </p>
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Duyệt
                </button>
            </div>
        </div>
    );
};

export default ViewCourses;
