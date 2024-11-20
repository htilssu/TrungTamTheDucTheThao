import { useState } from 'react';

const BookingModal = ({ isOpen, onClose, onConfirmBooking, initialBooking }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    // Chuyển đổi thời gian khung giờ thành startTime và endTime
    const getStartEndTimes = (date, time) => {
        const [start, end] = time.split(' - '); // Chia khung giờ thành giờ bắt đầu và giờ kết thúc
        const startTime = new Date(`${date}T${start}:00`); // Tạo đối tượng Date cho startTime
        const endTime = new Date(`${date}T${end}:00`);   // Tạo đối tượng Date cho endTime
        return { startTime, endTime };
    };

    const handleConfirm = () => {
        if (name && phone) {
            const { startTime, endTime } = getStartEndTimes(initialBooking.date, initialBooking.time);

            // Gửi yêu cầu đặt lịch với thông tin khách hàng, thời gian và sân
            const bookingData = {
                footballField: { id: initialBooking.fieldId },
                customer: {id: 1},  //id lấy của Admin
                customerName: name,
                customerPhone: phone,
                startTime: startTime,
                endTime: endTime,
                depositAmount: 0,
                totalAmount: 0 ,
                paymentMethod: "Admin",
            };

            onConfirmBooking(bookingData);
            onClose();
        } else {
            alert("Vui lòng nhập đầy đủ tên và số điện thoại.");
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white w-11/12 sm:w-96 p-6 rounded-xl shadow-2xl transform transition-all duration-500 ease-in-out">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Đặt lịch sân
                </h2>

                {/* Tên */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tên:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Số điện thoại */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleConfirm}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                        Xác nhận
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default BookingModal;
