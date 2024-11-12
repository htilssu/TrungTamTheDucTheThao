import { useEffect, useState } from 'react';
import axios from 'axios';
import BookingList from './BookingList';
import LoadingSpinner from './LoadingSpinner';
import ConfirmModal from './ConfirmModal';
import BookingDetail from './BookingDetail';

const BookingFieldList = () => {
    const [customerId] = useState(1); // Mã khách hàng cố định cho phiên này
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [pendingBookings, setPendingBookings] = useState([]);
    const [confirmedBookings, setConfirmedBookings] = useState([]);

    // Fetch dữ liệu bookings từ API
    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/v1/booking-field/user/${customerId}`);
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [customerId]);

    // Phân loại booking thành các nhóm `pending` và `confirmed`
    useEffect(() => {
        setPendingBookings(bookings.filter(booking => booking.bookingStatus === 'PENDING'));
        setConfirmedBookings(bookings.filter(booking => booking.bookingStatus === 'CONFIRMED'));
    }, [bookings]);

    // Xử lý hủy booking
    const handleCancelBooking = async (bookingId) => {
        try {
            await axios.delete(`http://localhost:8080/v1/booking-field/${bookingId}`);
            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
        } catch (error) {
            console.error("Error cancelling booking:", error);
        }
    };

    // Mở modal xác nhận hủy
    const openModal = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    // Đóng modal xác nhận hủy
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    // Xác nhận hủy booking
    const confirmCancel = () => {
        if (selectedBooking) {
            handleCancelBooking(selectedBooking.id);
            closeModal();
        }
    };

    // Mở modal chi tiết booking
    const openDetailModal = (booking) => {
        setSelectedBooking(booking);
        setIsDetailModalOpen(true);
    };

    // Đóng modal chi tiết booking
    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedBooking(null);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Lịch Đặt Sân Bóng</h1>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold text-blue-500 mb-4">Đang Diễn Ra</h2>
                <BookingList
                    bookings={pendingBookings}
                    openModal={openModal}
                    openDetailModal={openDetailModal}
                />
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-blue-500 mb-4">Đã Hoàn Thành</h2>
                <BookingList
                    bookings={confirmedBookings}
                    openModal={openModal}
                    openDetailModal={openDetailModal}
                />
            </section>

            {/* Modal xác nhận hủy */}
            <ConfirmModal
                isOpen={isModalOpen}
                title={`Hủy Lịch: ${selectedBooking?.footballField.fieldName}`}
                content="Bạn có chắc muốn Hủy lịch đặt này không?"
                cancel="Quay lại"
                confirm="Xác nhận"
                onConfirm={confirmCancel}
                onClose={closeModal}
            />

            {/* Modal chi tiết booking */}
            <BookingDetail
                isOpen={isDetailModalOpen}
                onClose={closeDetailModal}
                booking={selectedBooking}
            />
        </div>
    );
};

export default BookingFieldList;