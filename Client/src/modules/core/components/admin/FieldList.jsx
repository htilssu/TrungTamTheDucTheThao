import { useState } from "react";
import EditFieldModal from "./EditField.jsx";

const FieldList = ({ fields, onUpdateField, onDeleteField }) => {
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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fields.map((field) => (
                <div key={field.id} className="flex flex-col justify-between bg-gray-200 rounded-xl shadow-md overflow-hidden">
                    {/* Hiển thị thông tin của sân */}
                    <div className={"bg-white rounded-lg"}>
                        <div className="flex overflow-x-auto space-x-2">
                            {field.images && field.images.length > 0 ? (
                                field.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={field.name}
                                        className="w-full h-40 object-cover"
                                    />
                                ))
                            ) : (
                                <img
                                    src="https://via.placeholder.com/300x200?text=No+Image"
                                    alt={field.name}
                                    className="w-full h-40 object-cover"
                                />
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{field.name}</h3>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Địa chỉ:</strong> {field.location}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Tình trạng:</strong> {field.status}
                            </p>
                        </div>
                    </div>

                    {/* Nút chỉnh sửa, xem lịch đặt và xóa sân */}
                    <div className={""}>
                        <div className="p-4 flex justify-between">
                            <button
                                className="bg-blue-500 text-white py-1 px-2 rounded"
                                onClick={() => handleEditClick(field)}
                            >
                                Chỉnh sửa
                            </button>
                            <button className="bg-yellow-500 text-white py-1 px-2 rounded">
                                Lịch đặt
                            </button>
                            <button
                                className="bg-red-500 text-white py-1 px-2 rounded"
                                onClick={() => onDeleteField(field.id)}
                            >
                                Xóa sân
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Modal chỉnh sửa sân */}
            {editingField && (
                <EditFieldModal
                    field={editingField}
                    onCancel={handleCancelEdit}
                    onUpdate={handleUpdateField}
                />
            )}
        </div>
    );
};

export default FieldList;
