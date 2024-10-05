import {useState} from "react";
import {TiDelete} from "react-icons/ti";

const EditFieldModal = ({field, onCancel, onUpdate}) => {
    const [updatedField, setUpdatedField] = useState(field);
    const [newPriceSchedule, setNewPriceSchedule] = useState({from: "", to: "", price: ""});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdatedField({...updatedField, [name]: value});
    };

    // Thêm khung giờ và giá
    const handleAddPriceSchedule = () => {
        if (newPriceSchedule.from && newPriceSchedule.to && newPriceSchedule.price) {
            setUpdatedField({
                ...updatedField,
                priceSchedule: [...updatedField.priceSchedule, newPriceSchedule],
            });
            setNewPriceSchedule({from: "", to: "", price: ""});
        }
    };

    // Xóa khung giờ và giá
    const handleRemovePriceSchedule = (index) => {
        const updatedPriceSchedule = updatedField.priceSchedule.filter((_, i) => i !== index);
        setUpdatedField({...updatedField, priceSchedule: updatedPriceSchedule});
    };

    // Thêm hình ảnh
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUpdatedField({...updatedField, images: [...updatedField.images, reader.result]});
            };
            reader.readAsDataURL(file);
        }
    };

    // Xóa hình ảnh
    const handleRemoveImage = (index) => {
        const updatedImages = updatedField.images.filter((_, i) => i !== index);
        setUpdatedField({...updatedField, images: updatedImages});
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-gray-800 bg-opacity-70 transition-opacity duration-300">
            <div
                className="bg-white rounded-lg p-8 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
                <h3 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Chỉnh Sửa Sân: {field.name}</h3>

                {/* Tên sân */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2 w-1/3">Tên Sân:</label>
                    <input
                        className="p-3 border border-gray-300 rounded-lg w-2/3 focus:ring focus:ring-indigo-300 transition duration-200"
                        type="text"
                        name="name"
                        value={updatedField.name}
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
                        value={updatedField.location}
                        onChange={handleInputChange}
                        placeholder="Nhập địa chỉ"
                    />
                </div>

                {/* Loại sân */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Loại sân:</label>
                    <select
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-indigo-300 transition duration-200"
                        name="type"
                        value={updatedField.type}
                        onChange={handleInputChange}
                    >
                        <option value="Sân 5 người">Sân 5 người</option>
                        <option value="Sân 7 người">Sân 7 người</option>
                        <option value="Sân 11 người">Sân 11 người</option>
                    </select>
                </div>

                {/* Trạng thái */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Tình trạng:</label>
                    <select
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-indigo-300 transition duration-200"
                        name="status"
                        value={updatedField.status}
                        onChange={handleInputChange}
                    >
                        <option value="Còn trống">Còn trống</option>
                        <option value="Đã đặt">Đã đặt</option>
                    </select>
                </div>

                {/* Giá theo khung giờ */}
                <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-4 text-gray-800">Giá theo khung giờ</h4>
                    {updatedField.priceSchedule.map((schedule, index) => (
                        <div key={index}
                             className="flex items-center justify-between mb-2 p-2 bg-gray-100 rounded-lg shadow-sm">
                            <p className="text-gray-700">{schedule.from} - {schedule.to}: {schedule.price} VND</p>
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
                            onChange={(e) =>
                                setNewPriceSchedule({...newPriceSchedule, from: e.target.value})
                            }
                            placeholder="Từ"
                        />
                        <input
                            className="p-2 border border-gray-300 rounded-lg w-1/3 focus:ring focus:ring-indigo-300"
                            type="time"
                            name="to"
                            value={newPriceSchedule.to}
                            onChange={(e) =>
                                setNewPriceSchedule({...newPriceSchedule, to: e.target.value})
                            }
                            placeholder="Đến"
                        />
                        <input
                            className="p-2 border border-gray-300 rounded-lg w-1/3 focus:ring focus:ring-indigo-300"
                            type="number"
                            name="price"
                            value={newPriceSchedule.price}
                            onChange={(e) =>
                                setNewPriceSchedule({...newPriceSchedule, price: e.target.value})
                            }
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
                        {updatedField.images.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={image}
                                    alt={`Hình ${index}`}
                                    className="w-32 h-32 object-cover rounded-lg shadow-md"
                                />
                                <button
                                    className="absolute top-1 right-1 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <TiDelete size={20}/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nút Cập nhật và Hủy */}
                <div className="flex justify-end mt-6">
                    <button
                        className="bg-green-500 text-white py-2 px-6 rounded-lg mr-2 hover:bg-green-600 transition duration-200"
                        onClick={() => onUpdate(updatedField)}
                    >
                        Cập nhật
                    </button>
                    <button
                        className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200"
                        onClick={onCancel}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditFieldModal;
