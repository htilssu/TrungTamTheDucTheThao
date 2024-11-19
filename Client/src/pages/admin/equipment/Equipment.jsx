import { useState, useEffect } from 'react';
import { queryClient } from "../../../modules/cache.js";
import Modal from "./Modal.jsx";
import { wGet, wPost } from '../../../utils/request.util.js';
import PropTypes from 'prop-types';

const EquipmentForm = ({ onAddEquipment }) => {
    const [formData, setFormData] = useState({
        status: '',
        type: '',
        room: ''
    });
    const [equipmentTypes, setEquipmentTypes] = useState([]);
    const [image, setImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [room, setRoom] = useState([]);

    // Fetch equipment types
    useEffect(() => {
        const fetchEquipmentTypes = async () => {
            try {
                const response = await wGet('/api/equipment-types');
                console.log('Fetched Equipment Types:', response); // Log response
                setEquipmentTypes(response);
            } catch (error) {
                console.error('Error fetching equipment types:', error); // Log error
                setModalMessage("Không thể tải danh sách loại thiết bị.");
                setIsModalOpen(true);
            }
        };
        fetchEquipmentTypes();
    }, []);

    // Fetch rooms
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await wGet('/api/rooms');
                console.log('Fetched Rooms:', response); // Log response
                setRoom(response);
            } catch (error) {
                console.error('Error fetching rooms:', error); // Log error
                setModalMessage("Không thể tải danh sách phòng.");
                setIsModalOpen(true);
            }
        };
        fetchRoom();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jsonData = {
            equipmentType: { id: formData.type },
            status: formData.status,
            image: image || null,
            room: { id: formData.room },
        };

        try {
            const response = await wPost('/api/equipment', jsonData, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('Post response:', response); // Log response
            queryClient.invalidateQueries({ queryKey: ["equipments"] });
            onAddEquipment(response);

            // Reset form
            setFormData({ name: '', status: '', type: '', room: '' });
            setImage(null);
            setModalMessage("Thêm thiết bị thành công!");
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error submitting equipment data:', error); // Log error
            if (error.response) {
                const status = error.response.status;
                if (status === 400) {
                    setModalMessage("Thông tin gửi lên không hợp lệ. Vui lòng kiểm tra lại.");
                } else if (status === 404) {
                    setModalMessage("Không tìm thấy tài nguyên yêu cầu.");
                } else if (status === 500) {
                    setModalMessage("Có lỗi xảy ra ở phía server. Vui lòng thử lại sau.");
                } else {
                    setModalMessage("Có lỗi xảy ra. Vui lòng thử lại.");
                }
            } else if (error.request) {
                setModalMessage("Không nhận được phản hồi từ server. Vui lòng kiểm tra kết nối mạng.");
            } else {
                setModalMessage("Có lỗi xảy ra trong quá trình gửi yêu cầu. Vui lòng thử lại.");
            }
            setIsModalOpen(true);
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
                <form onSubmit={handleSubmit} className="space-y-6 text-black">
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
                        <label htmlFor="type" className="block text-gray-700">Loại thiết bị</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Chọn loại</option>
                            {equipmentTypes.map((equipmentType) => (
                                <option key={equipmentType.id} value={equipmentType.id}>
                                    {equipmentType.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="relative">
                        <label htmlFor="room" className="block text-gray-700">Thuộc phòng</label>
                        <select
                            id="room"
                            name="room"
                            value={formData.room}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Chọn phòng</option>
                            {room.map((roomItem) => (
                                <option key={roomItem.id} value={roomItem.id}>
                                    {roomItem.name}
                                </option>
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

                <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
            </div>
        </div>
    );
};

EquipmentForm.propTypes = {
    onAddEquipment: PropTypes.func.isRequired,
};

export default EquipmentForm;
