import BookingItem from './BookingItem';

const BookingList = ({ bookings, openModal, openDetailModal }) => {
    if (bookings?.length === 0) {
        return <p className="text-center text-gray-500">Chưa có lịch đặt nào.</p>;
    }

    return (
        <div>
            {bookings?.map((booking) => (
                <BookingItem
                    key={booking.bookingId}
                    booking={booking}
                    openModal={openModal}
                    openDetailModal={openDetailModal}
                />
            ))}
        </div>
    );
};

export default BookingList;
