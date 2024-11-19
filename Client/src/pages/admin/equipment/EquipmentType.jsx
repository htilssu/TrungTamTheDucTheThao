import React, { useState, useEffect } from 'react';
import { wDelete, wGet, wPost, wPut } from "../../../utils/request.util.js";
import EditCategoryForm from "./EditEquipmentType.jsx";
import {toast} from "react-toastify";


const CategoryForm = () => {
    const [formData, setFormData] = useState({ name: '', amount: '' });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);

    // Fetch list of categories
    const getCategories = async () => {
        try {
            const response = await wGet('/api/equipment-types');

            const data = await response.json()
            setCategories(data);
        } catch (err) {
            console.error(err);
            setError('Đã xảy ra lỗi khi lấy danh sách thể loại thiết bị.');
        }
    };

    useEffect(() => {
        getCategories(); // Initial data fetch
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission (Create new category)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.amount) {
            setError('Tên thể loại và số lượng không được để trống.');
            return;
        }

        try {
            const response = await wPost('/api/equipment-types',

                {
                name: formData.name,
                amount: parseInt(formData.amount, 10),
            })
            const data = await response.json();

            // Update the category list with the newly created category
            setCategories(prevCategories => [...prevCategories, data]);

            // Reset form data after submission
            setFormData({ name: '', amount: '' });
            toast.success('Thêm thể loại thành công!');
        } catch (err) {
            console.error(err);
            setError('Đã xảy ra lỗi khi tạo thể loại thiết bị.');
            toast.error('Đã xảy ra lỗi khi tạo thể loại thiết bị.');
        }
    };

    // Handle edit action
    const handleEdit = (category) => {
        setEditingCategory(category);
    };

    // Handle delete action
    const handleDelete = async (id) => {
        try {
            await wDelete(`/api/equipment-types/${id}`);
            setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
            toast.success('Xóa thể loại thành công!');
        } catch (err) {
            console.error(err);
            setError('Đã xảy ra lỗi khi xóa thể loại thiết bị.');
            toast.error('Đã xảy ra lỗi khi xóa thể loại thiết bị.');
        }
    };

    // Handle update action after editing
    // Handle update action after editing
    const handleUpdate = async (updatedCategory) => {
        try {
            await wPut(`/api/equipment-types/${updatedCategory.id}`, {
                name: updatedCategory.name,
                amount: updatedCategory.amount
            });
            getCategories();
            setEditingCategory(null);
            setEditingCategory(null);
            toast.success('Cập nhật thể loại thành công!');
        } catch (error) {
            console.error('Lỗi cập nhật:', error);
            toast.error('Cập nhật thất bại');
        }
    };

    // Handle cancel edit
    const handleCancel = () => {
        setEditingCategory(null);
    };

    return (
        <div className="flex justify-center items-start space-x-6 p-4 mt-32">
            {/* Form to create new category */}
            <div className="max-w-md w-full p-4 bg-white shadow-md rounded-md">
                {editingCategory ? (
                    <EditCategoryForm
                        category={editingCategory}
                        onCancel={handleCancel}
                        onUpdate={handleUpdate}
                    />
                ) : (
                    <div>
                        <h2 className="flex justify-center font-bold text-2xl mb-5">
                            Đăng Ký Thể Loại Trang Thiết Bị
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && <p className="text-red-500">{error}</p>}
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="peer placeholder-transparent w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                                    placeholder="Tên Thể Loại Thiết Bị"
                                    required
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute -top-3 left-3 bg-white px-1 text-gray-500 transition-all duration-300 transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500"
                                >
                                    Tên Thể Loại Thiết Bị
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="peer placeholder-transparent w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                                    placeholder="Số Lượng"
                                    required
                                    min="1"
                                />
                                <label
                                    htmlFor="amount"
                                    className="absolute -top-3 left-3 bg-white px-1 text-gray-500 transition-all duration-300 transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500"
                                >
                                    Số Lượng
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Đăng Ký
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* List of categories */}
            <div className="max-w-md w-full p-4 bg-white border-[1px] text-black rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Danh Sách Thể Loại</h2>
                {categories.length > 0 ? (
                    <ul className="space-y-2">
                        {categories.map((category) => (
                            <li key={category.id} className="p-2 bg-gray-100 rounded-md shadow-sm">
                                <strong>Tên loại thiết bị :</strong> {category.name} <br />
                                <strong>Số Lượng thiết bị :</strong> {category.amount}
                                <div className="mt-2 flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Chưa có thể loại thiết bị nào.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryForm;