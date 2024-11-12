import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {wGet} from "../../../utils/request.util.js";
import {queryClient} from "../../../modules/cache.js";
import {toast} from "react-toastify";
import Modal from "./Modal.jsx";


const EquipmentForm = ({ onAddEquipment }) => {
    const [formData, setFormData] = useState({
        type: '',
        status: ''
    });
    const [equipmentTypes, setEquipmentTypes] = useState([]);
    const [image, setImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [modalMessage, setModalMessage] = useState(""); // Message to show in modal
    useEffect(() => {
        const fetchEquipmentTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/equipment-types');
                setEquipmentTypes(response.data);
            } catch (error) {
                setModalMessage("Không thể tải danh sách loại thiết bị.");
                setIsModalOpen(true);
            }
        };

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

        const jsonData = {
            equipmentType: { id: formData.type },
            status: formData.status,
            image: image || null,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/equipment', jsonData, {
                headers: { 'Content-Type': 'application/json' },
            });

            queryClient.invalidateQueries({queryKey:["equipments"]});

            // After successfully adding, update the equipment list
            onAddEquipment(response.data);

            setFormData({ type: '', status: '' });
            setImage(null);
            setModalMessage("Thêm thiết bị thành công!"); // Set success message
            setIsModalOpen(true); // Show modal
        } catch (error) {
            setModalMessage("Có lỗi xảy ra khi thêm thiết bị."); // Set error message
            setIsModalOpen(true); // Show modal
        }
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const closeModal = () => {
        setIsModalOpen(false);
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
                {/* Modal component */}
                <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
            </div>
        </div>
    );
};

export default EquipmentForm;
