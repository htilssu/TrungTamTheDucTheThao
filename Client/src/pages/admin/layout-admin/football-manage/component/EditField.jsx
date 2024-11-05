import {useState, useEffect} from "react";
import {TiDelete} from "react-icons/ti";
import axios from "axios";
import {queryClient} from "../../../../../modules/cache.js";
import {SyncLoader} from "react-spinners";

const EditFieldModal = ({field, onCancel}) => {
    const [updatedField, setUpdatedField] = useState({...field});
    const [newPriceSchedule, setNewPriceSchedule] = useState({from: "", to: "", price: ""});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Thêm trạng thái loading

    useEffect(() => {
        if (field) {
            setUpdatedField(field);
        }
    }, [field]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdatedField({...updatedField, [name]: value});
    };

    const handleAddPriceSchedule = () => {
        if (newPriceSchedule.from && newPriceSchedule.to && newPriceSchedule.price) {
            setUpdatedField((prev) => ({
                ...prev,
                priceSchedule: prev.priceSchedule ? [...prev.priceSchedule, newPriceSchedule] : [newPriceSchedule],
            }));
            setNewPriceSchedule({from: "", to: "", price: ""});
            setError(""); // Clear error nếu đã điền đúng
        } else {
            setError("Vui lòng điền đầy đủ thông tin khung giờ và giá.");
        }
    };

    const handleRemovePriceSchedule = (index) => {
        const updatedPriceSchedule = updatedField.priceSchedule.filter((_, i) => i !== index);
        setUpdatedField({...updatedField, priceSchedule: updatedPriceSchedule});
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUpdatedField((prev) => ({
                    ...prev,
                    images: prev.images ? [...prev.images, reader.result] : [reader.result],
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = updatedField.images.filter((_, i) => i !== index);
        setUpdatedField({...updatedField, images: updatedImages});
    };

    const handleUpdateField = async () => {
        setLoading(true);
        try {
            // Gửi yêu cầu PUT để cập nhật sân
            const response = await axios.put(`http://localhost:8080/v1/fields/${updatedField.fieldId}`, {
                fieldName: updatedField.fieldName,
                location: updatedField.location,
                fieldType: updatedField.fieldType,
                status: updatedField.status,
                description: updatedField.description,
                images: updatedField.images,
                priceSchedule: updatedField.priceSchedule,
            });

            const timeoutId = setTimeout(() => {
                onCancel();
                queryClient.invalidateQueries({queryKey: ['fields']});
                setLoading(false);
            }, 3000);

            return () => clearTimeout(timeoutId);
        } catch (error) {
            setLoading(false);
            console.error("Error updating field:", error);
            setError("Failed to update field. Please try again.");
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-gray-800 bg-opacity-70 transition-opacity duration-300">
            <div
                className="bg-white rounded-lg p-8 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
                <h3 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
                    Chỉnh Sửa Sân: {field.fieldName}
                </h3>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Tên sân */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Tên Sân:</label>
                    <input
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-indigo-300 transition duration-200"
                        type="text"
                        name="fieldName"
                        value={updatedField.fieldName || ""}
                        onChange={handleInputChange}
                        placeholder="Nhập tên sân"
                    />
                </div>

                {/* Địa chỉ */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Địa chỉ:</label>
                    <input
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-indigo-300 transition duration-200"
                        type="text"
                        name="location"
                        value={updatedField.location || ""}
                        onChange={handleInputChange}
                        placeholder="Nhập địa chỉ"
                    />
                </div>

                {/* Loại sân */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Loại sân:</label>
                    <select
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-indigo-300 transition duration-200"
                        name="fieldType"
                        value={updatedField.fieldType || ""}
                        onChange={handleInputChange}
                    >
                        <option value="5v5">Sân 5 người</option>
                        <option value="7v7">Sân 7 người</option>
                        <option value="11v11">Sân 11 người</option>
                    </select>

                    {/* Thiết lập giá trị cho biến value */}
                    <div className="mt-2 text-gray-600">
                        Giá trị hiện
                        tại: {updatedField.fieldType === '5v5' ? 'Sân 5 người' : updatedField.fieldType === '7v7' ? 'Sân 7 người' : updatedField.fieldType === '11v11' ? 'Sân 11 người' : ''}
                    </div>
                </div>


                {/* Trạng thái */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Tình trạng:</label>
                    <select
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-indigo-300 transition duration-200"
                        name="status"
                        value={updatedField.status || ""}
                        onChange={handleInputChange}
                    >
                        <option value="active">Đang hoạt động</option>
                        <option value="maintenance">Đang sửa chữa</option>
                    </select>
                </div>

                {/* Giá theo khung giờ */}
                <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-4 text-gray-800">Giá theo khung giờ</h4>
                    {updatedField.priceSchedule?.map((schedule, index) => (
                        <div key={index}
                             className="flex items-center justify-between mb-2 p-2 bg-gray-100 rounded-lg shadow-sm">
                            <p className="text-gray-700">
                                {schedule.from} - {schedule.to}: {schedule.price} VND
                            </p>
                            <button
                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                                onClick={() => handleRemovePriceSchedule(index)}
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                    <div className="flex space-x-4">
                        <input
                            className="p-2 border border-gray-300 rounded-lg w-1/3 focus:ring focus:ring-indigo-300"
                            type="time"
                            name="from"
                            value={newPriceSchedule.from}
                            onChange={(e) => setNewPriceSchedule({...newPriceSchedule, from: e.target.value})}
                        />
                        <input
                            className="p-2 border border-gray-300 rounded-lg w-1/3 focus:ring focus:ring-indigo-300"
                            type="time"
                            name="to"
                            value={newPriceSchedule.to}
                            onChange={(e) => setNewPriceSchedule({...newPriceSchedule, to: e.target.value})}
                        />
                        <input
                            className="p-2 border border-gray-300 rounded-lg w-1/3 focus:ring focus:ring-indigo-300"
                            type="number"
                            name="price"
                            value={newPriceSchedule.price}
                            onChange={(e) => setNewPriceSchedule({...newPriceSchedule, price: e.target.value})}
                            placeholder="Giá (VND)"
                        />
                    </div>
                    <button
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                        onClick={handleAddPriceSchedule}
                    >
                        Thêm khung giờ
                    </button>
                </div>

                {/* Hình ảnh */}
                <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-4 text-gray-800">Hình ảnh sân</h4>
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        className="p-2 border border-gray-300 rounded-lg w-full mb-4 focus:ring focus:ring-indigo-300"
                    />
                    <div className="grid grid-cols-4 gap-4">
                        {updatedField.images?.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={image}
                                    alt={`Hình ảnh ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg shadow-md"
                                />
                                <button
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-200"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <TiDelete/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    {loading ?
                        <div className={"flex justify-center items-center mb-6"}>
                            <SyncLoader
                                color="#00ff72"
                                margin={5}
                                size={15}
                                speedMultiplier={1}
                            />
                        </div>
                        : <div className="flex justify-end items-center space-x-4 mt-6">
                            <button
                                className="bg-gray-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-600 transition duration-200 transform hover:scale-105"
                                onClick={onCancel}
                            >
                                Hủy
                            </button>

                            <button
                                className={`bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-200 transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleUpdateField}
                                disabled={loading}
                            >
                                Cập nhật
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default EditFieldModal;
