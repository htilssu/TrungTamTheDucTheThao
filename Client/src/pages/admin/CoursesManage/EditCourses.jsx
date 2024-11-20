import { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import {wGet, wPut} from "../../../utils/request.util.js";


const EditCourses = ({ courseId, onClose }) => {
    const [courseData, setCourseData] = useState({
        name: "",
        price: "",
        slot: "",
        time: "",
        startDate: "",
        endDate: "",
        description: "",
        coach: "", // Chỉ lưu trữ idCoach ở đây
        roomId: "",
        thumbnail: "",
    });
    const [rooms, setRooms] = useState([]);
    const [coach, setCoach] = useState([]);

    useEffect(() => {
        const fetchCourseById = async () => {
            if (!courseId) return;
            try {
                const response = await wGet(`/api/course/${courseId}`);
                const data = await response.json()

                const startDate = data.startDate ? dayjs(data.startDate) : null;
                const endDate = data.endDate ? dayjs(data.endDate) : null;

                setCourseData({
                    name: data.name || "",
                    price: data.price || "",
                    slot: data.slot || "",
                    time: data.time || "",
                    startDate: startDate && startDate.isValid() ? startDate : "",
                    endDate: endDate && endDate.isValid() ? endDate : "",
                    description: data.description || "",
                    coach: data.idCoach || "", // Chỉ lưu trữ idCoach
                    roomId: data.idRoom || "",
                    thumbnail: data.thumbnail || "",
                });
            } catch (error) {
                console.error("Lỗi khi lấy thông tin khóa học:", error);
            }
        };

        const fetchRooms = async () => {
            try {
                const roomResponse = await wGet("/api/rooms");
                const data = await roomResponse.json()
                setRooms(data);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu phòng học:", error);
            }
        };

        const fetchCoach = async () => {
            try {
                const coachResponse = await wGet("/api/coach");
                const data = await coachResponse.json()
                setCoach(data);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu huấn luyện viên:", error);
            }
        };

        fetchCoach();
        fetchCourseById();
        fetchRooms();
    }, [courseId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleDateChange = (date, dateString, name) => {
        setCourseData((prev) => ({
            ...prev,
            [name]: date,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Giả sử coachData là idCoach đã được chọn
        const coachId = courseData.coach ? courseData.coach : null;

        const updatedData = {
            name: courseData.name,
            description: courseData.description,
            price: parseFloat(courseData.price),
            time: courseData.time,
            startDate: courseData.startDate ? courseData.startDate.format("YYYY-MM-DD") : "",
            endDate: courseData.endDate ? courseData.endDate.format("YYYY-MM-DD") : "",
            slot: parseInt(courseData.slot, 10),
            idRoom: courseData.roomId,
            idCoach: coachId,  // Truyền đúng coachId
            thumbnail: courseData.thumbnail,
        };

        try {
            await wPut(`/api/course/${courseId}`, updatedData);
            alert("Cập nhật khóa học thành công");
            onClose();  // Đóng form sau khi cập nhật thành công
        } catch (error) {
            console.error("Lỗi khi cập nhật khóa học:", error.response?.data);
            alert("Đã xảy ra lỗi khi cập nhật khóa học. Vui lòng kiểm tra dữ liệu.");
        }
    };

    const disabledDate = (current) => current && current < dayjs().startOf("day");

    return (
        <div className="relative p-4">
            <form onSubmit={handleSubmit} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2">Tên khóa học</label>
                        <input
                            type="text"
                            name="name"
                            value={courseData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Giá</label>
                        <input
                            type="number"
                            name="price"
                            value={courseData.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Thời gian (HH:mm)</label>
                        <input
                            type="text"
                            name="time"
                            value={courseData.time}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Số lượng học viên</label>
                        <input
                            type="number"
                            name="slot"
                            value={courseData.slot}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Ngày bắt đầu</label>
                        <DatePicker
                            name="startDate"
                            value={courseData.startDate || null}
                            onChange={(date, dateString) => handleDateChange(date, dateString, "startDate")}
                            className="w-full p-2 border rounded"
                            disabledDate={disabledDate}
                            format="YYYY-MM-DD"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Ngày kết thúc</label>
                        <DatePicker
                            name="endDate"
                            value={courseData.endDate || null}
                            onChange={(date, dateString) => handleDateChange(date, dateString, "endDate")}
                            className="w-full p-2 border rounded"
                            disabledDate={disabledDate}
                            format="YYYY-MM-DD"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Huấn luyện viên</label>
                        <select
                            name="coach"
                            value={courseData.coach}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Chọn huấn luyện viên</option>
                            {coach.map((coachItem) => (
                                <option key={coachItem.id} value={coachItem.id}>
                                    {coachItem.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Phòng học</label>
                        <select
                            name="roomId"
                            value={courseData.roomId}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Chọn phòng học</option>
                            {rooms.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="col-span-2">
                        <label className="block mb-2">Mô tả</label>
                        <textarea
                            name="description"
                            value={courseData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="col-span-2 flex justify-end space-x-4">
                    <button 
                             type="button" 
                             className="bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md py-2 px-4 transition duration-200 ease-in-out"
                             onClick={onClose}
                        >
                            Hủy
                        </button>
                        
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md py-2 px-4 transition duration-200 ease-in-out"
                        >
                            Lưu
                        </button>

                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditCourses;
