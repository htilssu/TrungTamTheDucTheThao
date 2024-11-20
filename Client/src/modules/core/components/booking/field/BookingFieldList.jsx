import { useEffect, useState } from 'react';
import BookingList from './BookingList';
import LoadingSpinner from './LoadingSpinner';
import ConfirmModal from './ConfirmModal';
import BookingDetail from './BookingDetail';
import {toast, ToastContainer} from 'react-toastify';
import { wGet, wPost } from "../../../../../utils/request.util.js";
import { Modal } from "@mantine/core";
import StatusSelectionButtons from "./StatusSelectionButtons.jsx";

const BookingFieldList = () => {
    const [customerId] = useState(1); // Fixed customer ID for this session
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [pendingBookings, setPendingBookings] = useState([]);
    const [actingBookings, setActingBookings] = useState([]);
    const [confirmedBookings, setConfirmedBookings] = useState([]);
    const [cancelledBookings, setCancelledBookings] = useState([]);
    const [activeStatus, setActiveStatus] = useState('pending');

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await wGet(`/v1/booking-field/user/${customerId}`);
                const responseJson = await response.json() || [];
                setBookings(responseJson);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [customerId]);

    useEffect(() => {
        setPendingBookings(bookings.filter(booking => booking.bookingStatus === 'PENDING'));
        setActingBookings(bookings.filter(booking => booking.bookingStatus === 'ACTING'));
        setConfirmedBookings(bookings.filter(booking => booking.bookingStatus === 'COMPLETED'));
        setCancelledBookings(bookings.filter(booking => booking.bookingStatus === 'CANCELLED'));
    }, [bookings]);

    const handleCancelBooking = async (bookingId) => {
        try {
            await wPost(`/v1/booking-field/${bookingId}/cancel`);
            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
            toast.success("Hủy lịch thành công!");
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
            case 'acting':
                return <BookingList bookings={actingBookings} openModal={openModal} openDetailModal={openDetailModal} />;
            case 'confirmed':
                return <BookingList bookings={confirmedBookings} openModal={openModal} openDetailModal={openDetailModal} />;
            case 'cancelled':
                return <BookingList bookings={cancelledBookings} openModal={openModal} openDetailModal={openDetailModal} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full min-h-screen flex justify-center  py-6 px-10 bg-gradient-to-br from-green-200 via-green-300 to-green-500">
            <div className="w-full max-w-5xl px-16 py-8 bg-white bg-opacity-90 rounded-3xl shadow-2xl transform transition-all duration-500">
                <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                    Lịch Sử Đặt Sân Bóng
                </h1>

                {/* Status selection buttons */}
                <StatusSelectionButtons activeStatus={activeStatus} setActiveStatus={setActiveStatus} />

                {/* Booking list based on selected status */}
                <div className="rounded-xl bg-green-50 bg-opacity-90 p-6 shadow-inner backdrop-blur-sm border border-green-300">
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
            <ToastContainer />
        </div>
    );
};

export default BookingFieldList;
