import React, { useState } from 'react';

const EquipmentList = () => {
    // Dữ liệu giả cho thiết bị
    const [equipments, setEquipments] = useState([
        {
            type: 'Máy chạy bộ',
            status: 'Hoạt động',
            images: ['/images/treadmill.jpg'], // Đường dẫn đến hình ảnh của máy chạy bộ
        },
        {
            type: 'Tạ đòn',
            status: 'Bảo trì',
            images: ['/images/barbell.jpg'], // Đường dẫn đến hình ảnh của tạ đòn
        },
        {
            type: 'Máy đạp xe',
            status: 'Hư Hỏng',
            images: ['/gym2.png'], // Đường dẫn đến hình ảnh của máy đạp xe
        },
        {
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },
        {
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },
        {
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },{
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },{
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },
        {
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },{
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },{
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },{
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },{
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },{
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },{
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },{
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },{
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },{
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },{
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },{
            type: 'Thảm yoga',
            status: 'Hoạt động',
            images: [], // Không có hình ảnh
        },
















    ]);

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

    const handleDelete = (index) => {
        setEquipments((prevEquipments) =>
            prevEquipments.filter((_, i) => i !== index)
        );
    };

    const handleEdit = (index) => {
        //viet ham sua vao day
        alert(`Chỉnh sửa thiết bị: ${equipments[index].type}`);
    };

    return (
        <div className="max-w-[1200px] mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Danh Sách Trang Thiết Bị</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {equipments.length > 0 ? (
                    equipments.map((equipment, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="h-40 flex justify-center items-center">
                                {equipment.images.length > 0 ? (
                                    <img
                                        src={equipment.images[0]} // Lấy hình ảnh đầu tiên
                                        alt={equipment.type}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src="/no-image.png"
                                        alt="No Image"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{equipment.type}</h3>
                                <p className={`mt-2 ${getStatusColor(equipment.status)}`}>
                                    Trạng thái: {equipment.status}
                                </p>
                            </div>
                            <div className="flex justify-center items-center space-x-2 mb-4">
                                <button
                                    className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                                    onClick={() => handleDelete(index)}
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
