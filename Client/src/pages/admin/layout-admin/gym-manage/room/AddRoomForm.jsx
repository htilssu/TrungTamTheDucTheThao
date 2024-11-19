import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {wGet, wPost} from '../../../../../utils/request.util';

const AddRoomTypes = ({ onAddField }) => {
    const [newRoom, setNewRoom] = useState({
        name: "",
        roomType: { id: null }, 
        capacity: "", 
        floor: "",
        building: ""
    });
    const [roomTypes, setRoomTypes] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        fetchRoomTypes();
    }, []);

    const fetchRoomTypes = async () => {
        try {
            const response = await wGet('/api/room-types');
            const data = await response.json()
            setRoomTypes(data);
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
        setError(""); 
        return true;
    };

    const handleAddField = async () => {
        if (validateFields()) {
            setIsLoading(true);
            try {
                console.log("Sending data: ", newRoom);  
                const response = await wPost('/api/rooms/add', newRoom);
                const data = response.json();
                console.log('Response: ', data);
                onAddField(data);
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
        setNewRoom({ ...newRoom, [name]: value }); 
    };

    const handleRoomTypeChange = (e) => {
        setNewRoom({ ...newRoom, roomType: { id: e.target.value } }); 
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-semibold mb-4">Thêm phòng tập</h3>
            <div className="mb-4">
                <label htmlFor="roomName" className="block mb-2 text-lg font-semibold text-gray-700">Tên phòng:</label>
                <input
                    ref={inputRef}
                    className="p-2 border rounded w-full mb-2"
                    type="text"
                    name="name"
                    id="roomName" // Thêm thuộc tính id
                    placeholder="Tên phòng tập"
                    value={newRoom.name}
                    onChange={handleInputChange}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="roomType" className="block mb-2 text-lg font-semibold text-gray-700">Chọn loại phòng:</label>
                <select
                    name="roomTypeId"
                    id="roomType" // Thêm thuộc tính id
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
                <label htmlFor="capacity" className="block mb-2 text-lg font-semibold text-gray-700">Sức chứa:</label>
                <input
                    id="capacity" // Thêm thuộc tính id
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
                <label htmlFor="floor" className="block mb-2 text-lg font-semibold text-gray-700">Tầng:</label>
                <input
                    id="floor" // Thêm thuộc tính id
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
                <label htmlFor="building" className="block mb-2 text-lg font-semibold text-gray-700">Tòa nhà:</label>
                <input
                    id="building" // Thêm thuộc tính id
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