
import { useEffect, useState } from "react";
import { TiTick, TiTrash, TiEye } from "react-icons/ti";
import { Confirm } from 'react-admin';
import ViewCourses from "./ViewCourses.jsx";
import EditCourses from "./EditCourses.jsx";
import axios from "axios"; 

const CoursesManage = () => {
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [courses, setCourses] = useState([]);
    const [editingCourseId, setEditingCourseId] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/course");
                setCourses(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách khóa học:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleDeleteCourse = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/course/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Xóa khóa học thành công");
                setCourses(courses.filter((course) => course.id !== id));
            } else {
                alert("Không thể xóa khóa học");
            }
        } catch (error) {
            console.error("Lỗi khi xóa khóa học:", error);
            alert("Đã xảy ra lỗi khi xóa khóa học");
        }
    };

    const handleConfirmDelete = (id) => {
        setCourseToDelete(id);
        setConfirmOpen(true);
    };

    const handleViewCourse = (id) => {
        setSelectedCourseId(id);
    };

    const handleEditCourse = (courseId) => {
        setEditingCourseId(courseId);
    };

    const handleCloseModal = () => {
        setSelectedCourseId(null);
        setEditingCourseId(null);
    };

    return (
        <div className="m-5">
            <h2 className="text-2xl font-semibold mb-4 text-center mt-4">Quản Lý Khóa Học</h2>
            {loading ? (
                <p>Đang tải danh sách khóa học...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white border border-gray-300 rounded-lg shadow-xl p-4 hover:shadow-2xl transition duration-200">
                            <h3 className="text-lg font-semibold text-gray-700">{course.name}</h3>
                            <p className="mt-2 text-gray-500"><strong>Giá:</strong> {course.price.toLocaleString()} VND</p>
                            <p className="mt-2 text-gray-500"><strong>Số lượng học viên:</strong> {course.slot} / {course.slotMax || "Chưa xác định"}</p>
                            <div className="flex justify-center mt-4 space-x-2">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
                                    onClick={() => handleViewCourse(course.id)}
                                >
                                    <TiEye className="mr-1" size={18} />
                                    Xem
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center justify-center"
                                    onClick={() => handleEditCourse(course.id)}
                                >
                                    <TiTick className="mr-1" size={18} />
                                    Sửa
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center"
                                    onClick={() => handleConfirmDelete(course.id)}
                                >
                                    <TiTrash className="mr-1" size={18} />
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {editingCourseId && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-4xl w-full" style={{ maxHeight: '600px' }}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold flex-grow text-center">Chỉnh Sửa Khóa Học</h3>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-red-600 text-2xl ml-4"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                            <EditCourses courseId={editingCourseId} onClose={handleCloseModal} />
                        </div>
                    </div>
                </div>
            )}

            {selectedCourseId && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-4xl w-full" style={{ maxHeight: '600px' }}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold flex-grow text-center">Chi Tiết Khóa Học</h3>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-red-600 text-2xl ml-4"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                            <ViewCourses id={selectedCourseId} onClose={handleCloseModal} />
                        </div>
                    </div>
                </div>
            )}

            <Confirm
                isOpen={confirmOpen}
                title="Xác Nhận Xóa"
                content="Bạn có chắc chắn muốn xóa khóa học này không?"
                onConfirm={() => {
                    handleDeleteCourse(courseToDelete);
                    setConfirmOpen(false);
                }}
                onClose={() => setConfirmOpen(false)}
            />
        </div>
    );
};

export default CoursesManage;