import { useEffect, useState } from 'react';
import axios from 'axios';
import BookingList from './BookingList';
import LoadingSpinner from './LoadingSpinner';
import ConfirmModal from './ConfirmModal';
import BookingDetail from "./BookingDetail.jsx";

const BookingFieldList = () => {
    const [customerId, setCustomerId] = useState(1);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
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

    const handleCancelBooking = async (bookingId) => {
        try {
            await axios.delete(`http://localhost:8080/v1/booking-field/${bookingId}`);
            setBookings(bookings.filter((booking) => booking.bookingId !== bookingId));
        } catch (error) {
            console.error("Error cancelling booking:", error);
        }
    };

    const openModal = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    const confirmCancel = () => {
        if (selectedBooking) {
            handleCancelBooking(selectedBooking.bookingId);
            closeModal();
        }
    };

    const openDetailModal = (booking) => {
        setSelectedBooking(booking);
        setIsDetailModalOpen(true);
    };

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
            <BookingList bookings={bookings} openModal={openModal} openDetailModal={openDetailModal} />
            <ConfirmModal
                isOpen={isModalOpen}
                title={`Hủy Lịch: ${selectedBooking?.footballField.fieldName}`}
                content="Bạn có chắc muốn Hủy lịch đặt này không?"
                cancel="Quay lại"
                confirm="Xác nhận"
                onConfirm={confirmCancel}
                onClose={closeModal}
            />
            <BookingDetail
                isOpen={isDetailModalOpen}
                onClose={closeDetailModal}
                booking={selectedBooking}
            />
        </div>
    );
};

export default BookingFieldList;
