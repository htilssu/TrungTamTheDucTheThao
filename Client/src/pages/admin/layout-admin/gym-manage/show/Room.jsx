import { useState, useEffect } from "react";
import RoomList from '../list/RoomList'; // Import RoomList
import AddRoomForm from "../form/add/AddRoomForm";

const Room = () => {
    const [fields, setFields] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]); 
    const [nextId, setNextId] = useState(1);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/api/roomtypes')
            .then((response) => response.json())
            .then((data) => setRoomTypes(data))
            .catch((error) => console.error('Error fetching room types:', error));

        fetch('http://localhost:8080/api/rooms')
            .then((response) => response.json())
            .then((data) => {
                const formattedRooms = data.map((room) => ({
                    id: room.id,
                    name: room.name,
                    type: room.RoomType.name, 
                    capacity: room.capacity,
                    floor: room.floor,
                    building: room.building
                }));
                setFields(formattedRooms);
                const maxId = Math.max(...data.map((room) => room.id), 0);
                setNextId(maxId + 1);
            })
            .catch((error) => console.error('Error fetching rooms:', error));
    }, []);

    const handleAddField = (newField) => {
        setFields([...fields, { ...newField, id: nextId }]);
        setNextId(nextId + 1);
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

                {roomTypes.map((type) => (
                    <div key={type.id}>
                        <h4 className="text-xl font-semibold mb-4 mt-5">{`Phòng Tập ${type.name}`}</h4>
                        {filterFieldsByType(type.name).length > 0 ? (
                            <RoomList
                                fields={filterFieldsByType(type.name)}
                                onUpdateField={handleUpdateField}
                                onDeleteField={handleDeleteField}
                            />
                        ) : (
                            <p>Không có phòng tập {type.name.toLowerCase()} nào.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Room;
