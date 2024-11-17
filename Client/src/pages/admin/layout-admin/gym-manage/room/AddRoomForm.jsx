import { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { wPost, wGet } from "../../../../../utils/request.util";

const AddRoomTypes = ({ onAddField }) => {
    const [newRoom, setNewRoom] = useState({
        name: "",
        roomType: { id: null }, 
        capacity: "", 
        floor: "",
        building: ""
    });
    const [roomTypes, setRoomTypes] = useState([]); // Danh sách loại phòng tập
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        fetchRoomTypes(); // Lấy danh sách loại phòng tập khi component được mount
    }, []);

    const fetchRoomTypes = async () => {
        try {
            const response = await wGet('/api/room-types'); // Gọi API để lấy loại phòng
            setRoomTypes(response);
        } catch (error) {
            console.error('Error fetching room types:', error);
        }
    };

    const validateFields = () => {
        if (!newRoom.name) {
            setError("Tên phòng không được để trống");
            return false;
        }
        if (newRoom.roomType.id === null) {
            setError("Bạn cần chọn loại phòng");
            return false;
        }
        setError(""); // Reset lỗi nếu tất cả đều hợp lệ
        return true;
    };

    const handleAddField = async () => {
        if (validateFields()) {
            setIsLoading(true);
            try {
                console.log("Sending data: ", newRoom);  
                const response = await wPost('/api/rooms/add', newRoom); // Gửi yêu cầu thêm phòng
                console.log("Response: ", response);  
                onAddField(response); // Truyền dữ liệu về component cha
                // Reset form
                setNewRoom({ name: "", roomType: { id: null }, capacity: "", floor: "", building: "" });
                inputRef.current.blur();
                toast.success("Thêm phòng thành công", { toastId: "add-success" });
            } catch (error) {
                console.error("Error: ", error);  
                if (error.response?.data?.message) {
                    toast.error(error.response.data.message, { toastId: "add-error" });
                } else {
                    toast.error("Đã xảy ra lỗi khi thêm phòng", { toastId: "add-error" });
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRoom({ ...newRoom, [name]: value }); // Cập nhật giá trị tương ứng
    };

    const handleRoomTypeChange = (e) => {
        setNewRoom({ ...newRoom, roomType: { id: e.target.value } }); // Cập nhật đối tượng roomType với ID
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-semibold mb-4">Thêm phòng tập</h3>
            <div className="mb-4">
                <input
                    ref={inputRef}
                    className="p-2 border rounded w-full mb-2"
                    type="text"
                    name="name"
                    placeholder="Tên phòng tập"
                    value={newRoom.name}
                    onChange={handleInputChange}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Chọn loại phòng:</label>
                <select
                    name="roomTypeId"
                    className="p-2 border rounded w-full"
                    value={newRoom.roomType.id || ""}
                    onChange={handleRoomTypeChange}
                >
                    <option value="" disabled>Chọn loại phòng</option>
                    {roomTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <input
                    className="p-2 border rounded w-full"
                    type="number"
                    name="capacity"
                    placeholder="Sức chứa"
                    min={0}
                    value={newRoom.capacity || ""}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-4">
                <input
                    className="p-2 border rounded w-full"
                    type="number"
                    name="floor"
                    placeholder="Tầng"
                    min={0}
                    value={newRoom.floor || ""}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-4">
                <input
                    className="p-2 border rounded w-full"
                    type="text"
                    name="building"
                    placeholder="Tòa nhà"
                    value={newRoom.building}
                    onChange={handleInputChange}
                />
            </div>

            <button
                onClick={handleAddField}
                className={`bg-blue-500 text-white p-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? "Đang thêm..." : "Thêm phòng"}
            </button>
            <ToastContainer />
        </div>
    );
};

AddRoomTypes.propTypes = {
    onAddField: PropTypes.func.isRequired,
};

export default AddRoomTypes;