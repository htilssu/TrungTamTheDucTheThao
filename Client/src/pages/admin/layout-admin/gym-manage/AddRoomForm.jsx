import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const AddRoomForm = ({ onAddField }) => {
    const [newField, setNewField] = useState({
        name: "",
        type: "Gym",
        priceSchedule: [{ id: Date.now(), from: "", to: "", price: "" }],
        location: "",
        status: "Còn trống",
        description: "",
        images: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const handlePriceScheduleChange = (id, field, value) => {
        const updatedPriceSchedule = newField.priceSchedule.map((schedule) =>
            schedule.id === id ? { ...schedule, [field]: value } : schedule
        );
        setNewField({ ...newField, priceSchedule: updatedPriceSchedule });
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => {
            return {
                file: file,
                preview: URL.createObjectURL(file)
            };
        });

        setNewField({ ...newField, images: [...newField.images, ...previews.map(item => item.file)] });
        setImagePreviews([...imagePreviews, ...previews.map(item => item.preview)]);
    };

    const handleImageRemove = (index) => {
        URL.revokeObjectURL(imagePreviews[index]);
        const updatedImages = [...newField.images];
        const updatedPreviews = [...imagePreviews];

        updatedImages.splice(index, 1);
        updatedPreviews.splice(index, 1);

        setNewField({ ...newField, images: updatedImages });
        setImagePreviews(updatedPreviews);
    };

    const validateFields = () => {
        let isValid = true;
    
        const validateField = (field, toastId, message) => {
            if (!toast.isActive(toastId)) {
                toast.error(message, { toastId });
            }
            return false;
        };
    
        const validatePriceSchedule = (schedule, index) => {
            const { from, to, price } = schedule;
    
            if (!from || !to) {
                isValid = validateField(`time-error-${from}`, `time-error-${from}`, "Giờ mở và giờ đóng không được để trống");
            } else {
                const fromTime = new Date(`1970-01-01T${from}:00`);
                const toTime = new Date(`1970-01-01T${to}:00`);
    
                if (toTime <= fromTime) {
                    isValid = validateField(`time-range-error-${from}`, `time-range-error-${from}`, "Giờ đóng phải lớn hơn giờ mở ít nhất 1 tiếng");
                }
            }
    
            if (!price) {
                isValid = validateField(`price-error-${index}`, `price-error-${index}`, "Giá không được để trống");
            } else if (price < 0) {
                isValid = validateField(`negative-price-error-${index}`, `negative-price-error-${index}`, "Giá không được là số âm");
            }
        };
    
        if (!newField.name) {
            isValid = validateField("name-error", "name-error", "Tên phòng không được để trống");
        }
        if (!newField.location) {
            isValid = validateField("location-error", "location-error", "Địa chỉ không được để trống");
        }

        newField.priceSchedule.forEach(validatePriceSchedule);
    
        return isValid;
    };

    const handleAddField = () => {
        if (validateFields()) {
            onAddField(newField);
            setNewField({
                name: "",
                type: "Gym",
                priceSchedule: [{ id: Date.now(), from: "", to: "", price: "" }],
                location: "",
                status: "Còn trống",
                description: "",
                images: [],
            });
            setImagePreviews([]); 
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewField({ ...newField, [name]: value });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-semibold mb-4">Thêm phòng tập</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                    className="p-2 border rounded"
                    type="text"
                    placeholder="Tên phòng tập"
                    name="name"
                    value={newField.name}
                    onChange={handleInputChange}
                />
                
                <select
                    className="p-2 border rounded"
                    name="type"
                    value={newField.type}
                    onChange={handleInputChange}
                >
                    <option value="Gym">Gym</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Swim">Hồ bơi</option>
                </select>
                
                <input
                    className="p-2 border rounded"
                    type="text"
                    placeholder="Địa chỉ"
                    name="location"
                    value={newField.location}
                    onChange={handleInputChange}
                />
                
                <textarea
                    className="p-2 border rounded"
                    placeholder="Mô tả phòng"
                    name="description"
                    value={newField.description}
                    onChange={handleInputChange}
                />
            </div>

            <h4 className="text-xl font-semibold mb-4">Khung giờ mở cửa</h4>
            {newField.priceSchedule.map((schedule) => (
                <div className="grid grid-cols-3 gap-4 mb-2" key={schedule.id}>
                    <input
                        className="p-2 border rounded"
                        type="time"
                        placeholder="Từ"
                        value={schedule.from}
                        onChange={(e) =>
                            handlePriceScheduleChange(schedule.id, "from", e.target.value)
                        }
                    />
                    <input
                        className="p-2 border rounded"
                        type="time"
                        placeholder="Đến"
                        value={schedule.to}
                        onChange={(e) => handlePriceScheduleChange(schedule.id, "to", e.target.value)}
                    />
                </div>
            ))}

            <h4 className="text-xl font-semibold mb-4 mt-4">Giá phòng tập</h4>
            {newField.priceSchedule.map((schedule) => (
                <div className="grid grid-cols-3 gap-4 mb-2" key={schedule.id}>
                    <input
                        className="p-2 border rounded"
                        type="number"
                        placeholder="Giá (VNĐ)"
                        value={schedule.price}
                        onChange={(e) => handlePriceScheduleChange(schedule.id, "price", e.target.value)}
                    />
                </div>
            ))}

            <div className="mb-4">
                <h4 className="text-xl font-semibold mb-2">Tải hình ảnh</h4>
                <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="p-2 border rounded"
                />
                <div className="flex justify-center items-center mt-2">
                    {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-8 gap-4 bg-gray-100 p-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={`${preview}-${index}`} className="relative">
                                    <img src={preview} alt={`preview ${index}`} className="w-20 h-20 object-cover" />
                                    <TiDelete
                                        onClick={() => handleImageRemove(index)}
                                        className="absolute top-0 right-0 text-red-500 cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={handleAddField}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Thêm phòng
            </button>

            <ToastContainer />
        </div>
    );
};

export default AddRoomForm;
