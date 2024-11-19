import { useState } from "react";
import { TiDelete, TiEdit } from "react-icons/ti";
import EditRoomTypes from './EditRoomTypes';
import ConfirmDeleteModal from './../layout/ConfirmDeleteModal'; 
import PropTypes from 'prop-types';

const RoomTypesList = ({ fields, onUpdateField, onDeleteField }) => {
    const [editingField, setEditingField] = useState(null); 
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); 
    const [fieldToDelete, setFieldToDelete] = useState(null);

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
        setFieldToDelete(id); 
        setDeleteModalOpen(true); 
    };

    const confirmDelete = () => {
        onDeleteField(fieldToDelete); 
        setDeleteModalOpen(false); 
    };

    const cancelDelete = () => {
        setDeleteModalOpen(false);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fields.map((field) => (
                <div key={field.id} className="flex flex-col justify-between bg-gray-100 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{field.name}</h3>
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
                <EditRoomTypes
                    field={editingField}
                    onCancel={handleCancelEdit}
                    onUpdate={handleUpdateField}
                />
            )}

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onDelete={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
};

RoomTypesList.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    onUpdateField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
};

export default RoomTypesList;