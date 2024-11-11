import { useEffect, useState } from 'react';
import axios from 'axios';
import BookingList from './BookingList';
import LoadingSpinner from './LoadingSpinner';
import ConfirmModal from './ConfirmModal';
import BookingDetail from './BookingDetail';
import { toast } from 'react-toastify';

const BookingFieldList = () => {
    const [customerId] = useState(1); // Mã khách hàng cố định cho phiên này
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [pendingBookings, setPendingBookings] = useState([]);
    const [confirmedBookings, setConfirmedBookings] = useState([]);
    const [cancelledBookings, setCancelledBookings] = useState([]);
    const [activeStatus, setActiveStatus] = useState('pending'); // Trạng thái đang hiển thị

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

    // Phân loại booking
    useEffect(() => {
        setPendingBookings(bookings.filter(booking => booking.bookingStatus === 'ACTING'));
        setConfirmedBookings(bookings.filter(booking => booking.bookingStatus === 'COMPLETED'));
        setCancelledBookings(bookings.filter(booking => booking.bookingStatus === 'CANCELLED'));
    }, [bookings]);

    // Xử lý hủy booking
    const handleCancelBooking = async (bookingId) => {
        try {
            await axios.post(`http://localhost:8080/v1/booking-field/${bookingId}/cancel`);
            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
            toast.success("Hủy lịch thành công!");
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

    // Hiển thị danh sách dựa trên trạng thái activeStatus
    const renderBookingList = () => {
        switch (activeStatus) {
            case 'pending':
                return (
                    <BookingList
                        bookings={pendingBookings}
                        openModal={openModal}
                        openDetailModal={openDetailModal}
                    />
                );
            case 'confirmed':
                return (
                    <BookingList
                        bookings={confirmedBookings}
                        openModal={openModal}
                        openDetailModal={openDetailModal}
                    />
                );
            case 'cancelled':
                return (
                    <BookingList
                        bookings={cancelledBookings}
                        openModal={openModal}
                        openDetailModal={openDetailModal}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Lịch Đặt Sân Bóng</h1>

            {/* Button chọn trạng thái */}
            <div className="flex justify-center mb-6 space-x-4">
                <button
                    onClick={() => setActiveStatus('pending')}
                    className={`px-4 py-2 rounded ${activeStatus === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Đang Diễn Ra
                </button>
                <button
                    onClick={() => setActiveStatus('confirmed')}
                    className={`px-4 py-2 rounded ${activeStatus === 'confirmed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Đã Hoàn Thành
                </button>
                <button
                    onClick={() => setActiveStatus('cancelled')}
                    className={`px-4 py-2 rounded ${activeStatus === 'cancelled' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Đã Hủy
                </button>
            </div>

            {/* Hiển thị danh sách booking tương ứng với trạng thái */}
            {renderBookingList()}

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
