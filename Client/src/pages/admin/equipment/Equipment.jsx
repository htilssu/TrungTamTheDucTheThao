import React, { useState } from 'react';
import ImageSwiper from "../layout-admin/courses-manage/ImageSwiper.jsx";

const EquipmentForm = () => {
    const [formData, setFormData] = useState({
        type: '',
        status: ''
    });
    const [equipments, setEquipments] = useState([]);
    const [images, setImages] = useState([]);
    const [editingMode, setEditingMode] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEquipment = { ...formData, images };
        console.log('New Equipment:', newEquipment);
        setEquipments([...equipments, newEquipment]);
        setFormData({ type: '', status: '' });
        setImages([]);
    };

    const handleDeleteImage = (index) => {
        if (!editingMode) return;
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleImageChange = (e) => {
        const newImages = [...images];
        if (newImages.length >= 6) {
            alert("Bạn chỉ có thể thêm tối đa 6 ảnh!");
            return;
        }

        const files = Array.from(e.target.files);
        const promises = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target.result);
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises).then((results) => {
            setImages((prevImages) => [...prevImages, ...results]);
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Hoạt động':
                return 'text-green-600 font-bold';
            case 'Hư Hỏng':
                return 'text-red-600 font-bold';
            case 'Bảo trì':
                return 'text-yellow-600 font-bold';
            default:
                return 'text-gray-600';
        }
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };

    return (
        <div className="max-w-[800px] mx-auto p-4 bg-white shadow-2xl rounded-md mt-8">
            {/* Khối form thêm trang thiết bị */}
            <div className="mb-8 w-full p-4 bg-white border-[1px] text-black rounded-md">
                <h2 className="text-2xl font-semibold mb-4 flex justify-center">Thêm Trang Thiết Bị</h2>
                <form onSubmit={handleSubmit} className="space-y-6 text-black border-bottom-[1px]">
                    <div className="mb-6 mt-3">
                        {images.length > 0 ? (
                            <ImageSwiper
                                images={images}
                                editingMode={editingMode}
                                handleDeleteImage={handleDeleteImage}
                                sliderSettings={sliderSettings}

                            />
                        ) : (
                            <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                                <img src="/no-image.png" alt="No Image" className="object-contain h-full"/>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                            id="upload"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
                        <button
                            type="button"
                            onClick={() => document.getElementById("upload").click()}
                            className="py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                        >
                            Thêm ảnh
                        </button>

                        <button
                            type="button"
                            onClick={() => setEditingMode(!editingMode)}
                            className="py-2 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
                        >
                            {editingMode ? "Hủy sửa" : "Sửa ảnh"}
                        </button>
                    </div>

                    <div className="relative">
                        <label htmlFor="type" className="block text-gray-700">Loại trang thiết bị</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Chọn loại</option>
                            <option value="Máy chạy bộ">Máy chạy bộ</option>
                            <option value="Tạ đòn">Tạ đòn</option>
                            <option value="Máy đạp xe">Máy đạp xe</option>
                            <option value="Thảm yoga">Thảm yoga</option>
                        </select>
                    </div>

                    <div className="relative">
                        <label htmlFor="status" className="block text-gray-700">Trạng thái</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Chọn trạng thái</option>
                            <option value="Hoạt động">Hoạt động</option>
                            <option value="Hư Hỏng">Hư Hỏng</option>
                            <option value="Bảo trì">Bảo trì</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Đăng Ký
                    </button>
                </form>
            </div>

            {/* Khối danh sách trang thiết bị */}
            <div className=" w-full p-4 bg-white border-[1px] text-black rounded-md">
                <h2 className="text-2xl font-semibold mb-4 flex justify-center">Danh Sách Trang Thiết Bị</h2>
                <div>
                    {equipments.length > 0 ? (
                        <ul className="space-y-3">
                            {equipments.map((equipment, index) => (
                                <li key={index} className="p-2 rounded-md border border-gray-300">
                                    <div className="flex  justify-center">
                                    <div className="mb-2 w-1/4 ">
                                        {equipment.images.length > 0 ? (
                                            <ImageSwiper
                                                images={equipment.images}
                                                editingMode={false}
                                                handleDeleteImage={() => {
                                                }}
                                                sliderSettings={sliderSettings}

                                            />
                                        ) : (
                                            <img
                                                src="/no-image.png"
                                                alt="No Image"
                                                className="w-full h-64 object-contain"
                                            />
                                        )}
                                    </div>
                                    </div>
                                    <strong className={"mr-2"}>Loại:</strong> {equipment.type} <br/>
                                    <strong className={"mr-2"}>Trạng thái:</strong>
                                    <span className={getStatusColor(equipment.status)}>
                                        {equipment.status}
                                    </span>
                                    <br/>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={"flex justify-center"}>Chưa có trang thiết bị nào được thêm.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EquipmentForm;
