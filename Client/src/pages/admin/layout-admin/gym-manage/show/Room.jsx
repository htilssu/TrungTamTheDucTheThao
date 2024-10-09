import { useState } from "react";
import GymPackageList from '../list/RoomList';
import AddRoomForm from "../form/add/AddRoomForm";

const Room = () => {
    const [fields, setFields] = useState([
        {
            id: 1,
            name: "Sân 5 - Số 1",
            type: "Gym",
            priceSchedule: [
                { from: "08:00", to: "10:00", price: 300000 },
                { from: "10:00", to: "12:00", price: 400000 },
            ],
            location: "123 Đường A, Quận 1",
            status: "Đang hoạt động",
            description: "Sân đẹp, có lưới bao quanh",
            images: [],
        },
        {
            id: 2,
            name: "Yoga Room - A",
            type: "Yoga",
            priceSchedule: [
                { from: "07:00", to: "09:00", price: 250000 },
                { from: "09:00", to: "11:00", price: 350000 },
            ],
            location: "123 Đường B, Quận 2",
            status: "Đang hoạt động",
            description: "Phòng tập rộng rãi, thoáng mát",
            images: [],
        },
    ]);

    const [showAddForm, setShowAddForm] = useState(false);

    const handleAddField = (newField) => {
        setFields([...fields, { ...newField, id: fields.length + 1 }]);
    };

    const handleUpdateField = (updatedField) => {
        setFields(fields.map((field) => (field.id === updatedField.id ? updatedField : field)));
    };

    const handleDeleteField = (id) => {
        setFields(fields.filter((field) => field.id !== id));
    };

    // Lọc danh sách phòng theo loại
    const filterFieldsByType = (type) => {
        return fields.filter((field) => field.type === type);
    };

    return (
        <div className="container mx-auto p-6">
            {/* Nút hiển thị form thêm phòng */}
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-6"
                onClick={() => setShowAddForm(!showAddForm)}
            >
                {showAddForm ? "Hủy Thêm Phòng Tập" : "Thêm Phòng Tập"}
            </button>

            {/* Form Thêm Phòng */}
            {showAddForm && <AddRoomForm onAddField={handleAddField} />}

            {/* Danh sách phòng tập Gym và Yoga */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Danh Sách Phòng Tập</h3>

                {/* Danh sách Gym */}
                <h4 className="text-xl font-semibold mb-4">Phòng Tập Gym</h4>
                {filterFieldsByType("Gym").length > 0 ? (
                    <GymPackageList
                        fields={filterFieldsByType("Gym")}
                        onUpdateField={handleUpdateField}
                        onDeleteField={handleDeleteField}
                    />
                ) : (
                    <p>Không có phòng tập gym nào.</p>
                )}

                {/* Danh sách Yoga */}
                <h4 className="text-xl font-semibold mb-4 mt-6">Phòng Tập Yoga</h4>
                {filterFieldsByType("Yoga").length > 0 ? (
                    <GymPackageList
                        fields={filterFieldsByType("Yoga")}
                        onUpdateField={handleUpdateField}
                        onDeleteField={handleDeleteField}
                    />
                ) : (
                    <p>Không có phòng tập yoga nào.</p>
                )}
            </div>
        </div>
    );
};

export default Room;
