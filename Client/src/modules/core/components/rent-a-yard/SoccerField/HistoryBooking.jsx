import { useState, useEffect } from 'react';

const HistoryBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 5;
    const maxPageButtons = 5;

    useEffect(() => {
        const fetchBookings = async () => {
            const data = [
                { id: 1, field: 'Soccer Field 1', date: '2024-09-25', time: '10:00 - 12:00', status: 'Confirmed' },
                { id: 2, field: 'Gym', date: '2024-09-26', time: '14:00 - 15:30', status: 'Cancelled' },
                { id: 3, field: 'Soccer Field 2', date: '2024-09-27', time: '16:00 - 18:00', status: 'Confirmed' },
                { id: 4, field: 'Gym', date: '2024-09-28', time: '08:00 - 09:30', status: 'Confirmed' },
                { id: 5, field: 'Soccer Field 3', date: '2024-09-29', time: '12:00 - 14:00', status: 'Cancelled' },
                { id: 6, field: 'Gym', date: '2024-09-30', time: '09:00 - 10:30', status: 'Confirmed' },
                { id: 7, field: 'Soccer Field 1', date: '2024-10-01', time: '11:00 - 13:00', status: 'Cancelled' },
                { id: 8, field: 'Gym', date: '2024-10-02', time: '13:00 - 14:30', status: 'Confirmed' },
                { id: 9, field: 'Soccer Field 2', date: '2024-10-03', time: '14:00 - 16:00', status: 'Confirmed' },
                { id: 10, field: 'Soccer Field 3', date: '2024-10-04', time: '15:00 - 17:00', status: 'Cancelled' },
            ];
            setBookings(data);
        };
        fetchBookings();
    }, []);

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const totalPages = Math.ceil(bookings.length / bookingsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const halfRange = Math.floor(maxPageButtons / 2);
        let startPage = currentPage - halfRange;
        let endPage = currentPage + halfRange;

        if (startPage <= 0) {
            startPage = 1;
            endPage = Math.min(totalPages, maxPageButtons);
        }

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, totalPages - maxPageButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i} className="mx-1">
                    <button
                        onClick={() => paginate(i)}
                        className={`px-4 py-2 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {i}
                    </button>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Booking History</h2>
            {currentBookings.length === 0 ? (
                <p className="text-center text-gray-600">No bookings found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-800 text-white text-left">
                                <th className="p-4">#</th>
                                <th className="p-4">Field</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Time</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBookings.map((booking, index) => (
                                <tr key={booking.id} className="border-b hover:bg-gray-100">
                                    <td className="p-4">{indexOfFirstBooking + index + 1}</td>
                                    <td className="p-4">{booking.field}</td>
                                    <td className="p-4">{booking.date}</td>
                                    <td className="p-4">{booking.time}</td>
                                    <td className={`p-4 ${booking.status === 'Confirmed' ? 'text-green-500' : 'text-red-500'}`}>
                                        {booking.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Cut page */}
            <div className="flex justify-center mt-4">
                <ul className="inline-flex items-center">
                    {/* Previous*/}
                    <li className="mx-1">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700'}`}
                            disabled={currentPage === 1}
                        >
                            &lt; Trước
                        </button>
                    </li>

                    {/* Page */}
                    {renderPageNumbers()}

                    {/* Next */}
                    <li className="mx-1">
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700'}`}
                            disabled={currentPage === totalPages}
                        >
                            Sau &gt;
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default HistoryBooking;
