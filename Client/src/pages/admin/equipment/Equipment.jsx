import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";

const EquipmentForm = () => {
    const [formData, setFormData] = useState({
        type: '',
        status: ''
    });
    const [equipments, setEquipments] = useState([]);
    const [equipmentTypes, setEquipmentTypes] = useState([]);
    const [image, setImage] = useState(null); // Change to hold a single image
    const [editingMode, setEditingMode] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchEquipments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/equipment');
                console.log("Fetched equipments:", response.data);
                if (Array.isArray(response.data)) {
                    setEquipments(response.data);
                } else {
                    console.error("Dữ liệu không phải là mảng:", response.data);
                    toast.error("Có lỗi xảy ra khi tải danh sách thiết bị.");
                }
            } catch (error) {
                    console.error("Error fetching equipments:", error);
                toast.error("Không thể tải danh sách thiết bị.");
            }
        };

        const fetchEquipmentTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/equipment-types');
                console.log(response.data);
                setEquipmentTypes(response.data);
            } catch (error) {
                console.error("Error fetching equipment types:", error);
                toast.error("Không thể tải danh sách loại thiết bị.");
            }
        };

        fetchEquipments();
        fetchEquipmentTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Tạo đối tượng JSON để gửi
        const jsonData = {
            equipmentType: {
                id: formData.type, // Lấy id từ formData.type
            },
            status: formData.status,
            image: image || null, // Đặt image thành null nếu không có ảnh
        };

        try {
            const response = await axios.post('http://localhost:8080/api/equipment', jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Cập nhật danh sách thiết bị sau khi thêm thành công
            setEquipments((prevEquipments) => [...prevEquipments, response.data]);
            setFormData({ type: '', status: '' });
            setImage(null);
            toast.success("Thêm thiết bị thành công!");
            navigate('/admin/equipmentList')

        } catch (error) {
            console.error("Error creating equipment:", error);
            toast.error("Có lỗi xảy ra khi thêm thiết bị.");
        }
    };



    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Only take the first image
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result); // Set the image as a data URL
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-[800px] mx-auto p-4 bg-white mb-5 shadow-2xl rounded-md mt-8">
            <div className="mb-8 w-full p-4 bg-white border-[1px] text-black rounded-md">
                <h2 className="text-2xl font-semibold mb-4 flex justify-center">Thêm Trang Thiết Bị</h2>
                <form onSubmit={handleSubmit} className="space-y-6 text-black border-bottom-[1px]">
                    <div className="mb-6 mt-3">
                        {image ? (
                            <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                                <img src={image} alt="Equipment" className="object-contain h-full" />
                            </div>
                        ) : (
                            <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                                <img src="/no-image.png" alt="No Image" className="object-contain h-full" />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="upload"
                        />
                        <button
                            type="button"
                            onClick={() => document.getElementById("upload").click()}
                            className="py-2 px-4 flex justify-center bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                        >
                            Thêm ảnh
                        </button>
                    </div>

                    <div className="relative">
                        <label htmlFor="type" className="block text-gray-700">Loại trang thiết bị</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Chọn loại</option>
                            {equipmentTypes.map(equipmentType => (
                                <option key={equipmentType.id} value={equipmentType.id}>{equipmentType.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative">
                        <label htmlFor="status" className="block text-gray-700">Trạng thái</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Chọn trạng thái</option>
                            <option value="Hoạt động">Hoạt động</option>
                            <option value="Hư Hỏng">Hư Hỏng</option>
                            <option value="Bảo trì">Bảo trì</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
                    >
                        Thêm thiết bị
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EquipmentForm;
