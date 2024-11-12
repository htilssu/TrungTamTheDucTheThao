import React, { useState } from 'react';
import { TiEye, TiEdit } from "react-icons/ti";
import CustomerDetailOverlay from './CustomerDetailOverlay';
import EditCustomer from './EditCustomer';

const CustomerList = ({ customer, onEdit, deleteCustomer }) => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Hàm xem chi tiết khách hàng
    const handleView = (customerItem) => {
        setSelectedCustomer(customerItem);
    };

    // Hàm đóng overlay xem chi tiết và form chỉnh sửa
    const handleClose = () => {
        setSelectedCustomer(null);
        onEdit(null);
    };

    return (
        <div className="mt-1 p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">Danh sách Khách Hàng</h2>
            {customer.length === 0 ? (
                <p className="py-2 text-center text-gray-500">Danh sách Khách Hàng trống!</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-xl">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left border">ID</th>
                            <th className="py-2 px-4 text-left border">Avatar</th>
                            <th className="py-2 px-4 text-left border">Name</th>
                            <th className="py-2 px-4 text-left border">Email</th>
                            <th className="py-2 px-4 text-center border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(customer) && customer.map((customerItem) => (
                            <tr key={customerItem.id} className="border-b hover:bg-gray-50 transition duration-200">
                                <td className="py-2 px-4 border text-gray-600 font-semibold">{customerItem.id}</td>
                                <td className="py-2 px-4 border">
                                    <img
                                        src={customerItem.avatar}
                                        alt="Avatar"
                                        className="w-10 h-10 object-cover rounded-full border border-gray-300"
                                    />
                                </td>
                                <td className="py-2 px-4 border">  {customerItem.user.firstName ? `${customerItem.user.firstName} ${customerItem.user.lastName}` : customerItem.user.lastName}</td>
                                <td className="py-2 px-4 border">{customerItem.email}</td>
                                <td className="py-2 px-4 text-center border">
                                    <div className="flex justify-center items-center">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center justify-center mr-2"
                                            onClick={() => handleView(customerItem)}
                                        >
                                            <TiEye className="mr-1" size={18} />
                                            Xem
                                        </button>
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center justify-center"
                                            onClick={() => onEdit(customerItem)} // Gọi trực tiếp onEdit từ cha
                                        >
                                            <TiEdit className="mr-1" size={18} />
                                            Edit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            {selectedCustomer && (
                <CustomerDetailOverlay
                    customer={selectedCustomer}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default CustomerList;
