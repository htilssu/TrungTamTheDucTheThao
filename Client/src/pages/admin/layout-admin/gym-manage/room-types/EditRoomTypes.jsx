import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditRoomTypes = ({ field, onCancel, onUpdate }) => {
    const [updatedField, setUpdatedField] = useState(field);

    useEffect(() => {
       setUpdatedField(field);
    }, [field]);

    const handleInputChange = (e) => {
        setUpdatedField({ ...updatedField, name: e.target.value });
    };

    const handleUpdate = () => {
        if (!updatedField.name) {
            toast.error("Tên phòng không được để trống.");
            return;
        }
        
        onUpdate(updatedField);
        toast.success("Cập nhật thành công!");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-gray-800 bg-opacity-70 transition-opacity duration-300">
            <div className="bg-white rounded-lg p-8 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
                <h3 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Chỉnh Sửa Loại Phòng: {field.name}</h3>

                {/* Tên phòng */}
                <div className="mb-4">
                    <label htmlFor="room-name" className="block text-gray-700 font-medium mb-2">Tên Phòng:</label>
                    <input
                        id="room-name"
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-indigo-300 transition duration-200"
                        type="text"
                        name="name"
                        value={updatedField.name}
                        onChange={handleInputChange}
                        placeholder="Nhập tên phòng"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                        onClick={onCancel}
                    >
                        Hủy
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={handleUpdate}
                    >
                        Cập Nhật
                    </button>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

EditRoomTypes.propTypes = {
    field: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default EditRoomTypes;
