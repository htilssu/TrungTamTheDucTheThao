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
            <div className="flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
                <div
                    ref={modalRef}
                    className="bg-white rounded-3xl shadow-2xl p-6 w-full md:max-w-2xl transform transition-all duration-500 ease-in-out scale-100"
                >
                    {/* Tiêu đề */}
                    <p className="mb-6 text-center">
                        <strong className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                            Chi tiết lịch đặt
                        </strong>
                    </p>

                    {/* Ảnh sân bóng */}
                    <div className="mb-6">
                        <img
                            src={booking.footballField.imageUrl || '/sanbong2.png'}
                            alt={booking.footballField.fieldName}
                            className="w-full h-44 md:h-80 rounded-xl object-cover shadow-lg transition-transform transform hover:scale-105"
                        />
                    </div>

                    {/* Thông tin chi tiết */}
                    <div className="space-y-4 text-gray-700">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p>
                                    <strong className="font-medium text-gray-900">Tên sân:</strong>
                                    <span className="ml-2">{booking.footballField.fieldName}</span>
                                </p>
                                <p className="mt-2">
                                    <strong className="font-medium text-gray-900">Địa điểm:</strong>
                                    <span className="ml-2">{booking.footballField.location}</span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <strong className="font-medium text-gray-900">Thời gian: </strong>
                                    <span className="ml-2">
                                        {new Date(booking.startTime).toLocaleDateString()}, {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}
                                    </span>
                                </p>
                                <p className="mt-2">
                                    <strong className="font-medium text-gray-900">Trạng thái: </strong>
                                    <span
                                        className={`font-semibold ${
                                            booking.bookingStatus === 'ACTING'
                                                ? 'text-green-500'
                                                : booking.bookingStatus === 'COMPLETED'
                                                    ? 'text-gray-500'
                                                    : booking.bookingStatus === 'PENDING'
                                                        ? 'text-yellow-500'
                                                        : 'text-red-500'
                                        }`}
                                    >
                                        {booking.bookingStatus === 'ACTING'
                                            ? 'Đang diễn ra'
                                            : booking.bookingStatus === 'COMPLETED'
                                                ? 'Hoàn thành'
                                                : booking.bookingStatus === 'PENDING'
                                                    ? 'Chờ xử lý'
                                                    : 'Đã hủy'}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Thông tin thanh toán */}
                        <div className="border-t border-gray-200 pt-4">
                            <p className="flex items-center justify-between text-xl">
                                <strong className="font-medium text-gray-900">Số tiền:</strong>
                                <span className="text-green-600 font-bold">
                                        {formatCurrency(booking.depositAmount)}
                                    </span>
                            </p>
                            <p className="flex items-center justify-between mt-2 text-xl">
                                <strong className="font-medium text-gray-900">Trạng thái thanh toán:</strong>
                                <span className={`font-bold ${booking.isPay ? 'text-green-500' : 'text-red-500'}`}>
                                        {booking.isPay ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                    </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default FieldDetailModal;