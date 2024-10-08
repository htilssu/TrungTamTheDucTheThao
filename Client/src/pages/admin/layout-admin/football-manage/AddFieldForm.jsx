import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import axios from "axios";

const AddFieldForm = ({ onAddField }) => {
    const [newField, setNewField] = useState({
        field_name: "",
        field_type: "5v5",
        priceSchedule: [{ start_time: "", end_time: "", rate: "" }],
        location: "",
        status: "active",
        description: "",
        images: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    // Xử lý thay đổi giá theo khung giờ
    const handlePriceScheduleChange = (index, field, value) => {
        const updatedPriceSchedule = [...newField.priceSchedule];
        updatedPriceSchedule[index][field] = value;
        setNewField({ ...newField, priceSchedule: updatedPriceSchedule });
    };

    // Thêm khung giờ mới
    const handleAddPriceSchedule = () => {
        setNewField({
            ...newField,
            priceSchedule: [...newField.priceSchedule, { start_time: "", end_time: "", rate: "" }],
        });
    };

    // Xử lý file ảnh khi tải lên nhiều ảnh
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setNewField({ ...newField, images: [...newField.images, ...files] });

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews([...imagePreviews, ...previews]);
    };

    // Xóa ảnh
    const handleImageRemove = (index) => {
        const updatedImages = [...newField.images];
        const updatedPreviews = [...imagePreviews];

        updatedImages.splice(index, 1);
        updatedPreviews.splice(index, 1);

        setNewField({ ...newField, images: updatedImages });
        setImagePreviews(updatedPreviews);
    };

    // Xử lý thêm sân mới
    const handleAddField = async () => {
        const fieldData = {
            field: {
                fieldName: newField.name,
                location: newField.location,
                fieldType: newField.type === "Sân 5 người" ? "5v5" : newField.type === "Sân 7 người" ? "7v7" : "11v11",
                status: newField.status === "Còn trống" ? "active" : "maintenance",
                description: newField.description,
                imageUrl: newField.images[0] // Giả định lấy URL của ảnh đầu tiên
            },
            prices: newField.priceSchedule.map((schedule) => ({
                startTime: schedule.from,
                endTime: schedule.to,
                rate: parseFloat(schedule.price) // Chuyển đổi giá thành số thực
            }))
        };

        try {
            const response = await axios.post("http://localhost:8080/v1/fields", fieldData);
            console.log("Field added successfully:", response.data);
            setNewField({
                name: "",
                type: "",
                priceSchedule: [{ from: "", to: "", price: "" }],
                location: "",
                status: "",
                description: "",
                images: [],
            });
            setImagePreviews([]); // Reset preview ảnh
        } catch (error) {
            console.error("Error adding field:", error);
        }
    };

    // Xử lý thay đổi giá trị input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewField({ ...newField, [name]: value });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-semibold mb-4">Thêm Sân Bóng Mới</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                    className="p-2 border rounded"
                    type="text"
                    placeholder="Tên sân"
                    name="field_name"
                    value={newField.field_name}
                    onChange={handleInputChange}
                />
                <select
                    className="p-2 border rounded"
                    name="field_type"
                    value={newField.field_type}
                    onChange={handleInputChange}
                >
                    <option value="5v5">Sân 5 người</option>
                    <option value="7v7">Sân 7 người</option>
                    <option value="11v11">Sân 11 người</option>
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
                    placeholder="Mô tả sân"
                    name="description"
                    value={newField.description}
                    onChange={handleInputChange}
                />
            </div>

            {/* Phần thêm giá theo khung giờ */}
            <h4 className="text-xl font-semibold mb-4">Giá theo khung giờ</h4>
            {newField.priceSchedule.map((schedule, index) => (
                <div className="grid grid-cols-3 gap-4 mb-2" key={index}>
                    <input
                        className="p-2 border rounded"
                        type="time"
                        placeholder="Từ"
                        value={schedule.start_time}
                        onChange={(e) =>
                            handlePriceScheduleChange(index, "start_time", e.target.value)
                        }
                    />
                    <input
                        className="p-2 border rounded"
                        type="time"
                        placeholder="Đến"
                        value={schedule.end_time}
                        onChange={(e) => handlePriceScheduleChange(index, "end_time", e.target.value)}
                    />
                    <input
                        className="p-2 border rounded"
                        type="number"
                        placeholder="Giá (VNĐ)"
                        value={schedule.rate}
                        onChange={(e) => handlePriceScheduleChange(index, "rate", e.target.value)}
                    />
                </div>
            ))}
            <button
                className="bg-gray-500 text-white py-1 px-2 rounded mb-4"
                onClick={handleAddPriceSchedule}
            >
                Thêm khung giờ
            </button>

            {/* Tải nhiều ảnh lên */}
            <div className="mb-4">
                <h4 className="text-xl font-semibold mb-2">Tải ảnh sân lên</h4>
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

            {/* Nút thêm sân */}
            <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={handleAddField}
            >
                Thêm Sân
            </button>
        </div>
    );
};

export default AddFieldForm;
