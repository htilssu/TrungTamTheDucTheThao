import { useEffect, useState } from 'react';
import BookingList from './BookingList';
import LoadingSpinner from './LoadingSpinner';
import ConfirmModal from './ConfirmModal';
import BookingDetail from './BookingDetail';
import { toast } from 'react-toastify';
import { wGet, wPost } from "../../../../../utils/request.util.js";
import {Modal} from "@mantine/core";

const BookingFieldList = () => {
    const [customerId] = useState(1); // Fixed customer ID for this session
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [pendingBookings, setPendingBookings] = useState([]);
    const [confirmedBookings, setConfirmedBookings] = useState([]);
    const [cancelledBookings, setCancelledBookings] = useState([]);
    const [activeStatus, setActiveStatus] = useState('pending');

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await wGet(`/v1/booking-field/user/${customerId}`);
                setBookings(response);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [customerId]);

    useEffect(() => {
        setPendingBookings(bookings.filter(booking => booking.bookingStatus === 'ACTING'));
        setConfirmedBookings(bookings.filter(booking => booking.bookingStatus === 'COMPLETED'));
        setCancelledBookings(bookings.filter(booking => booking.bookingStatus === 'CANCELLED'));
    }, [bookings]);

    const handleCancelBooking = async (bookingId) => {
        try {
            await wPost(`/v1/booking-field/${bookingId}/cancel`);
            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
            toast.success("Booking cancelled successfully!");
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
            handleCancelBooking(selectedBooking.id);
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

    const renderBookingList = () => {
        switch (activeStatus) {
            case 'pending':
                return <BookingList bookings={pendingBookings} openModal={openModal} openDetailModal={openDetailModal} />;
            case 'confirmed':
                return <BookingList bookings={confirmedBookings} openModal={openModal} openDetailModal={openDetailModal} />;
            case 'cancelled':
                return <BookingList bookings={cancelledBookings} openModal={openModal} openDetailModal={openDetailModal} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-10">
            <div className="w-full max-w-4xl px-16 py-4 bg-opacity-90 rounded-3xl shadow-2xl transform transition-all duration-500">
                <h1 className="text-3xl font-bold text-center mb-8 tracking-wider uppercase">
                    Lịch Sử Đặt Sân Bóng
                </h1>

                {/* Status selection buttons */}
                <div className="flex justify-center mb-4 space-x-4">
                    {['pending', 'confirmed', 'cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setActiveStatus(status)}
                            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform ${
                                activeStatus === status
                                    ? 'bg-white text-green-800 shadow-md scale-110'
                                    : 'bg-green-600 text-white opacity-90 hover:opacity-100 hover:shadow-lg hover:-translate-y-1'
                            }`}
                        >
                            {status === 'pending' ? 'Ongoing' : status === 'confirmed' ? 'Completed' : 'Cancelled'}
                        </button>
                    ))}
                </div>

                {/* Booking list based on selected status */}
                <div className="rounded-lg bg-green-50 bg-opacity-80 p-5 shadow-inner">
                    {renderBookingList()}
                </div>

                {/* Confirm cancel modal */}
                <ConfirmModal
                    isOpen={isModalOpen}
                    title={`Cancel Booking: ${selectedBooking?.footballField.fieldName}`}
                    content="Are you sure you want to cancel this booking?"
                    cancel="Go Back"
                    confirm="Confirm"
                    onConfirm={confirmCancel}
                    onClose={closeModal}
                />

                {/* Booking details modal */}
                <Modal opened={isDetailModalOpen} className={'max-w-fit'} size={"lg"} onClose={closeDetailModal}>
                    <BookingDetail
                        isOpen={isDetailModalOpen}
                        onClose={closeDetailModal}
                        booking={selectedBooking}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default BookingFieldList;
