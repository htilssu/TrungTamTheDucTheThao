import { useState } from "react";
import FieldList from "./FieldList";
import AddFieldForm from "./AddFieldForm";

const FieldListPage = () => {
    const [fields, setFields] = useState([
        {
            id: 1,
            name: "Sân 5 - Số 1",
            type: "Sân 5 người",
            priceSchedule: [
                { from: "08:00", to: "10:00", price: 300000 },
                { from: "10:00", to: "12:00", price: 400000 },
            ],
            location: "123 Đường A, Quận 1",
            status: "Đang hoạt động",
            description: "Sân đẹp, có lưới bao quanh",
            images: [],
        },
    ]);

    const [showAddForm, setShowAddForm] = useState(false);

    const handleAddField = (newField) => {
        setFields([...fields, { ...newField, id: fields.length + 1 }]);
    };

    // Cập nhật thông tin sân
    const handleUpdateField = (updatedField) => {
        setFields(fields.map((field) => (field.id === updatedField.id ? updatedField : field)));
    };

    // Xóa sân
    const handleDeleteField = (id) => {
        setFields(fields.filter((field) => field.id !== id));
    };

    // Lọc danh sách sân theo loại sân
    const filterFieldsByType = (type) => {
        return fields.filter((field) => field.type === type);
    };

    return (
        <div className="container mx-auto p-6">
            {/* Nút hiển thị form thêm sân */}
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-6"
                onClick={() => setShowAddForm(!showAddForm)}
            >
                {showAddForm ? "Hủy thêm sân" : "Thêm Sân Bóng"}
            </button>

            {/* Form Thêm Sân */}
            {showAddForm && <AddFieldForm onAddField={handleAddField} />}

            {/* Danh sách sân */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Danh Sách Sân Bóng</h3>

                {/* Sân 5 người */}
                <h4 className="text-xl font-semibold mb-4">Sân 5 Người</h4>
                {filterFieldsByType("Sân 5 người").length > 0 ? (
                    <FieldList
                        fields={filterFieldsByType("Sân 5 người")}
                        onUpdateField={handleUpdateField}
                        onDeleteField={handleDeleteField}
                    />
                ) : (
                    <p>Không có sân 5 người nào.</p>
                )}

                {/* Sân 7 người */}
                <h4 className="text-xl font-semibold mb-4 mt-6">Sân 7 Người</h4>
                {filterFieldsByType("Sân 7 người").length > 0 ? (
                    <FieldList
                        fields={filterFieldsByType("Sân 7 người")}
                        onUpdateField={handleUpdateField}
                        onDeleteField={handleDeleteField}
                    />
                ) : (
                    <p>Không có sân 7 người nào.</p>
                )}

                {/* Sân 11 người */}
                <h4 className="text-xl font-semibold mb-4 mt-6">Sân 11 Người</h4>
                {filterFieldsByType("Sân 11 người").length > 0 ? (
                    <FieldList
                        fields={filterFieldsByType("Sân 11 người")}
                        onUpdateField={handleUpdateField}
                        onDeleteField={handleDeleteField}
                    />
                ) : (
                    <p>Không có sân 11 người nào.</p>
                )}
            </div>
        </div>
    );
};

export default FieldListPage;
