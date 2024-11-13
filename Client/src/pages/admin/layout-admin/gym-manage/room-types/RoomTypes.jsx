import { useState, useEffect } from 'react';
import AddRoomTypes from './AddRoomTypes';
import RoomTypesList from './RoomTypesList';
import { authFetch } from '../../../../../dev/request';

const RoomTypes = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetchRoomTypes();
    }, []);

    const fetchRoomTypes = async () => {
        try {
            const response = await authFetch('/room-types');
            setRoomTypes(response);
        } catch (error) {
            console.error('Error fetching room types:', error);
        }
    };

    const handleAddField = async (newField) => {
        try {
            const addedField = await authFetch('/room-types/add', {
                method: 'POST',
                body: JSON.stringify(newField),
            });
            setRoomTypes([...roomTypes, addedField]);
        } catch (error) {
            console.error('Error adding room type:', error);
        }
    };

    const handleUpdateField = async (updatedField) => {
        try {
            const response = await authFetch(`/room-types/update/${updatedField.id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedField),
            });
            setRoomTypes(roomTypes.map((field) => (field.id === updatedField.id ? response : field)));
        } catch (error) {
            console.error('Error updating room type:', error);
        }
    };

    const handleDeleteField = async (id) => {
        try {
            const response = await authFetch(`/room-types/delete/${id}`, {
                method: 'DELETE',
            });
            if (response) {
                setRoomTypes(roomTypes.filter((field) => field.id !== id));
            }
        } catch (error) {
            console.error('Error deleting room type:', error);
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