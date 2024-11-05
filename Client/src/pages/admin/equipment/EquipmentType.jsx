import React, { useState } from 'react';

const CategoryForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        amount: ''
    });
    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Thêm thể loại vào danh sách và reset form
        setCategories([...categories, formData]);
        setFormData({
            name: '',
            amount: ''
        });
    };

    return (

        <div className="flex justify-center items-start space-x-6 p-4 mt-32">
            <div className="max-w-md w-full p-4 bg-white shadow-md rounded-md">
                <h2 className=" flex justify-center font-semibold mb-4">Đăng Ký Thể Loại trang thiết bị </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="peer placeholder-transparent w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            placeholder=""
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
                        Đăng Ký
                    </button>
                </form>
            </div>

            {/* Danh sách thể loại */}
            <div className="max-w-md w-full p-4 bg-white border-[1px] text-black rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Danh Sách Thể Loại</h2>
                {categories.length > 0 ? (
                    <ul className="space-y-2">
                        {categories.map((category, index) => (
                            <li key={index} className="p-2 bg-gray-100 rounded-md shadow-sm">
                                <strong>Tên loại thiết bị :</strong> {category.name} <br />
                                <strong>Số Lượng thiết bị :</strong> {category.amount}
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
