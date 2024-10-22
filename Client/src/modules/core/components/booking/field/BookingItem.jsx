const BookingItem = ({ booking, openModal, openDetailModal }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
                <img
                    src={booking.footballField.imageUrl}
                    alt={booking.footballField.fieldName}
                    className="w-full md:w-1/4 rounded-md object-cover"
                />
                <div className="flex-1 gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">{booking.footballField.fieldName}</h2>
                    <p className=" text-gray-700">
                        <span className="font-semibold">Thời gian: </span>
                        {new Date(booking.startTime).toLocaleDateString()}, {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}
                    </p>
                    <p className="">
                        <span className="font-semibold">Trạng thái: </span>
                        <span className={`font-semibold ${booking.bookingStatus === 'PENDING' ? 'text-green-500' : 'text-red-500'}`}>
                            {booking.bookingStatus}
                        </span>
                    </p>
                    <div className={"flex gap-6 mt-2"}>
                        <button
                            onClick={() => openDetailModal(booking)}
                            className=" bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition">
                            Xem chi tiết
                        </button>
                        <button
                            onClick={() => openModal(booking)}
                            className=" bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition">
                            Hủy Lịch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingItem;
