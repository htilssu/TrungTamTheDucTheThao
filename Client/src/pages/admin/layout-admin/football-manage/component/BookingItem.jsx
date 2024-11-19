import { useState } from 'react';
import { Modal } from '@mantine/core';
import { wPost } from "../../../../../utils/request.util.js";
import {toast, ToastContainer} from "react-toastify";
import { queryClient } from "../../../../../modules/cache.js";

function BookingItem({ booking }) {
    const [isExpanded, setIsExpanded] = useState(false); // State để điều khiển việc mở rộng chi tiết
    const [showConfirmModal, setShowConfirmModal] = useState(false); // State để hiển thị modal xác nhận
    const [actionType, setActionType] = useState(''); // Lưu loại hành động (chấp nhận/hủy)
    const [loadingPay, setLoadingPay] = useState(false);

    // Hàm xử lý khi nhấn nút "Xem Chi Tiết"
    const handleToggle = () => {
        setIsExpanded(!isExpanded); // Đổi trạng thái mở rộng
    };

    // Hàm hiển thị modal xác nhận
    const handleAction = (type) => {
        setActionType(type);
        setShowConfirmModal(true);
    };

    // Hàm gọi API sau khi xác nhận chấp nhận hoặc hủy
    const handleConfirmAction = async () => {
        const endpoint =
            actionType === 'accept'
                ? `/v1/booking-field/${booking.id}/accept`
                : `/v1/booking-field/${booking.id}/cancel`;

        try {
            await wPost(endpoint);

            toast.success(
                actionType === 'accept'
                    ? 'Đã chấp nhận booking thành công!'
                    : 'Đã hủy booking thành công!'
            );

            queryClient.invalidateQueries({queryKey: ['admin-bookings']}); // Cập nhật cache sau khi thay đổi

        } catch (error) {
            console.error(error);
            toast.error(
                actionType === 'accept'
                    ? 'Đã xảy ra lỗi khi chấp nhận booking!'
                    : 'Đã xảy ra lỗi khi hủy booking!'
            );
        } finally {
            setShowConfirmModal(false);
        }
    };

    // Hàm cập nhật trạng thái thanh toán
    const handleMarkAsPaid = async () => {
        setLoadingPay(true);
        try {
            await wPost(`/v1/booking-field/${booking.id}/is-pay`);
            toast.success("Đã đánh dấu là đã thanh toán!");
            queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
        } catch (error) {
            console.error("Lỗi khi cập nhật thanh toán:", error);
            toast.error("Không thể đánh dấu là đã thanh toán!");
        } finally {
            setLoadingPay(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-lg rounded-xl border-l-8 border-gradient-to-r from-blue-500 to-purple-500 mb-4 px-8 py-6 transition-transform transform hover:shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Booking ID: {booking.id}</h3>
                    <span className="bg-gradient-to-r from-blue-200 to-purple-200 text-blue-800 text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                    {new Date(booking.createdAt).toLocaleString('vi-VN')}
                </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-4 text-sm">
                    <div>
                        <p className="text-gray-500 font-medium">Customer Name</p>
                        <p className="text-lg font-semibold text-gray-900">{booking.customerName}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 font-medium">Phone</p>
                        <p className="text-lg font-semibold text-gray-900">{booking.customerPhone}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 font-medium">Trạng Thái Thanh Toán</p>
                        <p className={`text-lg font-semibold ${booking.isPay ? 'text-green-500' : 'text-red-500'}`}>
                            {booking.isPay ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'}
                        </p>
                    </div>
                </div>

                {/* Booking details */}
                {isExpanded && (
                    <div className="mt-4 mb-2 p-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-inner">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                                <p className="text-gray-600 font-medium">Thời Gian</p>
                                <p className="text-sm text-gray-900">{new Date(booking.startTime).toLocaleString()} to {new Date(booking.endTime).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 font-medium">Tên Sân</p>
                                <p className="text-lg font-semibold text-gray-900">{booking.footballField.fieldName}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 font-medium">Địa Điểm</p>
                                <p className="text-lg text-gray-900">{booking.footballField.location}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 font-medium">Trạng Thái</p>
                                <p className={`font-bold ${booking.bookingStatus === 'ACTING' ? 'text-green-500' : booking.bookingStatus === 'COMPLETED' ? 'text-gray-600' : 'text-red-500'}`}>
                                    {booking.bookingStatus}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600 font-medium">Tổng Số Tiền</p>
                                <p className="text-lg font-semibold text-green-600">
                                    {booking.totalAmount.toLocaleString()} VND
                                </p>
                            </div>
                            <div>
                                {!booking.isPay && (
                                    <div>
                                        <p className="text-gray-600 text-sm font-light">Nếu KH đã thanh toán vui lòng nhấn: </p>
                                        <button
                                            onClick={handleMarkAsPaid}
                                            className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${loadingPay ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={loadingPay}
                                        >
                                            {loadingPay ? 'Đang xử lý...' : 'Đánh Dấu Đã Thanh Toán'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Button to toggle details */}
                <button
                    onClick={handleToggle}
                    className="text-blue-600 hover:text-purple-600 underline font-semibold transition-colors duration-300"
                >
                    {isExpanded ? 'Ẩn Chi Tiết' : 'Xem Chi Tiết'}
                </button>

                {/* Action buttons for PENDING status */}
                {booking.bookingStatus === 'PENDING' && (
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={() => handleAction('accept')}
                            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-lg transition-transform transform "
                        >
                            Chấp Nhận
                        </button>
                        <button
                            onClick={() => handleAction('cancel')}
                            className="bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-3 rounded-lg transition-transform transform"
                        >
                            Hủy
                        </button>
                    </div>
                )}

                <hr className="my-4 border-gray-300"/>
                <p className="text-right text-gray-500 text-sm italic">Quản lý bởi Admin</p>

                {/* Confirmation Modal */}
                <Modal
                    opened={showConfirmModal}
                    onClose={() => setShowConfirmModal(false)}
                    title={`Xác nhận ${actionType === 'accept' ? 'chấp nhận' : 'hủy'} booking`}
                >
                    <div>
                        <p>Bạn có chắc chắn muốn {actionType === 'accept' ? 'chấp nhận' : 'hủy'} booking này không?</p>
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleConfirmAction}
                            >
                                Xác Nhận
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default BookingItem;
