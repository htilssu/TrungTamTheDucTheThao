import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { wPut, wGet } from "../../../../../utils/request.util";

const EditRoom = ({ field, onCancel, onUpdate }) => {
    const [updatedField, setUpdatedField] = useState(field);
    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        setUpdatedField(field); 
        fetchRoomTypes(); 
    }, [field]);

    const fetchRoomTypes = async () => {
        try {
            const response = await wGet('/api/room-types');
            setRoomTypes(response);
        } catch (error) {
            console.error('Error fetching room types:', error);
        } 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedField({ ...updatedField, [name]: value }); 
    };

    const handleRoomTypeChange = (e) => {
        const selectedTypeId = e.target.value; 
        const selectedType = roomTypes.find(type => type.id == selectedTypeId);
        setUpdatedField({ ...updatedField, roomType: selectedType }); 
    };

    const handleUpdate = async () => {
        if (!updatedField.name || !updatedField.roomType) {
            toast.error("Tên phòng và loại phòng không được để trống.");
            return;
        }
        
        try {
            await wPut(`/api/rooms/edit/${updatedField.id}`, updatedField);
            onUpdate(updatedField); 
            toast.success("Cập nhật phòng thành công!");
        } catch (error) {
            console.error("Error during update:", error);
            toast.error("Đã xảy ra lỗi khi cập nhật phòng.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-gray-800 bg-opacity-70 transition-opacity duration-300">
            <div className="bg-white rounded-lg p-8 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h3 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Chỉnh Sửa Phòng: {field.name}</h3>

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

                <div className="mb-4">
                    <label htmlFor="room-type" className="block text-gray-700 font-medium mb-2">Chọn loại phòng:</label>
                    <select
                        name="roomTypeId"
                        className="p-2 border rounded w-full"
                        value={updatedField.roomType?.id || ""}
                        onChange={handleRoomTypeChange}
                    >
                        <option value="" disabled>Chọn loại phòng</option>
                        {roomTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <input
                        className="p-2 border rounded w-full"
                        type="number"
                        name="capacity"
                        placeholder="Sức chứa"
                        min={0}
                        value={updatedField.capacity || ""}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4">
                    <input
                        className="p-2 border rounded w-full"
                        type="number"
                        name="floor"
                        placeholder="Tầng"
                        min={0}
                        value={updatedField.floor || ""}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4">
                    <input
                        className="p-2 border rounded w-full"
                        type="text"
                        name="building"
                        placeholder="Tòa nhà"
                        value={updatedField.building}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex justify-end">
                    <button className="bg-red-500 text-white py-2 px-4 rounded mr-2" onClick={onCancel}>Hủy</button>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleUpdate}>Cập Nhật</button>
                </div>

                <ToastContainer />
            </div>
        </div>
    );
};

EditRoom.propTypes = {
    field: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        roomType: PropTypes.object,
        capacity: PropTypes.number,
        floor: PropTypes.number,
        building: PropTypes.string,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default EditRoom;