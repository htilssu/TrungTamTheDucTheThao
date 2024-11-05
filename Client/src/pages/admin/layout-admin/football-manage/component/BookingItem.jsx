
function BookingItem({ booking }) {
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Booking ID: {booking.bookingId}</h3>
                <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
                    {new Date(booking.startTime).toLocaleDateString()}
                </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-600 font-medium">Customer Name</p>
                    <p className="text-lg font-semibold text-gray-800">{booking.customerName}</p>
                </div>
                <div>
                    <p className="text-gray-600 font-medium">Phone</p>
                    <p className="text-lg font-semibold text-gray-800">{booking.customerPhone}</p>
                </div>
                <div>
                    <p className="text-gray-600 font-medium">Start Time</p>
                    <p className="text-lg text-gray-800">
                        {new Date(booking.startTime).toLocaleString()}
                    </p>
                </div>
                <div>
                    <p className="text-gray-600 font-medium">End Time</p>
                    <p className="text-lg text-gray-800">
                        {new Date(booking.endTime).toLocaleString()}
                    </p>
                </div>
                <div>
                    <p className="text-gray-600 font-medium">Field Name</p>
                    <p className="text-lg font-semibold text-gray-800">{booking.footballField.fieldName}</p>
                </div>
                <div>
                    <p className="text-gray-600 font-medium">Location</p>
                    <p className="text-lg text-gray-800">{booking.footballField.location}</p>
                </div>
                <div>
                    <p className="text-gray-600 font-medium">Total Amount</p>
                    <p className="text-lg font-semibold text-green-600">
                        {booking.totalAmount.toLocaleString()} VND
                    </p>
                </div>
            </div>
            <hr className="my-4 border-gray-200" />
            <p className="text-right text-gray-500 text-sm italic">Booking managed by Admin</p>
        </div>
    );
}

export default BookingItem;
