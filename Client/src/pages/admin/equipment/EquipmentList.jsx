import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import axios from "axios";

const EquipmentList = () => {
    const [equipments, setEquipments] = useState([]);

    useEffect(() => {
        const fetchEquipments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/equipment');
                setEquipments(response.data);
            } catch (error) {
                console.error("Error fetching equipment:", error);
                toast.error("Có lỗi xảy ra khi tải danh sách thiết bị.");
            }
        };

        fetchEquipments();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Hoạt động':
                return 'text-green-600 font-bold';
            case 'Hư Hỏng':
                return 'text-red-600 font-bold';
            case 'Bảo trì':
                return 'text-yellow-600 font-bold';
            default:
                return 'text-gray-600';
        }
    };

    const handleDelete = async (index, id) => {
        try {
            await axios.delete(`http://localhost:8080/api/equipment/${id}`);
            setEquipments((prevEquipments) => prevEquipments.filter((_, i) => i !== index));
            toast.success("Xóa thiết bị thành công!");
        } catch (error) {
            console.error("Error deleting equipment:", error);
            toast.error("Có lỗi xảy ra khi xóa thiết bị.");
        }
    };

    const handleEdit = (index) => {
        alert(`Chỉnh sửa thiết bị: ${equipments[index].type}`);
        // Bạn có thể thêm hàm sửa thiết bị tại đây
    };
    return (
        <div className="max-w-[1200px] mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Danh Sách Trang Thiết Bị</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {equipments.length > 0 ? (
                    equipments.map((equipment, index) => (
                        <div key={equipment.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="h-40 flex justify-center items-center">

                                    <img
                                        src={equipment.image||"/maychaybo.png"}
                                        alt={equipment.equipmentType.name}
                                        className="w-full h-full object-contain"
                                    />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{equipment.equipmentType.name}</h3>
                                <p className={`mt-2 ${getStatusColor(equipment.status)}`}>
                                    Trạng thái: {equipment.status}
                                </p>
                            </div>
                            <div className="flex justify-center items-center space-x-2 mb-4">
                                <button
                                    className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                                    onClick={() => handleDelete(index, equipment.id)}
                                >
                                    Xóa
                                </button>
                                <button
                                    className="py-2 px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                                    onClick={() => handleEdit(index)}
                                >
                                    Sửa
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Chưa có trang thiết bị nào được thêm.</p>
                )}
            </div>
        </div>
    );
};
export default EquipmentList;
