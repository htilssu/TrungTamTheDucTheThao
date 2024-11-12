import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        amount: ''
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [editingCategory, setEditingCategory] = useState(null); // To track which category is being edited

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error

        try {
            if (editingCategory) {
                // If editing, send PUT request to update the category
                const response = await axios.put(`http://localhost:8080/api/equipment-types/${editingCategory.id}`, {
                    name: formData.name,
                    amount: parseInt(formData.amount, 10),
                });

                // Update the category in the list
                setCategories((prevCategories) => prevCategories.map((category) =>
                    category.id === editingCategory.id ? response.data : category
                ));
                setEditingCategory(null); // Reset editing state
            } else {
                // If creating new category, send POST request
                const response = await axios.post('http://localhost:8080/api/equipment-types', {
                    name: formData.name,
                    amount: parseInt(formData.amount, 10),
                });

                // Add the new category to the list
                setCategories((prevCategories) => [...prevCategories, response.data]);
            }

            // Reset form data after submission
            setFormData({
                name: '',
                amount: ''
            });
        } catch (err) {
            console.error(err);
            setError('Đã xảy ra lỗi khi tạo/sửa thể loại thiết bị.');
        }
    };

    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/equipment-types');
            setCategories(response.data);
        } catch (err) {
            console.error(err);
            setError('Đã xảy ra lỗi khi lấy danh sách thể loại thiết bị.');
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            amount: category.amount
        });
    };

    const handleDelete = async (id) => {
        try {
            // Call API to delete category
            await axios.delete(`http://localhost:8080/api/equipment-types/${id}`);
            // Remove category from the list
            setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
        } catch (err) {
            console.error(err);
            setError('Đã xảy ra lỗi khi xóa thể loại thiết bị.');
        }
    };

    const handleCancel = () => {
        // Reset form to initial state and stop editing
        setEditingCategory(null);
        setFormData({
            name: '',
            amount: ''
        });
    };

    // Call getCategories when the component is mounted
    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="flex justify-center items-start space-x-6 p-4 mt-32">
            <div className="max-w-md w-full p-4 bg-white shadow-md rounded-md">
                <h2 className="flex justify-center font-bold text-2xl mb-5">
                    {editingCategory ? 'Sửa Thể Loại Trang Thiết Bị' : 'Đăng Ký Thể Loại Trang Thiết Bị'}
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
                            onKeyPress={(e) => {
                                if (!/^[0-9]+$/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
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
                        {editingCategory ? 'Cập Nhật' : 'Đăng Ký'}
                    </button>

                    {/* Cancel button */}
                    {editingCategory && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="w-full bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors mt-2"
                        >
                            Hủy
                        </button>
                    )}
                </form>
            </div>

            {/* Category List with Edit and Delete */}
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
                    <p>Chưa có thể loại nào được đăng ký.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryForm;
