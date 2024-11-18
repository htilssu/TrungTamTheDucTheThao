import { useState } from 'react';
import PropTypes from 'prop-types';
import { wPut } from '../../../utils/request.util';

const EditCategoryForm = ({ category, onCancel, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: category.name,
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        try {
            const response = await wPut(`/api/equipment-types/${category.id}`, {
                name: formData.name,
            });
            if (typeof onUpdate === 'function') {
                onUpdate(response);
            } else {
                console.error('onUpdate is not a function');
            }
        } catch (err) {
            console.error(err);
            setError('Đã xảy ra lỗi khi cập nhật thể loại thiết bị.');
        }
    };

    return (
        <div className="max-w-md w-full p-4 bg-white shadow-md rounded-md">
            <h2 className="flex justify-center font-bold text-2xl mb-5">Cập Nhật Thể Loại Thiết Bị</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="text-red-500">{error}</p>}
                <div className="relative">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
    }).isRequired,
    onCancel: PropTypes.func.isRequired, 
    onUpdate: PropTypes.func.isRequired, 
};

export default EditCategoryForm;
