import { useState } from "react";
import RoomList from '../list/RoomList'; // Import RoomList
import AddRoomForm from "../form/add/AddRoomForm";

const Room = () => {
    const [fields, setFields] = useState([
        // Initial room data...
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

    const filterFieldsByType = (type) => {
        return fields.filter((field) => field.type === type);
    };

    return (
        <div className="container mx-auto p-6">
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-6"
                onClick={() => setShowAddForm(!showAddForm)}
            >
                {showAddForm ? "Hủy Thêm Phòng Tập" : "Thêm Phòng Tập"}
            </button>

            {showAddForm && <AddRoomForm onAddField={handleAddField} />}

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Danh Sách Phòng Tập</h3>

                {["Gym", "Yoga", "Swim"].map((type) => (
                    <div key={type}>
                        <h4 className="text-xl font-semibold mb-4 mt-5">{`Phòng Tập ${type}`}</h4>
                        {filterFieldsByType(type).length > 0 ? (
                            <RoomList
                                fields={filterFieldsByType(type)}
                                onUpdateField={handleUpdateField}
                                onDeleteField={handleDeleteField}
                            />
                        ) : (
                            <p>Không có phòng tập {type.toLowerCase()} nào.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Room;
