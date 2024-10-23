import { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic gửi form
        console.log('Submitted:', formData);
        setIsOpen(false); // Đóng form sau khi gửi
    };

    return (
        <div className="">
            <div className="w-full bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 mb-8 rounded-lg z-10">
                <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Liên Hệ Với Chúng Tôi</h2>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-cyan-500 text-white px-6 py-2 rounded-md shadow-lg hover:bg-cyan-600 transition duration-300 mb-4"
                >
                    {isOpen ? 'Hủy Liên Hệ' : 'Liên Hệ'}
                </button>
                {isOpen && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium">Họ và tên</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Chủ đề</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Nội dung tin nhắn</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition duration-300"
                        >
                            Gửi Tin Nhắn
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactForm;
