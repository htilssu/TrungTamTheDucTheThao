import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; 
import { toast } from "react-toastify";
import { wGet, wPut } from '../../../utils/request.util';

const EditEquipmentForm = ({ equipment, cancelEdit, updateEquipment }) => {
    const [editedEquipment, setEditedEquipment] = useState(equipment);
    const [equipmentTypes, setEquipmentTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEquipment((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const fetchEquipmentTypes = async () => {
            try {
                const response = await wGet('/api/equipment-types');
                setEquipmentTypes(response);
            } catch (error) {
                console.error("Error fetching equipment types:", error);
                toast.error("Không thể tải danh sách loại thiết bị.");
            }
        };

        fetchEquipmentTypes();
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
            <div>
                <label className="block">Giá:</label>
                <input
                    type="number"
                    name="price"
                    value={editedEquipment.price || ''}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded"
                    required
                />
            </div>
            <div>
                <label className="block">Số lượng:</label>
                <input
                    type="number"
                    name="amount"
                    value={editedEquipment.amount || ''}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded"
                    required
                />
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
    }).isRequired,
    cancelEdit: PropTypes.func.isRequired,
    updateEquipment: PropTypes.func.isRequired
};

export default EditEquipmentForm;