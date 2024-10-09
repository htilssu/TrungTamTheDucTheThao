import { useState } from "react";
import {TiDelete} from "react-icons/ti";

const AddRoomForm = ({ onAddField }) => {
    const [newField, setNewField] = useState({
        name: "",
        type: "Sân 5 người",
        priceSchedule: [{ from: "", to: "", price: "" }],
        location: "",
        status: "Còn trống",
        description: "",
        images: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const handlePriceScheduleChange = (index, field, value) => {
        const updatedPriceSchedule = [...newField.priceSchedule];
        updatedPriceSchedule[index][field] = value;
        setNewField({ ...newField, priceSchedule: updatedPriceSchedule });
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));

        setNewField({ ...newField, images: [...newField.images, ...previews] });
        setImagePreviews([...imagePreviews, ...previews]);
    };

    const handleImageRemove = (index) => {
        const updatedImages = [...newField.images];
        const updatedPreviews = [...imagePreviews];

        updatedImages.splice(index, 1);
        updatedPreviews.splice(index, 1);

        setNewField({ ...newField, images: updatedImages });
        setImagePreviews(updatedPreviews);
    };

    const handleAddField = () => {
        onAddField(newField);
        setNewField({
            name: "",
            type: "Sân 5 người",
            priceSchedule: [{ from: "", to: "", price: "" }],
            location: "",
            status: "Còn trống",
            description: "",
            images: [],
        });
        setImagePreviews([]); 
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
                    <option value="Sân 5 người">Gym</option>
                    <option value="Sân 7 người">Yoga</option>
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
            {newField.priceSchedule.map((schedule, index) => (
                <div className="grid grid-cols-3 gap-4 mb-2" key={index}>
                    <input
                        className="p-2 border rounded"
                        type="time"
                        placeholder="Từ"
                        value={schedule.from}
                        onChange={(e) =>
                            handlePriceScheduleChange(index, "from", e.target.value)
                        }
                    />
                    <input
                        className="p-2 border rounded"
                        type="time"
                        placeholder="Đến"
                        value={schedule.to}
                        onChange={(e) => handlePriceScheduleChange(index, "to", e.target.value)}
                    />
                </div>
            ))}

            <h4 className="text-xl font-semibold mb-4 mt-4">Giá phòng tập</h4>
            {newField.priceSchedule.map((schedule, index) => (
                <div className="grid grid-cols-3 gap-4 mb-2" key={index}>
                    <input
                        className="p-2 border rounded"
                        type="number"
                        placeholder="Giá (VNĐ)"
                        value={schedule.price}
                        onChange={(e) => handlePriceScheduleChange(index, "price", e.target.value)}
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
                <div className={"flex justify-center items-center mt-2"}>
                    {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-8 gap-4 bg-gray-100 p-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        className="w-32 h-32 object-cover"
                                    />
                                    <button
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                        onClick={() => handleImageRemove(index)}
                                    >
                                        <TiDelete />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={handleAddField}
            >
                Thêm Phòng
            </button>
        </div>
    );
};

export default AddRoomForm;

