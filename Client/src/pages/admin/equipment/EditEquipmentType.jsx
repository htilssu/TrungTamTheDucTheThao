import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EditCategoryForm = ({ category, onCancel, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: category.name,
        amount: category.amount
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.amount) {
            setError('Tên thể loại và số lượng không được để trống.');
            return;
        }

        // Call the onUpdate function passed in props to update the category
        onUpdate({ ...category, name: formData.name, amount: parseInt(formData.amount, 10) });
    };

    return (
        <div>
            <h2 className="font-bold text-2xl mb-5">Cập Nhật Thể Loại</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Cập Nhật
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
};

EditCategoryForm.propTypes = {
    category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default EditCategoryForm;