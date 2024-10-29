import { useState } from "react";
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const AddRoomTypes = ({ onAddField }) => {
    const [newRoomType, setNewRoomType] = useState({
        name: ""
    });

    const validateFields = () => {
        if (!newRoomType.name) {
            toast.error("Tên loại phòng không được để trống", { toastId: "name-error" });
            return false;
        }
        return true;
    };

    const handleAddField = () => {
        if (validateFields()) {
            onAddField(newRoomType);
            setNewRoomType({
                name: ""
            });
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
                    className="p-2 border rounded w-full"
                    type="text"
                    placeholder="Tên loại phòng"
                    name="name"
                    value={newRoomType.name}
                    onChange={handleInputChange}
                />
            </div>
            <button
                onClick={handleAddField}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Thêm loại phòng
            </button>
            <ToastContainer />
        </div>
    );
};

AddRoomTypes.propTypes = {
    onAddField: PropTypes.func.isRequired,
};

export default AddRoomTypes;
