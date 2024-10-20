import { useState } from "react";
import { TiTick, TiTrash, TiEye } from "react-icons/ti";
import ViewCourses from "./ViewCourses.jsx";

const CoursesManage = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);

    const courses = [
        { id: 1, name: 'Khóa học React', datetime: '2024-10-01', status: 'Đang diễn ra', coach: 'Nguyễn Văn A' },
        { id: 2, name: 'Khóa học JavaScript', datetime: '2024-10-05', status: 'Sắp diễn ra', coach: 'Trần Thị B' },
        { id: 3, name: 'Khóa học CSS', datetime: '2024-10-10', status: 'Đã kết thúc', coach: 'Lê Văn C' },
    ];

    const handleViewCourse = (course) => {
        setSelectedCourse(course);
    };

    const handleCloseModal = () => {
        setSelectedCourse(null);
    };

    return (
        <div className="m-5">
            <h2 className="text-2xl font-semibold mb-4 text-center mt-4">Quản Lý Khóa Học</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                    <div key={course.id} className="bg-white border border-gray-300 rounded-lg shadow-xl p-4 hover:shadow-2xl transition duration-200">
                        <h3 className="text-lg font-semibold text-gray-700">{course.name}</h3>
                        <p className="mt-2 text-gray-500"><strong>Thời gian:</strong> {course.datetime}</p>
                        <p className={`mt-2 ${course.status === 'Đang diễn ra' ? 'text-green-500' : course.status === 'Sắp diễn ra' ? 'text-yellow-500' : 'text-red-500'}`}>
                            <strong>Trạng thái:</strong> {course.status}
                        </p>
                        <p className="mt-2 text-gray-500"><strong>Giảng viên:</strong> {course.coach}</p>
                        <div className="flex justify-center mt-4 space-x-2">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
                                onClick={() => handleViewCourse(course)}
                            >
                                <TiEye className="mr-1" size={18} />
                                Xem
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center justify-center"
                                onClick={() => console.log(`Duyệt khóa học ${course.id}`)}
                            >
                                <TiTick className="mr-1" size={18} />
                                Duyệt
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center"
                                onClick={() => console.log(`Xóa khóa học ${course.id}`)}
                            >
                                <TiTrash className="mr-1" size={18} />
                                Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedCourse && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-lg w-full">
                        <h3 className="text-lg font-semibold mb-4">Chi Tiết Khóa Học</h3>
                        <ViewCourses course={selectedCourse} onClose={handleCloseModal} />
                        <button
                            onClick={handleCloseModal}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoursesManage;
