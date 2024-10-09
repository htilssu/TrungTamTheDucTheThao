import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const EditRoom = ({ field, onCancel, onUpdate }) => {
    const [updatedField, setUpdatedField] = useState(field);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedField({ ...updatedField, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUpdatedField({ ...updatedField, images: [...updatedField.images, reader.result] });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = updatedField.images.filter((_, i) => i !== index);
        setUpdatedField({ ...updatedField, images: updatedImages });
    };

    // Hàm kiểm tra tính hợp lệ
    const validateFields = () => {
        let isValid = true;

        if (!updatedField.name) {
            if (!toast.isActive("name-error")) {
                toast.error("Tên phòng không được để trống.", { toastId: "name-error" });
            }
            isValid = false;
        }
        if (!updatedField.location) {
            if (!toast.isActive("location-error")) {
                toast.error("Địa chỉ không được để trống.", { toastId: "location-error" });
            }
            isValid = false;
        }

        updatedField.priceSchedule.forEach((schedule, index) => {
            if (!schedule.from || !schedule.to) {
                if (!toast.isActive(`time-error-${schedule.from}`)) {
                    toast.error(`Giờ mở và giờ đóng không được để trống`, { toastId: `time-error-${schedule.from}` });
                }
                isValid = false;
            } else {
                const fromTime = new Date(`1970-01-01T${schedule.from}:00`);
                const toTime = new Date(`1970-01-01T${schedule.to}:00`);

                if (toTime <= fromTime) {
                    if (!toast.isActive(`time-range-error-${schedule.from}`)) {
                        toast.error(`Giờ đóng phải lớn hơn giờ mở ít nhất 1 tiếng`, { toastId: `time-range-error-${schedule.from}` });
                    }
                    isValid = false;
                }
            }

            if (!schedule.price) {
                if (!toast.isActive(`price-error-${index}`)) {
                    toast.error(`Giá không được để trống`, { toastId: `price-error-${index}` });
                }
                isValid = false;
            } else if (schedule.price < 0) {
                if (!toast.isActive(`negative-price-error-${index}`)) {
                    toast.error(`Giá không được là số âm`, { toastId: `negative-price-error-${index}` });
                }
                isValid = false;
            }
        });

        return isValid;
    };

    const handleUpdate = () => {
        if (validateFields()) {
            console.log("Updating room with data:", updatedField);
            onUpdate(updatedField); // Gọi hàm onUpdate với dữ liệu đã chỉnh sửa
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-gray-800 bg-opacity-70 transition-opacity duration-300">
            <div className="bg-white rounded-lg p-8 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
                <h3 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Chỉnh Sửa Phòng: {field.name}</h3>

                {/* Tên phòng */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2 w-1/3">Tên Phòng:</label>
                    <input
                        className="p-3 border border-gray-300 rounded-lg w-2/3 focus:ring focus:ring-indigo-300 transition duration-200"
                        type="text"
                        name="name"
                        value={updatedField.name}
                        onChange={handleInputChange}
                        placeholder="Nhập tên phòng"
                    />
                </div>

                {/* Địa chỉ */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Địa chỉ:</label>
                    <input
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-indigo-300 transition duration-200"
                        type="text"
                        name="location"
                        value={updatedField.location}
                        onChange={handleInputChange}
                        placeholder="Nhập địa chỉ"
                    />
                </div>

                {/* Mô tả */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Mô tả:</label>
                    <textarea
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-indigo-300 transition duration-200"
                        name="description"
                        value={updatedField.description}
                        onChange={handleInputChange}
                        placeholder="Nhập mô tả"
                    />
                </div>

                {/* Giá phòng */}
                <h4 className="text-xl font-semibold mb-4">Giá phòng</h4>
                {updatedField.priceSchedule.map((schedule, index) => (
                    <div key={index} className="mb-2 flex justify-between items-center">
                        <input
                            className="p-2 border rounded w-1/4"
                            type="time"
                            value={schedule.from}
                            onChange={(e) => {
                                const updatedSchedule = [...updatedField.priceSchedule];
                                updatedSchedule[index].from = e.target.value;
                                setUpdatedField({ ...updatedField, priceSchedule: updatedSchedule });
                            }}
                        />
                        <input
                            className="p-2 border rounded w-1/4"
                            type="time"
                            value={schedule.to}
                            onChange={(e) => {
                                const updatedSchedule = [...updatedField.priceSchedule];
                                updatedSchedule[index].to = e.target.value;
                                setUpdatedField({ ...updatedField, priceSchedule: updatedSchedule });
                            }}
                        />
                        <input
                            className="p-2 border rounded w-1/4"
                            type="number"
                            placeholder="Giá (VNĐ)"
                            value={schedule.price}
                            onChange={(e) => {
                                const updatedSchedule = [...updatedField.priceSchedule];
                                updatedSchedule[index].price = e.target.value;
                                setUpdatedField({ ...updatedField, priceSchedule: updatedSchedule });
                            }}
                        />
                    </div>
                ))}

                {/* Tải lên hình ảnh */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Tải lên hình ảnh:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>

                {/* Hiển thị hình ảnh đã tải lên */}
                <div className="mb-4">
                    <h4 className="text-lg font-semibold">Hình ảnh đã tải lên:</h4>
                    <div className="flex flex-wrap">
                        {updatedField.images.map((image, index) => (
                            <div key={index} className="relative mr-2 mb-2">
                                <img src={image} alt={`Room ${index}`} className="h-20 w-20 object-cover rounded" />
                                <button
                                    className="absolute top-0 right-0 text-red-600 hover:text-red-800"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <TiDelete />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                        onClick={onCancel}
                    >
                        Hủy
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={handleUpdate}
                    >
                        Cập Nhật
                    </button>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default EditRoom;
