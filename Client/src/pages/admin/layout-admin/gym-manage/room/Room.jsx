import { useState, useEffect } from "react";
import AddRoomForm from './AddRoomForm'; 
import RoomList from './RoomList'; 
import ConfirmDeleteModal from "../layout/ConfirmDeleteModal"; 
import { wDelete, wGet } from '../../../../../utils/request.util'; 
import { ToastContainer, toast } from 'react-toastify';

const Room = () => {
    const [fields, setFields] = useState([]); 
    const [roomTypes, setRoomTypes] = useState([]); 
    const [showAddForm, setShowAddForm] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState(null); 

    useEffect(() => {
        fetchRoomTypes(); 
        fetchRooms(); 
    }, []);

    const fetchRoomTypes = async () => {
        try {
            const response = await wGet('/api/room-types');
            const data = await response.json()
            setRoomTypes(data);
        } catch (error) {
            console.error('Error fetching room types:', error);
        }
    };

    const fetchRooms = async () => {
        try {
            const response = await wGet('/api/rooms');
            const data = await response.json()
            setFields(data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    const handleAddField = (newField) => {
        setFields((prev) => [...prev, newField]);
    };

    const handleUpdateField = (updatedField) => {
        setFields((prev) =>
            prev.map((field) => (field.id === updatedField.id ? updatedField : field))
        );
    };

    const handleDeleteField = (id) => {
        setRoomToDelete(id);
        setDeleteModalOpen(true); 
    };

    const confirmDelete = async () => {
        if (roomToDelete) {
            try {
                await wDelete(`/api/rooms/delete/${roomToDelete}`); 
                setFields((prev) => prev.filter((field) => field.id !== roomToDelete)); 
            } catch (error) {
                console.error('Error deleting room:', error);
            } finally {
                setDeleteModalOpen(false); 
                setRoomToDelete(null);
                toast.success("Xóa phòng thành công", { toastId: "delete-success" });
            }
        }
    };

    const cancelDelete = () => {
        setDeleteModalOpen(false); 
        setRoomToDelete(null); 
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
                        {fields.filter((field) => field.RoomType?.id === type.id).length > 0 ? (
                            <RoomList
                                fields={fields.filter((field) => field.RoomType?.id === type.id)}
                                onUpdateField={handleUpdateField}
                                onDeleteField={handleDeleteField} 
                            />
                        ) : (
                            <p>Không có phòng tập {type.name.toLowerCase()} nào.</p>
                        )}
                    </div>
                ))}
            </div>

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onDelete={confirmDelete} 
                onCancel={cancelDelete} 
            />

            <ToastContainer />
        </div>
    );
};

export default Room;
