import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import '../../admin/CoursesManage/ViewCourses.css';

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
        <div className="flex flex-col items-center">
            <button onClick={onClose} className="absolute top-4 right-4 text-red-500 text-2xl">
                &times;
            </button>

            <div className="w-full max-w-3xl mb-4">
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

            <div className="flex space-x-4 w-full max-w-3xl">
                <div className="bg-white p-4 shadow-md w-1/2">
                    <p><span className="font-bold">Tên khóa học :</span> {course.name}</p>
                    <p><span className="font-bold">Giá :</span> 1.500.000</p>
                    <p><span className="font-bold">Số lượng học viên :</span> {course.studentCount}</p>
                    <p><span className="font-bold">Huấn luyện viên :</span> {course.coach}</p>
                </div>
                <div className="bg-white p-4 shadow-md w-1/2 max-h-48 overflow-y-auto overflow-x-hidden">
                    <p className="font-bold">Mô tả khóa học:</p>
                    <div className="overflow-x-hidden">
                        <p>{course.description || "Không có mô tả chi tiết.Không có mô tả chi tiết.Không có mô tả chi tiết.Không có mô tả chi tiết.Không có mô tả chi tiết.Không có mô tả chi tiết.Không có mô tả chi tiết.Không có mô tả chi tiết.Không có mô tả chi tiết.Không có mô tả chi tiết.Không có mô tả chi tiết.Không có mô tả chi tiết.Không có mô tả chi tiết.Không có mô tả chi tiết.Không có mô tả chi tiết."}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCourses;
