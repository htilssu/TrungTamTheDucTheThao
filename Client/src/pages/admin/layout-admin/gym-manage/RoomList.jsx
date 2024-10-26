import { useState } from "react";
import { TiDelete, TiEdit } from "react-icons/ti"; // Import icon
import EditRoom from './EditRoom';

const RoomList = ({ fields, onUpdateField, onDeleteField }) => {
    const [editingField, setEditingField] = useState(null);

    const handleEditClick = (field) => {
        setEditingField(field);
    };

    const handleCancelEdit = () => {
        setEditingField(null);
    };

    const handleUpdateField = (updatedField) => {
        onUpdateField(updatedField);
        setEditingField(null);
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa phòng này không?")) {
            onDeleteField(id);
        }
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
                                <strong>Địa chỉ:</strong> {field.location}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Tình trạng:</strong> {field.status}
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="p-4 flex justify-between">
                            <button
                                className="flex items-center bg-blue-500 text-white py-0.5 px-1 text-xs rounded transition-colors hover:bg-blue-600"
                                onClick={() => handleEditClick(field)}
                            >
                                <TiEdit className="mr-1" /> Chỉnh sửa
                            </button>
                            <button
                                className="flex items-center bg-yellow-500 text-white py-0.5 px-1 text-xs rounded transition-colors hover:bg-yellow-600"
                                disabled
                                title="Chức năng này đang phát triển"
                            >
                                <span>Lịch đặt</span>
                            </button>
                            <button
                                className="flex items-center bg-red-500 text-white py-0.5 px-1 text-xs rounded transition-colors hover:bg-red-600"
                                onClick={() => handleDelete(field.id)}
                            >
                                <TiDelete className="mr-1" /> Xóa phòng
                            </button>
                        </div>
                    </div>
                </div>
            ))}

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

export default RoomList;
