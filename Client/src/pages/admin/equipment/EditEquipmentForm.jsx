import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

const EditEquipmentForm = ({ equipment, cancelEdit, updateEquipment }) => {
    const [editedEquipment, setEditedEquipment] = useState(equipment);
    const [equipmentTypes, setEquipmentTypes] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEquipment((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const fetchEquipmentTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/equipment-types');
                setEquipmentTypes(response.data);
            } catch (error) {
                console.error("Error fetching equipment types:", error);
                toast.error("Không thể tải danh sách loại thiết bị.");
            }
        };

        fetchEquipmentTypes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/equipment/${editedEquipment.id}`, editedEquipment);
            toast.success("Cập nhật thiết bị thành công!");
            updateEquipment(editedEquipment); // Gọi hàm update từ component cha để cập nhật lại danh sách thiết bị
        } catch (error) {
            console.error("Error updating equipment:", error);
            toast.error("Có lỗi xảy ra khi cập nhật thiết bị.");
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block">Loại thiết bị:</label>
                <select
                    name="equipmentType"
                    value={editedEquipment.equipmentType?.id || ''}
                    onChange={(e) =>
                        setEditedEquipment((prev) => ({
                            ...prev,
                            equipmentType: equipmentTypes.find(
                                (type) => type.id === parseInt(e.target.value)
                            ),
                        }))
                    }
                    className="w-full border px-4 py-2 rounded"
                >
                    <option value="" disabled>Chọn loại thiết bị</option>
                    {equipmentTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block">Trạng thái:</label>
                <select
                    name="status"
                    value={editedEquipment.status}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded"
                >
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Hư Hỏng">Hư Hỏng</option>
                    <option value="Bảo trì">Bảo trì</option>
                </select>
            </div>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Cập nhật
            </button>
            <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
            >
                Hủy
            </button>
        </form>
    );
};

export default EditEquipmentForm;
