import {useEffect, useState} from 'react';
import AddRoomTypes from './AddRoomTypes';
import RoomTypesList from './RoomTypesList';
import {wDelete, wGet, wPost, wPut} from '../../../../../utils/request.util';
import ConfirmDeleteModal from './../layout/ConfirmDeleteModal';
import {toast, ToastContainer} from 'react-toastify';

const RoomTypes = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); 
    const [fieldToDelete, setFieldToDelete] = useState(null); 

    useEffect(() => {
        fetchRoomTypes();
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

    const handleAddField = async (newField) => {
        try {
            const addedField = await wPost('/api/room-types/add', newField);
            const data = await addedField.json();
            setRoomTypes((prev) => [...prev, data]);
        } catch (error) {
            console.error('Error adding room type:', error);
        }finally {
            toast.success("Thêm thành công", { toastId: "add-success" });
        }
    };

    const handleUpdateField = async (updatedField) => {
        try {
            const response = await wPut(`/api/room-types/update/${updatedField.id}`, updatedField);
            const data = await response.json()
            setRoomTypes((prev) =>
                prev.map((field) => (field.id === updatedField.id ? data : field))
            ); 
        } catch (error) {
            console.error('Error updating room type:', error);
        }finally {  
            toast.success("Cập nhật thành công", { toastId: "update-success" });
        }
    };

    const handleDeleteField = (id) => {
        setFieldToDelete(id); 
        setDeleteModalOpen(true); 
    };

    const confirmDelete = async () => {
        if (fieldToDelete) {
            try {
                await wDelete(`/api/room-types/delete/${fieldToDelete}`);
                setRoomTypes((prev) => prev.filter((field) => field.id !== fieldToDelete));
                setDeleteModalOpen(false); 
            } catch (error) {
                console.error('Error deleting room type:', error);
            } finally {
                setDeleteModalOpen(false);
                toast.success("Xóa thành công", { toastId: "delete-success" });
            }
        }
    };

    const cancelDelete = () => {
        setDeleteModalOpen(false); 
    };

    return (
        <div className="container mx-auto p-6">
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-6"
                onClick={() => setShowAddForm(!showAddForm)}
            >
                {showAddForm ? "Hủy Thêm Loại Phòng Tập" : "Thêm Loại Phòng Tập"}
            </button>

            {showAddForm && <AddRoomTypes onAddField={handleAddField} />} 

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Danh Sách Loại Phòng Tập</h3>

                <RoomTypesList
                    fields={roomTypes}
                    onUpdateField={handleUpdateField}
                    onDeleteField={handleDeleteField}
                />
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

export default RoomTypes;