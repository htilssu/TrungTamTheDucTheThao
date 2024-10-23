import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import '../../admin/CoursesManage/ViewCourses.css';
import axios from "axios";

const ViewCourses = ({ id, onClose }) => {
    const [course, setCourse] = useState(null);
    const defaultImage = "https://via.placeholder.com/600x400?text=Khóa+Học";

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/course/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };

        if (id) {
            fetchCourse();
        }
    }, [id]);

    if (!course) {
        return <div className="text-center text-lg text-gray-500">Chưa chọn khóa học.</div>;
    }

    const formatTime = (timeArray) => {
        const [hours, minutes] = timeArray;
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    };

    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="flex flex-col items-center">
            

            <div className="w-full max-w-3xl mb-4">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    modules={[Navigation, Pagination, Autoplay]}
                >
                    <SwiperSlide>
                        <img src={course.thumbnail || defaultImage} alt={`Khóa học ${course.name}`} className="w-full h-auto rounded-lg" />
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className="flex space-x-4 w-full max-w-3xl">
                <div key={course.id} className="bg-white p-4 shadow-md w-1/2">
                    <p><span className="font-bold">Tên khóa học :</span> {course.name}</p>
                    <p><span className="font-bold">Giá :</span> {course.price.toLocaleString()} VND</p>
                    <p><span className="font-bold">Số lượng học viên :</span> {course.slot}</p>
                    <p><span className="font-bold">Huấn luyện viên ID :</span> {course.coach.id}</p>
                    <p><span className="font-bold">Thời gian học :</span> {formatTime(course.time)}</p>
                    <p><span className="font-bold">Thời gian bắt đầu :</span> {formatDate(course.startDate)}</p>
                    <p><span className="font-bold">Thời gian kết thúc :</span> {formatDate(course.endDate)}</p>
                    <p><span className="font-bold">Phòng học :</span> {course.room.name}</p>
                    <p><span className="font-bold">Sức chứa phòng :</span> {course.room.capacity}</p>
                    <p><span className="font-bold">Tầng :</span> {course.room.floor}</p>
                    <p><span className="font-bold">Tòa nhà :</span> {course.room.building}</p>
                </div>
                <div className="bg-white p-4 shadow-md w-1/2 max-h-48 overflow-y-auto">
                    <p className="font-bold">Mô tả khóa học:</p>
                    <p>{course.description || "Không có mô tả chi tiết."}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewCourses;
