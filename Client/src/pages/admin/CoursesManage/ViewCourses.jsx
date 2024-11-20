
import { useEffect, useState } from "react";
import axios from "axios";
import {wGet} from "../../../utils/request.util.js";

const ViewCourses = ({ id, onClose }) => {
    const [course, setCourse] = useState(null);
    const [room, setRoom] = useState(null);
    const [coach, setCoach] = useState(null);
    const defaultImage = "https://via.placeholder.com/600x400?text=Khóa+Học";

    useEffect(() => {
        // Hàm để lấy thông tin khóa học
        const fetchCourse = async () => {
            try {
                const response = await wGet(`/api/course/${id}`);
                const data = await response.json()
                setCourse(data); // Lưu thông tin khóa học
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };

        // Hàm để lấy thông tin phòng học dựa trên roomId của khóa học
        const fetchRoom = async (roomId) => {
            try {
                const response = await wGet(`/api/rooms/${roomId}`);
                const data = await response.json()
                setRoom(data); // Lưu thông tin phòng học
            } catch (error) {
                console.error("Error fetching room data:", error);
            }
        };

        // Hàm để lấy thông tin giảng viên dựa trên coachId của khóa học
        const fetchCoach = async (coachId) => {
            try {
                const response = await wGet(`/api/coach/${coachId}`);
                const data = await response.json()
                setCoach(data); // Lưu thông tin giảng viên
            } catch (error) {
                console.error("Error fetching coach data:", error);
            }
        };

        if (id) {
            fetchCourse();
        }

        if (course) {
            // Gọi API để lấy thông tin phòng học và giảng viên khi course được load
            if (course.Room && course.Room.id) {
                fetchRoom(course.Room.id);
            }
            if (course.Coach && course.Coach.id) {
                fetchCoach(course.Coach.id);
            }
        }
    }, [id, course]); // Lắng nghe thay đổi từ `id` và `course`

    if (!course) {
        return <div className="text-center text-lg text-gray-500">Chưa chọn khóa học.</div>;
    }

    return (
        <div className="flex flex-col items-center bg-white rounded-lg p-6 shadow-lg max-w-6xl mx-auto space-y-6">
            {/* Hình ảnh khóa học */}
            <div className="w-full mb-6">
                <img
                    src={course.thumbnail || defaultImage}
                    alt={`Khóa học ${course.name}`}
                    className="w-full h-auto rounded-lg shadow-lg"
                />
            </div>

            {/* Dữ liệu khóa học */}
            <div className="relative p-4">
                <form className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2">Tên khóa học</label>
                            <input
                                type="text"
                                name="name"
                                value={course.name}
                                className="w-full p-2 border rounded"
                                required
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Giá</label>
                            <input
                                type="number"
                                name="price"
                                value={course.price}
                                className="w-full p-2 border rounded"
                                required
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Số lượng học viên</label>
                            <input
                                type="number"
                                name="slot"
                                value={course.slot}
                                className="w-full p-2 border rounded"
                                required
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Thời gian</label>
                            <input
                                type="text"
                                name="time"
                                value={course.time ? course.time.split(':')[0] + ' giờ' : ''}
                                className="w-full p-2 border rounded"
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Thời gian bắt đầu</label>
                            <input
                                type="date"
                                name="startDate"
                                value={course.startDate}
                                className="w-full p-2 border rounded"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Thời gian kết thúc</label>
                            <input
                                type="date"
                                name="endDate"
                                value={course.endDate}
                                className="w-full p-2 border rounded"
                                readOnly
                            />
                        </div>

                        {/* Tên phòng học */}
                        <div>
                            <label className="block mb-2">Tên phòng học</label>
                            <input
                                type="text"
                                name="roomName"
                                value={room ? room.name : "Chưa có thông tin"}
                                className="w-full p-2 border rounded"
                                readOnly
                            />
                        </div>

                        {/* Tên giảng viên */}
                        <div>
                            <label className="block mb-2">Tên giảng viên</label>
                            <input
                                type="text"
                                name="coachName"
                                value={coach ? coach.name : "Chưa có thông tin"}
                                className="w-full p-2 border rounded"
                                readOnly
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block mb-2">Mô tả khóa học</label>
                            <textarea
                                name="description"
                                value={course.description}
                                className="w-full p-2 border rounded"
                                rows="3"
                                readOnly
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ViewCourses;
