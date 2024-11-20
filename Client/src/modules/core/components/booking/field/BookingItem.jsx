import {useNavigate} from "react-router-dom";

const BookingItem = ({ booking, openModal, openDetailModal }) => {

    const navigate = useNavigate();
    const bookingData = booking;
    const bookingId = booking.id;

    const handlePayment = () => {
        navigate('/checkout', { state: { bookingData, bookingId } });
    }

    return (
        <div className="bg-white bg-opacity-90 border border-emerald-400 shadow-xl rounded-3xl p-6 mb-8 transition-all hover:shadow-2xl hover:bg-opacity-100">
            <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Image with hover and transition */}
                <img
                    src={booking.footballField.imageUrl || "/sanbong1.png"}
                    alt={booking.footballField.fieldName}
                    className="w-full md:w-1/3 rounded-xl object-cover transition-transform transform hover:scale-105"
                />
                <div className="flex-1 gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">{booking.footballField.fieldName}</h2>
                    <p className="text-gray-600 mt-2">
                        <span className="font-semibold">Thời gian: </span>
                        {new Date(booking.startTime).toLocaleDateString()}, {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}
                    </p>
                    <p className="mt-2 flex flex-row gap-2">
                        <span className="font-semibold">Trạng thái: </span>
                        <span
                            className={`font-semibold text-lg ${
                                booking.bookingStatus === 'PENDING' ? 'text-yellow-500' :
                                    booking.bookingStatus === 'ACTING' ? 'text-green-500' :
                                        booking.bookingStatus === 'COMPLETED' ? 'text-gray-500' :
                                            'text-red-500'
                            }`}
                        >
                            {booking.bookingStatus === 'PENDING' ? 'Chờ Thanh Toán' :
                                booking.bookingStatus === 'ACTING' ? 'Đang Diễn Ra' :
                                    booking.bookingStatus === 'COMPLETED' ? 'Hoàn Thành' :
                                        'Đã Hủy'}
                        </span>
                    </p>

                    {/* Action buttons */}
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => openDetailModal(booking)}
                            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all">
                            Xem chi tiết
                        </button>

                        {(booking.bookingStatus === 'ACTING' || booking.bookingStatus === 'PENDING') && (
                            <button
                                onClick={() => openModal(booking)}
                                className="bg-gradient-to-r from-red-400 to-red-500 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all">
                                Hủy Lịch
                            </button>
                        )}

                        {(booking.bookingStatus !== 'CANCELLED' && !booking.isPay ) && (
                            <button
                                onClick={handlePayment}
                                className="bg-gradient-to-r from-green-400 to-green-500 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all">
                                Thanh Toán Ngay
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingItem;