import { useState } from "react";
import EditFieldModal from "./EditField.jsx";
import {ScrollRestoration, useNavigate} from "react-router-dom";
import { Confirm } from "react-admin";
import {toast, ToastContainer} from "react-toastify";
import {queryClient} from "../../../../../modules/cache.js";
import {wDelete} from "../../../../../utils/request.util.js";

const FieldList = ({ fields }) => {
    const [editingField, setEditingField] = useState(null);
    const [deleteField, setDeleteField] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Hàm hiển thị modal chỉnh sửa
    const handleEditClick = (field) => {
        setEditingField(field);
        console.log(field);
    };

    // Đóng modal
    const handleCancelEdit = () => {
        setEditingField(!editingField);
    };

    // Hàm xem lịch đặt
    const handleLichDat = () => {
        navigate("/admin/soccer-manage/history");
    };

    const openModal = (field) => {
        setDeleteField(field);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setDeleteField(null);
    };

    const confirmCancel = () => {
        if (deleteField) {
            handleDeleteField(deleteField.fieldId);
            closeModal(); // Đóng modal
        }
    };

    // Hàm xóa sân
    const handleDeleteField = async (fieldId) => {
        console.log("Deleting field with ID:", fieldId);
        try {
            const response = await wDelete(`/v1/fields/${fieldId}`);
            if (response.status === 204) {
                toast.success('Xóa sân thành công!');
                queryClient.invalidateQueries({ queryKey: ['fields'] });
            } else {
                toast.error('Có lỗi xảy ra khi Xóa sân!');
            }
        } catch (error) {
            console.error("Error deleting field:", error);
            setError("Failed to delete field.");
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fields.map((field) => (
                <div key={field.fieldId} className="border-2 border-emerald-400 flex flex-col justify-between bg-green-100 rounded-xl shadow-md overflow-hidden">
                    {/* Hiển thị thông tin của sân */}
                    <div className="bg-white rounded-lg">
                        <div className={"relative"}>
                            <div className="flex overflow-x-auto space-x-2">
                                {field.images && field.images.length > 0 ? (
                                    field.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image} // Sử dụng hình ảnh từ danh sách hình ảnh
                                            alt={field.fieldName}
                                            className="w-full h-40 object-cover"
                                        />
                                    ))
                                ) : (
                                    <img
                                        src={field.imageUrl || "/sanbong2.png"}
                                        alt={field.fieldName}
                                        className="w-full h-40 object-cover"
                                    />
                                )}
                            </div>
                            {/* Biểu tượng trạng thái */}
                            {field.status === "active" ? (
                                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold py-1 px-2 rounded-lg">
              đang hoạt động
            </span>
                            ) : (
                                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-lg">
              đang bảo trì
            </span>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{field.fieldName}</h3>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Địa chỉ:</strong> {field.location}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Tình trạng:</strong> {field.status}
                            </p>
                        </div>
                    </div>

                    {/* Nút chỉnh sửa, xem lịch đặt và xóa sân */}
                    <div className="p-4 flex justify-between">
                        <button
                            className="bg-blue-500 text-white py-1 px-2 rounded"
                            onClick={() => handleEditClick(field)}
                        >
                            Chỉnh sửa
                        </button>
                        <button
                            className="bg-yellow-500 text-white py-1 px-2 rounded"
                            onClick={handleLichDat}
                        >
                            Lịch đặt
                        </button>
                        <button
                            className="bg-red-500 text-white py-1 px-2 rounded"
                            onClick={() => openModal(field)}
                        >
                            Xóa sân
                        </button>
                    </div>
                </div>
            ))}

            {isModalOpen && deleteField && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <Confirm
                        isOpen={isModalOpen}
                        title={`Xác nhận xóa: ${deleteField.fieldName}`}
                        content="Bạn có chắc chắn muốn xóa sân này không?"
                        cancel="Quay lại"
                        confirm="Xác nhận"
                        onConfirm={confirmCancel}
                        onClose={closeModal}
                    />
                </div>
            )}

            {/* Hiển thị modal chỉnh sửa sân nếu có sân đang được chỉnh sửa */}
            {editingField && (
                <EditFieldModal
                    field={editingField}
                    onCancel={handleCancelEdit}
                />
            )}

            {/* Hiển thị thông báo lỗi nếu có */}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            <ToastContainer stacked/>
            <ScrollRestoration/>
        </div>
    );
};

export default FieldList;
