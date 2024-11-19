
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const EditEmployeeForm = ({ employee, updateEmployee, deleteEmployee, cancelEdit }) => {
    const [updatedEmployee, setUpdatedEmployee] = useState(employee);

    useEffect(() => {
        setUpdatedEmployee(employee);
    }, [employee]);

    const handleChange = (e) => {
        setUpdatedEmployee({
            ...updatedEmployee,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!/^\d{10}$/.test(updatedEmployee.phoneNumber)) {
            toast('Số điện thoại phải đủ 10 số .');
            return;
        }
    
        updateEmployee(updatedEmployee);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white max-w-4xl w-full shadow-lg rounded-lg px-8 py-6 mb-8 mt-2">
            <h2 className="flex text-2xl font-semibold mb-6 text-center">Edit Employee</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                    type="text"
                    name="name"
                    value={updatedEmployee.name || ''} 
                    onChange={handleChange}
                    placeholder=" Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                    type="text"
                    name="phoneNumber"
                    value={updatedEmployee.phoneNumber || ''} 
                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                    onChange={handleChange}
                    maxLength={10} // Giới hạn nhập 10 ký tự
                    placeholder="PhoneNumber"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />

                <input
                    type="text"
                    name="experience"
                    value={updatedEmployee.experience || ''} 
                    onChange={handleChange}
                    placeholder="Experience"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                    type="text"
                    name="description"
                    value={updatedEmployee.description || ''} 
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
            </div>
            <div className="flex flex-col justify-between items-center md:flex-row md:space-x-4">
                <div className="flex gap-4 w-full">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Update Employee
                    </button>
                    <button
                        type="button"
                        onClick={cancelEdit}
                        className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                    >
                        Cancel
                    </button>
                </div>
                
            </div>
        </form>
    );
};

export default EditEmployeeForm;
