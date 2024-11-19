import { useState } from 'react';
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EditEquipmentForm from "./EditEquipmentForm.jsx";
import { wDelete, wGet } from '../../../utils/request.util.js';

const fetchEquipments = async () => {
    try {
        const response = await wGet('/api/equipment');
        return response ?? [];
    } catch (error) {
        console.error("Error fetching equipment:", error);
        toast.error("Có lỗi xảy ra khi tải danh sách thiết bị.");
        throw error;
    }
};

const EquipmentList = () => {
    const [editingEquipment, setEditingEquipment] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [equipmentToDelete, setEquipmentToDelete] = useState(null);
    const queryClient = useQueryClient();

    const { data: equipments = [], error, isLoading } = useQuery({
        queryKey: ['equipments'],
        queryFn: fetchEquipments,
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
    });

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

    const handleDeleteConfirmation = (id) => {
        setConfirmDelete(true);
        setEquipmentToDelete(id);
    };

    const handleDelete = async () => {
        try {
            await wDelete(`/api/equipment/${equipmentToDelete}`);
            toast.success("Xóa thiết bị thành công!");
            setConfirmDelete(false);
            setEquipmentToDelete(null);
            queryClient.invalidateQueries(['equipments']);
        } catch (error) {
            console.error("Error deleting equipment:", error);
            toast.error("Có lỗi xảy ra khi xóa thiết bị.");
            setConfirmDelete(false);
        }
    };

    const handleEdit = (equipment) => {
        setEditingEquipment(equipment);
    };

    const cancelEdit = () => {
        setEditingEquipment(null);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading equipment data.</div>;
    }

    return (
        <div className="max-w-[1200px] mx-auto p-4">

            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                        <h3 className="text-lg font-semibold mb-4">Xác nhận xóa thiết bị</h3>
                        <p>Bạn có chắc chắn muốn xóa thiết bị này?</p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleDelete}
                                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Xóa
                            </button>
                            <button
                                onClick={() => setConfirmDelete(false)}
                                className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editingEquipment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                        <EditEquipmentForm
                            equipment={editingEquipment}
                            cancelEdit={cancelEdit}
                            updateEquipment={() => {
                                toast.success("Cập nhật thiết bị thành công!");
                                setEditingEquipment(null);
                                queryClient.invalidateQueries(['equipments']);
                            }}
                        />
                        <button
                            onClick={cancelEdit}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            &#10005;
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {equipments.length > 0 ? (
                    equipments.map((equipment) => (
                        <div key={equipment.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="h-40 flex justify-center items-center">
                                <img
                                    src={equipment.image || "/maychaybo.png"}
                                    alt={equipment.equipmentType.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold flex ">
                                    <p className={"mt-2 flex "}>
                                        Loại: <span className={"font-bold ml-1"}>{equipment.equipmentType.name}</span>
                                    </p>
                                </h3>
                                <p className={`mt-2 font-semibold`}>
                                    Mã số thiết bị: {equipment.id}
                                </p>
                                <p className={`mt-2 font-semibold`}>
                                    Phòng: {equipment.room.name}
                                </p>
                                <p className={`mt-2 ${getStatusColor(equipment.status)}`}>
                                    Trạng thái: {equipment.status}
                                </p>
                            </div>
                            <div className="flex justify-center items-center space-x-2 mb-4">
                                <button
                                    className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                                    onClick={() => handleDeleteConfirmation(equipment.id)}
                                >
                                    Xóa
                                </button>
                                <button
                                    className="py-2 px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                                    onClick={() => handleEdit(equipment)}
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
