
import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import ImageSwiper from "./ImageSwiper.jsx";
import {wGet, wPost} from "../../../../utils/request.util.js";


import { toast, ToastContainer } from "react-toastify";

const Sellcourses = () => {
    const [courseData, setCourseData] = useState({
        name: "",
        description: "",
        price: "",
        time: "",
        startDate: null,
        endDate: null,
        slot: "",
        coachId: "",
        roomId: "",
    });

    const [coaches, setCoaches] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [images, setImages] = useState([]);
    const [editingMode, setEditingMode] = useState(false);

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                const response = wGet('/api/coach');
                const data = await response.json()
                console.log('Dữ liệu giảng viên:', data);
                setCoaches(data);
            } catch (error) {
                toast.error("Có lỗi xảy ra khi lấy giảng viên:", error);
            }
        };

        const fetchRooms = async () => {
            try {
                const response = await wGet('/api/rooms');
                const data = await response.json()
                console.log('Dữ liệu phòng học:', data);
                setRooms(data);
            } catch (error) {
                toast.error("Có lỗi xảy ra khi lấy phòng học:", error);
            }
        };

        fetchCoaches();
        fetchRooms();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (date, dateString, name) => {
        setCourseData((prev) => ({
            ...prev,
            [name]: dateString,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 6) {
            toast("Bạn chỉ có thể thêm tối đa 6 ảnh!");
            return;
        }

        const promises = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises).then((results) => {
            setImages((prevImages) => [...prevImages, ...results]);
        });
    };

    const handleDeleteImage = (index) => {
        if (!editingMode) return;
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            name: courseData.name,
            description: courseData.description,
            price: parseFloat(courseData.price) || 0,
            time: courseData.time || "00:00",
            startDate: courseData.startDate || dayjs().format("YYYY-MM-DD"),
            endDate: courseData.endDate || dayjs().format("YYYY-MM-DD"),
            slot: parseInt(courseData.slot) || 0,
            idCoach: parseInt(courseData.coachId),
            idRoom: parseInt(courseData.roomId),
            thumbnail: images[0] || "null",
        };

        try {
            const response = wPost('/api/course/add', {
                ...courseData,
                coach: { id: parseInt(courseData.coachId) },
                room: { id: parseInt(courseData.roomId) }
            }
            )
            const data = await response.json()
            ;
            console.log(data);
            alert('Khóa học đã được thêm thành công!');
            setCourseData({
                            id:"",
                            name: "",
                            description: "",
                            price: "",
                            time: [0, 0],
                            startDate: [],
                            endDate: [],
                            slot: "",
                            coach: { id: null },
                            room: { id: null },
                        });
        } catch (error) {
            toast.error("Lỗi:", error);
            alert("Không thể thêm khóa học. Kiểm tra lại!");
        }
    };

    const disabledDate = (current) => current && current < dayjs().startOf("day");

    return (
        <div className="flex flex-col lg:flex-row justify-center w-full h-auto">
            <form onSubmit={handleSubmit} className="max-w-3xl p-6 bg-white rounded-lg mb-8 border-[1px]">
                <div className="mb-6 mt-3">
                    {images.length > 0 ? (
                        <ImageSwiper
                            images={images}
                            editingMode={editingMode}
                            handleDeleteImage={handleDeleteImage}
                        />
                    ) : (
                        <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                            <img src="/no-image.png" alt="No Image" className="object-contain h-full" />
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                        id="upload"
                    />
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
                    <button
                        type="button"
                        onClick={() => document.getElementById("upload").click()}
                        className="py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                    >
                        Thêm ảnh
                    </button>
                    <button
                        type="button"
                        onClick={() => setEditingMode(!editingMode)}
                        className="py-2 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
                    >
                        {editingMode ? "Hủy sửa" : "Sửa ảnh"}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-gray-700 font-bold mb-2">Tên khóa học</label>
                        <input
                            type="text"
                            name="name"
                            value={courseData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="Nhập tên khóa học"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-bold mb-2">Giá</label>
                        <input
                            type="number"
                            name="price"
                            value={courseData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="Nhập giá khóa học"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-bold mb-2">Thời gian </label>
                        <input
                            type="time"
                            name="time"
                            value={courseData.time}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-bold mb-2">Số lượng</label>
                        <input
                            type="number"
                            name="slot"
                            value={courseData.slot}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="Nhập số lượng học viên"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-bold mb-2">Thời gian bắt đầu</label>
                        <DatePicker
                            name="startDate"
                            value={courseData.startDate ? dayjs(courseData.startDate) : null}
                            onChange={(date, dateString) => handleDateChange(date, dateString, "startDate")}
                            disabledDate={disabledDate}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-bold mb-2">Thời gian kết thúc</label>
                        <DatePicker
                            name="endDate"
                            value={courseData.endDate ? dayjs(courseData.endDate) : null}
                            onChange={(date, dateString) => handleDateChange(date, dateString, "endDate")}
                            disabledDate={disabledDate}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-bold mb-2">Phòng học</label>
                        <select
                            name="roomId"
                            value={courseData.roomId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
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
                    <div>
                        <label className="text-gray-700 font-bold mb-2">Giảng viên</label>
                        <select
                            name="coachId"
                            value={courseData.coachId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        >
                            <option value="">Chọn giảng viên</option>
                            {coaches.map((coach) => (
                                <option key={coach.id} value={coach.id}>
                                    {coach.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
                <div>
                        <label className="text-gray-700 font-bold mb-2">Mô tả</label>
                        <textarea
                            name="description"
                            value={courseData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="Nhập mô tả khóa học"
                            rows="4"
                        />
                    </div>

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="py-3 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
                    >
                        Thêm khóa học
                    </button>
                </div>
            </form>
            <ToastContainer/>
        </div>

    );
};

export default Sellcourses;
