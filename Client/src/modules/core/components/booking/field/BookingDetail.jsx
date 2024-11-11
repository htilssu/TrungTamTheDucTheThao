import { useEffect, useRef } from 'react';

const FieldDetailModal = ({ isOpen, onClose, booking }) => {
    const modalRef = useRef(null); // Tạo ref cho modal

    // Xử lý khi click bên ngoài modal
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose(); // Đóng modal nếu click bên ngoài
        }
    };

    // Thêm event listener cho các sự kiện click
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Gỡ bỏ event listener khi component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Định dạng số tiền theo VND
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    if (!booking) return null;

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
                <div
                    ref={modalRef}
                    className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full mx-4 transform transition-all duration-300 ease-in-out"
                >
                    {/* Tiêu đề */}
                    <p className="mb-6">
                        <strong className="text-2xl font-semibold text-gray-800">Chi tiết lịch đặt</strong>
                    </p>

                    {/* Ảnh sân bóng */}
                    <img
                        src={booking.footballField.imageUrl || '/sanbong2.png'}
                        alt={booking.footballField.fieldName}
                        className="w-full rounded-lg mb-6 shadow-md object-cover"
                    />

                    {/* Thông tin chi tiết */}
                    <div className="space-y-3 text-gray-700">
                        <p>
                            <strong className="font-medium text-gray-900">Tên sân:</strong> {booking.footballField.fieldName}
                        </p>
                        <p>
                            <strong className="font-medium text-gray-900">Địa điểm:</strong> {booking.footballField.location}
                        </p>
                        <p>
                            <strong className="font-medium text-gray-900">Thời gian: </strong>
                            {new Date(booking.startTime).toLocaleDateString()}, {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}
                        </p>
                        <p>
                            <strong className="font-medium text-gray-900">Trạng thái: </strong>
                            <span
                                className={`font-semibold ${
                                    booking.bookingStatus === 'ACTING' ? 'text-green-500' : 'text-gray-500'
                                }`}
                            >
                        {booking.bookingStatus}
                    </span>
                        </p>
                        <p className="flex items-center">
                            <strong className="font-medium text-gray-900">Số tiền đặt cọc:</strong>
                            <span className="ml-2 text-green-500 font-semibold">
                        {formatCurrency(booking.depositAmount)}
                    </span>
                        </p>
                    </div>

                    {/* Nút đóng */}
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={onClose}
                            className="bg-gray-200 text-gray-700 py-2 px-5 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none transition duration-200 ease-in-out"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default FieldDetailModal;
