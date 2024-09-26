import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Sellcourses = () => {
    const [courseData, setCourseData] = useState({
        courseName: '',
        quantity: '',
        time: '',
        description: '',
        price: '',
        imageUrl: '',
        startDate: '', // Thêm trường ngày bắt đầu
        endDate: ''    // Thêm trường ngày kết thúc
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ((name === 'quantity' || name === 'price') && value < 0) {
            return;
        }

        setCourseData({ ...courseData, [name]: value });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl">
                <div className="flex flex-col sm:flex-row gap-8">
                    {/* Form nhập thông tin */}
                    <div className="w-full sm:w-1/2">
                        <h2 className="text-2xl font-bold mb-6 text-center">Nhập thông tin khóa học</h2>

                        {/* Hiển thị ảnh nếu có */}
                        {courseData.imageUrl && (
                            <div className="mb-4">
                                <img
                                    src={courseData.imageUrl}
                                    alt="Preview"
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-6 mb-6">
                            <input
                                type="text"
                                name="courseName"
                                placeholder="Tên khóa học"
                                value={courseData.courseName}
                                onChange={handleChange}
                                className="bg-gray-200 p-4 rounded-lg focus:ring-2 focus:ring-yellow-500"
                            />
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Số lượng"
                                value={courseData.quantity}
                                onChange={handleChange}
                                className="bg-gray-200 p-4 rounded-lg focus:ring-2 focus:ring-yellow-500"
                            />
                            <input
                                type="text"
                                name="time"
                                placeholder="Thời gian học"
                                value={courseData.time}
                                onChange={handleChange}
                                className="bg-gray-200 p-4 rounded-lg focus:ring-2 focus:ring-yellow-500"
                            />
                            <input
                                type="date"
                                name="startDate"  // Trường ngày bắt đầu
                                value={courseData.startDate}
                                onChange={handleChange}
                                className="bg-gray-200 p-4 rounded-lg focus:ring-2 focus:ring-yellow-500"
                            />
                            <input
                                type="date"
                                name="endDate"    // Trường ngày kết thúc
                                value={courseData.endDate}
                                onChange={handleChange}
                                className="bg-gray-200 p-4 rounded-lg focus:ring-2 focus:ring-yellow-500"
                            />
                            <textarea
                                name="description"
                                placeholder="Mô tả khóa học"
                                value={courseData.description}
                                onChange={handleChange}
                                className="bg-gray-200 p-4 rounded-lg focus:ring-2 focus:ring-yellow-500"
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Giá"
                                value={courseData.price}
                                onChange={handleChange}
                                className="bg-gray-200 p-4 rounded-lg focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>

                        {/* Nhập link ảnh */}
                        <div className="mb-4">
                            <input
                                type="text"
                                name="imageUrl"
                                placeholder="Link ảnh"
                                value={courseData.imageUrl}
                                onChange={handleChange}
                                className="bg-gray-200 p-4 rounded-lg focus:ring-2 focus:ring-yellow-500 w-full"
                            />
                        </div>

                        <button className="w-full bg-yellow-500 text-white py-3 px-6 rounded-full hover:bg-yellow-600 transition duration-300">
                            Đăng ký bán khóa học
                        </button>
                    </div>

                    {/* Xem trước khóa học */}
                    <div className="w-full sm:w-1/2 flex flex-col">
                        <div className="flex justify-center">
                            <h2 className="text-2xl font-bold mb-6 text-center">Xem trước khóa học</h2>
                        </div>

                        {/* Hiển thị ảnh xem trước */}
                        {courseData.imageUrl && (
                            <div className="mb-4">
                                <img
                                    src={courseData.imageUrl}
                                    alt="Preview"
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        )}

                        <div className="mb-4">
                            <strong>Tên khóa học:</strong> {courseData.courseName || 'N/A'}
                        </div>
                        <div className="mb-4">
                            <strong>Số lượng:</strong> {courseData.quantity || 'N/A'}
                        </div>
                        <div className="mb-4">
                            <strong>Thời gian học:</strong> {courseData.time || 'N/A'}
                        </div>
                        <div className="mb-4">
                            <strong>Ngày bắt đầu:</strong> {courseData.startDate || 'N/A'}
                        </div>
                        <div className="mb-4">
                            <strong>Ngày kết thúc:</strong> {courseData.endDate || 'N/A'}
                        </div>
                        <div className="mb-4">
                            <strong>Mô tả:</strong>
                            <p className="whitespace-pre-line break-words max-h-32 overflow-y-auto p-3 bg-white border rounded-lg">
                                {courseData.description || 'N/A'}
                            </p>
                        </div>
                        <div>
                            <strong>Giá:</strong> {courseData.price || 'N/A'} VND
                        </div>

                        {/* Card hiển thị thông tin khóa học */}
                        <div className="mt-4 flex justify-center">
                            <div className="relative w-full h-32 sm:h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
                                <img src={courseData.imageUrl} alt="Deal Background" className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 hover:scale-110" />
                                <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 bg-opacity-60 bg-black text-white transition duration-300 hover:bg-opacity-80">
                                    <h3 className="text-xs sm:text-lg font-semibold mb-2 transition-colors duration-300">{courseData.courseName || 'Tên khóa học'}</h3>
                                    <div className="text-xl font-semibold mb-2 text-red-500">{courseData.price || 'Giá'} VND</div>
                                    <button className="px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition duration-300">
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sellcourses;
