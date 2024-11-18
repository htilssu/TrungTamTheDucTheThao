import { useState, useEffect } from 'react';
import { wDelete, wGet, wPost, wPut } from '../../../utils/request.util';

const API_URL = '/api/equipment-types';

const CategoryForm = () => {
    const [formData, setFormData] = useState({
        name: ''
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            let response;
            if (editingCategory) {
                response = await wPut(`/api/equipment-types/${editingCategory.id}`, {
                    name: formData.name
                });
    
                setCategories((prevCategories) => prevCategories.map((category) =>
                    category.id === editingCategory.id ? response : category 
                ));
                setEditingCategory(null);
            } else {
                response = await wPost('/api/equipment-types', {
                    name: formData.name
                });

                setCategories((prevCategories) => [...prevCategories, response]);
            }
    
            setFormData({
                name: ''
            });
        } catch (err) {
            console.error(err);
            setError('Đã xảy ra lỗi khi tạo/sửa thể loại thiết bị.');
        }
    };
    const getCategories = async () => {
        try {
            const response = await wGet(API_URL);
            if (Array.isArray(response)) {
                setCategories(response);
                
            } else {
                setError('Dữ liệu không hợp lệ');
            }
        } catch (err) {
            console.error(err);
            setError('Đã xảy ra lỗi khi lấy danh sách thể loại thiết bị.');
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name || ''
        });
    };

    const handleDelete = async (id) => {
        try {
            await wDelete(`/api/equipment-types/${id}`);
            setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
        } catch (err) {
            console.error(err);
            setError('Đã xảy ra lỗi khi xóa thể loại thiết bị.');
        }
    };

    const handleCancel = () => {
        setEditingCategory(null);
        setFormData({
            name: ''
        });
    };

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

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        {editingCategory ? 'Cập Nhật' : 'Đăng Ký'}
                    </button>

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

            <div className="max-w-md w-full p-4 bg-white border-[1px] text-black rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Danh Sách Thể Loại</h2>
                {categories.length > 0 ? (
                    <ul className="space-y-2">
                        {categories.map((category) => (
                            category && category.name ? ( 
                                <li key={category.id} className="p-2 bg-gray-100 rounded-md shadow-sm">
                                    <strong>Tên loại thiết bị :</strong> {category.name}
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
                            ) : null
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