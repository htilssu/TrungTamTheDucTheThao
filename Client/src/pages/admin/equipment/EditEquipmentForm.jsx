import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import { wGet, wPut } from '../../../utils/request.util';

const EditEquipmentForm = ({ equipment, cancelEdit, updateEquipment }) => {
    const [editedEquipment, setEditedEquipment] = useState(equipment);
    const [equipmentTypes, setEquipmentTypes] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEquipment((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const fetchEquipmentTypes = async () => {
            try {
                const response = await wGet('/api/equipment-types');
                const data = await response.json()
                setEquipmentTypes(data);
            } catch (error) {
                console.error("Error fetching equipment types:", error);
                toast.error("Không thể tải danh sách loại thiết bị.");
            }
        };

        const fetchRooms = async () => {
            try {
                const response = await wGet('/api/rooms');
                const data = await response.json()

                setRooms(data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
                toast.error("Không thể tải danh sách phòng.");
            }
        };

        fetchEquipmentTypes();
        fetchRooms();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await wPut(`/api/equipment/${editedEquipment.id}`, editedEquipment);
            toast.success("Cập nhật thiết bị thành công!");
            updateEquipment(editedEquipment);
        } catch (error) {
            console.error("Error updating equipment:", error);
            toast.error("Có lỗi xảy ra khi cập nhật thiết bị.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="equipmentType" className="block">Loại thiết bị:</label>
                <select
                    id="equipmentType"
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
                <label htmlFor="room" className="block">Phòng:</label>
                <select
                    id="room"
                    name="room"
                    value={editedEquipment.room?.id || ''}
                    onChange={(e) =>
                        setEditedEquipment((prev) => ({
                            ...prev,
                            room: rooms.find((room) => room.id === parseInt(e.target.value)),
                        }))
                    }
                    className="w-full border px-4 py-2 rounded"
                >
                    <option value="" disabled>Chọn phòng</option>
                    {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                            {room.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="status" className="block">Trạng thái:</label>
                <select
                    id="status"
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
            <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${loading && 'opacity-50 cursor-not-allowed'}`}
            >
                {loading ? 'Đang cập nhật...' : 'Cập nhật'}
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

EditEquipmentForm.propTypes = {
    equipment: PropTypes.shape({
        id: PropTypes.number.isRequired,
        equipmentType: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        }),
        status: PropTypes.string.isRequired,
        price: PropTypes.number,
        amount: PropTypes.number,
        room: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        }),
    }).isRequired,
    cancelEdit: PropTypes.func.isRequired,
    updateEquipment: PropTypes.func.isRequired
};

export default EditEquipmentForm;
