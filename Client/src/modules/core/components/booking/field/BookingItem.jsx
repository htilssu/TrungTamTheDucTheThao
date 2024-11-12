const BookingItem = ({ booking, openModal, openDetailModal }) => {
    return (
        <div className="bg-white border-2 border-emerald-400 shadow-lg rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
                <img
                    src={booking.footballField.imageUrl || "/sanbong1.png"}
                    alt={booking.footballField.fieldName}
                    className="w-full md:w-1/4 rounded-md object-cover"
                />
                <div className="flex-1 gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">{booking.footballField.fieldName}</h2>
                    <p className=" text-gray-700">
                        <span className="font-semibold">Thời gian: </span>
                        {new Date(booking.startTime).toLocaleDateString()}, {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}
                    </p>
                    <p className="flex flex-row gap-2">
                        <span className="font-semibold">Trạng thái: </span>
                        <p
                            className={`font-semibold ${
                                booking.bookingStatus === 'ACTING' ? 'text-green-500' :
                                    booking.bookingStatus === 'COMPLETED' ? 'text-gray-600' :
                                        'text-red-500'
                            }`}
                        >
                            {booking.bookingStatus}
                        </p>
                    </p>
                    <div className={"flex gap-6 mt-2"}>
                        <button
                            onClick={() => openDetailModal(booking)}
                            className=" bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition">
                            Xem chi tiết
                        </button>
                        {booking.bookingStatus === 'ACTING' && (
                            <button
                                onClick={() => openModal(booking)}
                                className=" bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition">
                                Hủy Lịch
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingItem;
