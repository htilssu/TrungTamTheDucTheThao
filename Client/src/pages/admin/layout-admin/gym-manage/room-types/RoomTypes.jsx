import { useState, useEffect } from 'react';
import AddRoomTypes from './AddRoomTypes';
import RoomTypesList from './RoomTypesList';

const RoomTypes = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/api/roomtypes')
            .then((response) => response.json())
            .then((data) => setRoomTypes(data))
            .catch((error) => console.error('Error fetching room types:', error));
    }, []);

    const handleAddField = async (newField) => {
        try {
            const response = await fetch('http://localhost:8080/api/room-types/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newField),
            });

            if (response.ok) {
                const addedField = await response.json();
                setRoomTypes([...roomTypes, addedField]); 
            } else {
                console.error('Error adding room type:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateField = async (updatedField) => {
        try {
            const response = await fetch(`http://localhost:8080/api/roomtypes/update/${updatedField.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedField),
            });

            if (response.ok) {
                setRoomTypes(roomTypes.map((field) => (field.id === updatedField.id ? updatedField : field)));
            } else {
                console.error('Error updating room type:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteField = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/roomtypes/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setRoomTypes(roomTypes.filter((field) => field.id !== id));
            } else {
                console.error('Error deleting room type:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-6"
                onClick={() => setShowAddForm(!showAddForm)}
            >
                {showAddForm ? "Hủy Thêm Phòng Tập" : "Thêm Phòng Tập"}
            </button>

            {showAddForm && <AddRoomTypes onAddField={handleAddField} />}

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Danh Sách Loại Phòng Tập</h3>

                {roomTypes.map((type) => (
                    <div key={type.id}>
                        <h4 className="text-xl font-semibold mb-4 mt-5">{`Phòng Tập ${type.name}`}</h4>
                        <RoomTypesList
                            fields={type.fields || []} 
                            onUpdateField={handleUpdateField}
                            onDeleteField={handleDeleteField}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomTypes;
