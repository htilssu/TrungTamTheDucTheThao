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
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div
                    ref={modalRef} // Đính kèm ref vào modal
                    className="bg-white rounded-lg px-8 py-4 max-w-lg mx-auto"
                >
                    <p className={"mb-4"}><strong className={"font-semibold text-2xl"}>Chi tiết lịch đặt</strong></p>
                    <img
                        src={booking.footballField.imageUrl}
                        alt={booking.footballField.fieldName}
                        className="w-full rounded-md mb-4"
                    />
                    <p className={"mb-2"}><strong>Tên sân:</strong> {booking.footballField.fieldName}</p>
                    <p className="mb-2"><strong>Địa điểm:</strong> {booking.footballField.location}</p>
                    <p className="mb-2">
                        <strong>Thời gian: </strong>
                        {new Date(booking.startTime).toLocaleDateString()}, {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}
                    </p>
                    <p className="mb-2">
                        <strong>Trạng thái: </strong>
                        <span
                            className={`font-semibold ${booking.bookingStatus === 'PENDING' ? 'text-green-500' : 'text-red-500'}`}
                        >
                            {booking.bookingStatus}
                        </span>
                    </p>
                    <p className="mb-2 flex flex-row gap-1">
                        <strong>Số tiền đặt cọc:</strong>
                        <div className="text-green-500 font-semibold">{formatCurrency(booking.depositAmount)}</div>
                    </p>
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="mt-4 bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition"
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
