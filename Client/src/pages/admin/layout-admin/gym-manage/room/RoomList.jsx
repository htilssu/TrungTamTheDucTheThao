import { useState } from "react";
import { TiDelete, TiEdit } from "react-icons/ti";
import EditRoom from "./EditRoom";
import PropTypes from "prop-types";

const RoomList = ({ fields, onUpdateField, onDeleteField }) => {
    const [editingField, setEditingField] = useState(null); // Trạng thái phòng đang được chỉnh sửa

    const handleEditClick = (field) => {
        setEditingField(field); // Lưu phòng cần chỉnh sửa
    };

    const handleCancelEdit = () => {
        setEditingField(null); // Hủy chỉnh sửa
    };

    const handleUpdateField = (updatedField) => {
        onUpdateField(updatedField); // Cập nhật thông tin phòng
        setEditingField(null); // Đóng form chỉnh sửa
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fields.map((field) => (
                <div key={field.id} className="flex flex-col justify-between bg-gray-100 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                    <div className="bg-white rounded-lg">
                        <div className="flex overflow-hidden space-x-2">
                            {field.images && field.images.length > 0 ? (
                                field.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={field.name}
                                        className="w-full h-40 object-cover rounded-t-lg"
                                    />
                                ))
                            ) : (
                                <img
                                    src="https://via.placeholder.com/300x200?text=No+Image"
                                    alt={field.name}
                                    className="w-full h-40 object-cover rounded-t-lg"
                                />
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{field.name}</h3>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Sức chứa:</strong> {field.capacity}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Tầng:</strong> {field.floor}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Tòa nhà:</strong> {field.building}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="p-4 flex justify-between">
                            <button
                                className="flex items-center bg-blue-500 text-white py-0.5 px-1 text-xs rounded transition-colors hover:bg-blue-600"
                                onClick={() => handleEditClick(field)} // Bắt đầu chỉnh sửa
                            >
                                <TiEdit className="mr-1" /> Chỉnh sửa
                            </button>
                            <button
                                className="flex items-center bg-red-500 text-white py-0.5 px-1 text-xs rounded transition-colors hover:bg-red-600"
                                onClick={() => onDeleteField(field.id)} // Xóa phòng
                            >
                                <TiDelete className="mr-1" /> Xóa phòng
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Hiển thị form chỉnh sửa nếu đang chỉnh sửa */}
            {editingField && (
                <EditRoom
                    field={editingField}
                    onCancel={handleCancelEdit}
                    onUpdate={handleUpdateField}
                />
            )}
        </div>
    );
};

RoomList.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            capacity: PropTypes.number.isRequired,
            floor: PropTypes.number.isRequired,
            building: PropTypes.string.isRequired,
            images: PropTypes.arrayOf(PropTypes.string),
        })
    ).isRequired,
    onUpdateField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
};

export default RoomList;
