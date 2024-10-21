import {useEffect, useState} from 'react';
import axios from 'axios';
import {Confirm} from 'react-admin';

const BookingList = () => {
    const [customerId, setCustomerId] = useState(1);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Lịch Đặt Sân Bóng</h1>
            {bookings.length === 0 ? (
                <p className="text-center text-gray-500">Chưa có lịch đặt nào.</p>
            ) : (
                bookings.map((booking) => (
                    <div key={booking.bookingId} className="bg-white shadow-lg rounded-lg p-4 mb-6">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <img
                                src={booking.footballField.imageUrl}
                                alt={booking.footballField.fieldName}
                                className="w-full md:w-1/3 rounded-md object-cover"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-800">{booking.footballField.fieldName}</h2>
                                <p className="text-gray-600">{booking.footballField.location}</p>
                                <p className="mt-2 text-gray-700">
                                    <span className="font-semibold">Thời gian: </span>
                                    {new Date(booking.startTime).toLocaleDateString()}, {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}
                                </p>
                                <p className="mt-2">
                                    <span className="font-semibold">Trạng thái: </span>
                                    <span
                                        className={`font-semibold ${booking.bookingStatus === 'PENDING' ? 'text-green-500' : 'text-green-500'}`}>
                                        {booking.bookingStatus}
                                    </span>
                                </p>
                                <p className="mt-2">
                                    <span className="font-semibold">Số tiền đặt cọc: </span>
                                    <span className="text-gray-800">{booking.depositAmount} VNĐ</span>
                                </p>
                                <button
                                    onClick={() => openModal(booking)}
                                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                                >
                                    Hủy Lịch
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {isModalOpen && selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <Confirm
                        isOpen={isModalOpen}
                        title={"Hủy Lịch: " + selectedBooking.footballField.fieldName}
                        content="Bạn có chắc muốn Hủy lịch đặt này không?"
                        cancel="Quay lại"
                        confirm="Xác nhận"
                        onConfirm={confirmCancel}
                        onClose={closeModal}
                    />
                </div>
            )}
        </div>
    );
};

export default BookingList;
