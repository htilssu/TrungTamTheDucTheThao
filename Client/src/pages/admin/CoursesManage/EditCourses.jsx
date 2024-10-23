
import { useState, useEffect } from "react";
import axios from "axios";

const EditCourses = ({ courseId, onClose }) => {
    const [courseData, setCourseData] = useState({
        name: "",
        price: "",
        slot: "",
        time: "",
        startDate: "",
        endDate: "",
        description: "",
        coachId: "",
        roomId: ""
    });
    const [coaches, setCoaches] = useState([]); 
    const [rooms, setRooms] = useState([]); 

    useEffect(() => {
        const fetchCourseById = async () => {
            if (!courseId) return;
            try {
                const response = await axios.get(`http://localhost:8080/api/course/${courseId}`);
                const data = response.data;
                
                const startDateArray = data.startDate; 
                const endDateArray = data.endDate;
                
                const startDate = startDateArray ? 
                    `${startDateArray[0]}-${String(startDateArray[1]).padStart(2, '0')}-${String(startDateArray[2]).padStart(2, '0')}` 
                    : "";
                
                const endDate = endDateArray ? 
                    `${endDateArray[0]}-${String(endDateArray[1]).padStart(2, '0')}-${String(endDateArray[2]).padStart(2, '0')}` 
                    : "";

                setCourseData({
                    name: data.name,
                    price: data.price,
                    slot: data.slot,
                    time: data.time[0] || "", 
                    startDate: startDate,
                    endDate: endDate,
                    description: data.description,
                    coachId: data.coach.id, 
                    roomId: data.room.id 
                });
            } catch (error) {
                console.error("Lỗi khi lấy thông tin khóa học:", error);
            }
        };

        const fetchCoachesAndRooms = async () => {
            try {
                const coachResponse = await axios.get("http://localhost:8080/api/coach");
                const roomResponse = await axios.get("http://localhost:8080/api/rooms");
                setCoaches(coachResponse.data);
                setRooms(roomResponse.data);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu giảng viên và phòng học:", error);
            }
        };

        fetchCourseById();
        fetchCoachesAndRooms();
    }, [courseId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedData = {
            name: courseData.name,
            description: courseData.description,
            price: courseData.price,
            time: courseData.time ? [parseInt(courseData.time), 0] : [0, 0], 
            startDate: courseData.startDate.split("-").map(Number), 
            endDate: courseData.endDate.split("-").map(Number), 
            slot: courseData.slot,
            coach: { id: courseData.coachId },
            room: { id: courseData.roomId } 
        };
    
        console.log("Dữ liệu cập nhật:", updatedData); 
    
        try {
            const response = await axios.put(`http://localhost:8080/api/course/${courseId}`, updatedData);
            alert("Cập nhật khóa học thành công");
            onClose();
        } catch (error) {
            console.error("Lỗi khi cập nhật khóa học:", error.response.data); 
            alert("Đã xảy ra lỗi khi cập nhật khóa học. Vui lòng kiểm tra dữ liệu.");
        }
    };

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
                        <label className="block mb-2">Số lượng học viên</label>
                        <input
                            type="number"
                            name="slot"
                            value={courseData.slot}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Thời lượng (giờ)</label>
                        <input
                            type="number"
                            name="time"
                            value={courseData.time}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Thời gian bắt đầu</label>
                        <input
                            type="date"
                            name="startDate"
                            value={courseData.startDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Thời gian kết thúc</label>
                        <input
                            type="date"
                            name="endDate"
                            value={courseData.endDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block mb-2">Mô tả khóa học</label>
                        <textarea
                            name="description"
                            value={courseData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            rows="3"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Giảng viên</label>
                        <select
                            name="coachId"
                            value={courseData.coachId}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Chọn giảng viên</option>
                            {coaches.map(coach => (
                                <option key={coach.id} value={coach.id}>{coach.id}</option>
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
                        >
                            <option value="">Chọn phòng học</option>
                            {rooms.map(room => (
                                <option key={room.id} value={room.id}>{room.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                        onClick={onClose}
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCourses;