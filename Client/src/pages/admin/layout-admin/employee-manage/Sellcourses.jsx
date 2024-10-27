import  { useState } from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import  { useEffect } from 'react';
import axios from 'axios';


const Sellcourses = () => {
    const [courseData, setCourseData] = useState({
        id : "",
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
    const [coaches, setCoaches] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/coach');
                console.log('Dữ liệu giảng viên:', response.data);
                setCoaches(response.data);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy giảng viên:', error);
            }
        };

        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/rooms');
                console.log('Dữ liệu phòng học:', response.data);
                setRooms(response.data);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy phòng học:', error);
            }
        };

        fetchCoaches();
        fetchRooms();
    }, []);

    const [images, setImages] = useState([]);
    const [editingMode, setEditingMode] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ((name === "price" || name === "quantity" || name === "duration") && value < 0) {
            return; 
        }
        if (name === "time") {
            const timeParts = value.split(':');
            setCourseData((prevData) => ({ ...prevData, time: [parseInt(timeParts[0]), parseInt(timeParts[1])] }));
        } else if (name === "startDate" || name === "endDate") {
            const dateParts = value.split('-');
            const dateArray = dateParts.map(part => parseInt(part));
            setCourseData((prevData) => ({ ...prevData, [name]: dateArray }));
        } else if (name.startsWith("coach") || name.startsWith("room")) {
            setCourseData((prevData) => ({ ...prevData, [name]: { id: parseInt(value) } }));
        } else {
            setCourseData((prevData) => ({ ...prevData, [name]: value }));
        }
        setCourseData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === '-') {
            e.preventDefault();
        }
    };

    const handleImageChange = (e) => {
        const newImages = [...images];
        if (newImages.length >= 6) {
            alert("Bạn chỉ có thể thêm tối đa 6 ảnh!");
            return;
        }

        const files = Array.from(e.target.files);
        const promises = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target.result);
                };
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
        
        try {
            const response = await axios.post('http://localhost:8080/api/course/add', {
                ...courseData,
                coach: { id: parseInt(courseData.coachId) },
                room: { id: parseInt(courseData.roomId) }
            });
            console.log(response.data); 
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
            console.error('Có lỗi xảy ra:', error);
            alert('Có lỗi xảy ra khi thêm khóa học. Vui lòng kiểm tra log.');
        }
    };
    

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };

    return (
        <div className="flex flex-col lg:flex-row justify-center w-full h-auto">
            <form onSubmit={handleSubmit} className="max-w-3xl p-6 bg-white rounded-lg mb-8">
                <div className="mb-6 mt-3">
                    {images.length > 0 ? (
                        <div className="w-full h-[360px] overflow-hidden rounded-lg mb-4 relative">
                            {images.length > 1 ? (
                                <Swiper
                                    {...sliderSettings} 
                                    spaceBetween={1}
                                    slidesPerView={1}
                                    navigation={false}
                                    autoplay={{ delay: 3000 }}
                                    pagination={{ clickable: true }}
                                    breakpoints={{
                                        300: { slidesPerView: 1, spaceBetween: 16 },
                                    }}
                                    modules={[Navigation, Pagination, Autoplay]}
                                >
                                    {images.map((image, index) => (
                                        <SwiperSlide key={index} className="relative flex justify-center items-center h-80">
                                            <img
                                                src={image}
                                                alt={`slide-${index}`}
                                                className="w-full h-80 object-contain mb-8"
                                            />
                                            {editingMode && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteImage(index)}
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 z-10 flex items-center justify-center w-8 h-8"
                                                >
                                                    X
                                                </button>
                                            )}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                            ) : (
                                <div className="relative">
                                    <img
                                        src={images[0]}
                                        alt="banner"
                                        className="w-full h-80 object-contain rounded-lg"
                                    />
                                    {editingMode && (
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteImage(0)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 z-10"
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                            <img src="/no-image.png" alt="No Image" className="object-contain h-full"/>
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

                <div className="col-span-1 sm:grid sm:grid-cols-2 md:gap-6">
   
    <div className="col-span-2">
        <label className="flex text-gray-700 font-bold mb-2">Tên khóa học</label>
        <input
            type="text"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nhập tên khóa học"
            required
        />
    </div>
    <div>
        <label className="flex text-gray-700 font-bold mb-2">Thứ tự khóa học</label>
        <input
            type="number"
            name="id"
            value={courseData.id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nhập tên khóa học"
            required
        />
    </div>
    <div>
        <label className="flex text-gray-700 font-bold mb-2">Giá</label>
        <input
            type="number"
            name="price"
            value={courseData.price}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nhập giá khóa học"
            required
        />
    </div>

    <div>
        <label className="flex text-gray-700 font-bold mb-2">Số lượng</label>
        <input
            type="number"
            name="slot"
            value={courseData.slot}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nhập số lượng học viên"
            required
        />
    </div>

    <div>
        <label className="flex text-gray-700 font-bold mb-2">Thời lượng (giờ)</label>
        <input
            type="number"
            name="duration"
            value={courseData.duration} 
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nhập thời lượng khóa học"
            required
        />
    </div>

    <div>
        <label className="text-gray-700 font-bold mb-2">Thời gian bắt đầu</label>
        <input
            type="date"
            name="startDate"
            value={courseData.startDate} 
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
        />
    </div>

    <div>
        <label className="text-gray-700 font-bold mb-2">Thời gian kết thúc</label>
        <input
            type="date"
            name="endDate"
            value={courseData.endDate} 
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
        />
    </div>

    <div className="col-span-2">
        <label className="text-gray-700 font-bold mb-2">Mô tả</label>
        <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nhập mô tả khóa học"
            rows="4"
        />
    </div>

   

    <div>
                <label className="text-gray-700 font-bold mb-2">Giáo viên</label>
                <select
                    name="coachId"
                    value={courseData.coachId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                >
                    <option value="">Chọn giảng viên</option>
                    {coaches.map((coach) => (
                        <option key={coach.id} value={coach.id}>
                            {coach.id}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="text-gray-700 font-bold mb-2">Phòng học</label>
                <select
                    name="roomId"
                    value={courseData.roomId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        </div>


                <button
                    type="submit"
                    className="w-full py-3 mt-4 mb-5 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
                >
                    Đăng ký khóa học
                </button>
            </form>
            <div className={"w-full max-w-xl h-full"}>
                <div className="max-w-xl w-full h-full bg-white shadow-lg rounded-lg p-6 md:ml-4">
                    <h2 className="text-xl font-bold mb-4">Xem trước thông tin khóa học</h2>
                    <div className="mb-4">
                        {images.length > 1 ? (
                                <Swiper
                                    {...sliderSettings} 
                                    spaceBetween={1}
                                    slidesPerView={1}
                                    navigation={false}
                                    autoplay={{ delay: 3000 }}
                                    pagination={{ clickable: true }}
                                    breakpoints={{
                                        300: { slidesPerView: 1, spaceBetween: 16 },
                                    }}
                                    modules={[Navigation, Pagination, Autoplay]}
                                >
                                    {images.map((image, index) => (
                                        <SwiperSlide key={index} className="relative flex justify-center items-center h-80">
                                            <img
                                                src={image}
                                                alt={`slide-${index}`}
                                                className="w-full h-80 object-contain mb-8"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                        ) : images.length === 1 ? (
                            <div className="relative">
                                <img
                                    src={images[0]}
                                    alt="banner"
                                    className="w-full h-64 object-contain rounded-lg"
                                />
                            </div>
                        ) : (
                            <img
                                src="/no-image.png"
                                alt="No Image"
                                className="w-full h-64 object-contain"
                            />
                        )}
                    </div>
                    <div className={"flex justify-center mb-2"}>
                        <strong className="text-center break-words w-full max-w-xs">
                            {courseData.name || "Chưa có thông tin"}
                        </strong>
                    </div>


                    <div className="mb-2 max-w-xl break-words">
                        <strong>Giá:</strong> {courseData.price ? `${Number(courseData.price).toLocaleString('vi-VN')} VNĐ` : "Chưa có thông tin"}
                    </div>
                    <div className="mb-2  max-w-xl break-words">
                        <strong>Số lượng học viên:</strong> {courseData.slot || "Chưa có thông tin"}
                    </div>
                    <div className="mb-2 max-w-xl break-words">
                        <strong>Thời gian bắt đầu:</strong> {courseData.startDate || "Chưa có thông tin"}
                    </div>
                    <div className="mb-2  max-w-xl break-words">
                        <strong>Thời gian kết thúc:</strong> {courseData.endDate || "Chưa có thông tin"}
                    </div>
                    <div className="mb-2  max-w-xl break-words">
                        <strong>Thời lượng:</strong> {courseData.duration || "Chưa có thông tin"}
                    </div>

                    <div className="mb-2 max-w-xl break-words">
                        <strong>Mô tả:</strong>
                        <p>{courseData.description || "Chưa có thông tin"}</p>
                    </div>
                </div>

                <div className=" w-full h-full rounded-lg p-6 md:ml-4 mt-4">
                    <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
                        {images.length > 0 ? (
                            <img
                                src={images[0]}
                                alt="banner"
                                className="w-full h-full object-contant absolute inset-0 transition-transform duration-300 hover:scale-110"
                            />
                        ) : (
                            <img
                                src="/no-image.png"
                                alt="No Image"
                                className="w-full h-full object-contain absolute inset-0 transition-transform duration-300 hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                            <h3 className="text-lg font-semibold mb-2 text-white">{courseData.name || "Tên khóa học"}</h3>
                            <div className="text-xl font-semibold mb-2 text-red-500">
                                {courseData.price ?`${Number(courseData.price).toLocaleString('vi-VN')} VNĐ` : "Giá"}
                            </div>
                            <button className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition duration-300">
                                Xem chi tiết
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default Sellcourses;


