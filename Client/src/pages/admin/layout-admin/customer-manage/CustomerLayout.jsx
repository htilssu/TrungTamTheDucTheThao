import React, { useState, useEffect } from "react";
import CustomerList from "./CustomerList";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import axios from "axios";

const CustomerManage = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [customers, setCustomers] = useState([]);

       // Hàm lấy danh sách khách hàng từ API
       const fetchCustomers = async () => {
        try {
            const response = await axios.get("/api/accounts"); // endpoint lấy dữ liệu khách hàng
            setCustomers(response.data); // lưu dữ liệu vào state customers
        } catch (error) {
            console.error("Lỗi khi lấy danh sách khách hàng:", error);
        }
    };

    // Gọi fetchCustomers khi component được render lần đầu tiên
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Hàm thêm khách hàng mới
    const addCustomer = (newCustomer) => {
        setCustomers([...customers, newCustomer]);
        setIsAdding(false); // Đóng form thêm khách hàng sau khi thêm
    };

    // Hàm cập nhật thông tin khách hàng
    const updateCustomer = (updatedCustomer) => {
        setCustomers(customers.map((customer) =>
            customer.id === updatedCustomer.id ? updatedCustomer : customer
        ));
        setEditingCustomer(null); // Đóng form chỉnh sửa
    };

    // Hàm xóa khách hàng
    const deleteCustomer = (customerId) => {
        setCustomers(customers.filter((customer) => customer.id !== customerId));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-center text-primaryColor mb-2">Quản Lý Khách Hàng</h1>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 flex justify-end space-x-4 mt-6 ml-5"
                >
                    Thêm Khách Hàng
                </button>
            </div>

            {isAdding && (
                <AddCustomer
                    addCustomer={addCustomer}
                    cancelAdd={() => setIsAdding(false)}
                />
            )}

            {editingCustomer && (
                <EditCustomer
                    user={editingCustomer}
                    updateUser={updateCustomer}
                    cancelEdit={() => setEditingCustomer(null)}
                    deleteCustomer={deleteCustomer}
                />
            )}

            <CustomerList
                customer={customers}
                onEdit={setEditingCustomer}
                deleteCustomer={deleteCustomer}
            />
        </div>
    );
};

export default CustomerManage;
