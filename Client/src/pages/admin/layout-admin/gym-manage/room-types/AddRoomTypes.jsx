 import {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {wPost} from '../../../../../utils/request.util';

const AddRoomTypes = ({ onAddField }) => {
    const [newRoomType, setNewRoomType] = useState({ name: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef(null);

    const validateFields = () => {
        if (!newRoomType.name) {
            setError("Tên loại phòng không được để trống");
            return false;
        }
        setError("");
        return true;
    };

    const handleAddField = async () => {
        if (validateFields()) {
            setIsLoading(true);
            try {
                console.log("Sending data: ", newRoomType);  
                const response = await wPost('/api/room-types/add', newRoomType);
                const data = await response.json();
                console.log('Response: ', data);
                onAddField(data);
                setNewRoomType({ name: "" });
                inputRef.current.blur();
            } catch (error) {
                console.error("Error: ", error);  
                if (error.response?.data?.message) {
                    toast.error(error.response.data.message, { toastId: "add-error" });
                } else {
                    toast.error("Đã xảy ra lỗi khi thêm loại phòng", { toastId: "add-error" });
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRoomType({ ...newRoomType, [name]: value });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-semibold mb-4">Thêm loại phòng</h3>
            <div className="mb-4">
                <input
                    ref={inputRef}
                    className="p-2 border rounded w-full"
                    type="text"
                    placeholder="Tên loại phòng"
                    name="name"
                    value={newRoomType.name}
                    onChange={handleInputChange}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <button
                onClick={handleAddField}
                className={`bg-blue-500 text-white p-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? "Đang thêm..." : "Thêm loại phòng"}
            </button>
            <ToastContainer />
        </div>
    );
};

AddRoomTypes.propTypes = {
    onAddField: PropTypes.func.isRequired,
};

export default AddRoomTypes;
