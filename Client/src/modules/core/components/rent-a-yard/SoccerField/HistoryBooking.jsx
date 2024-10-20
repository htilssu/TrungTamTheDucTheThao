import { useState, useEffect, useMemo } from 'react';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = useMemo(() => {
        const pageNumbers = [];
        const maxPageButtons = 5;
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
                        onClick={() => onPageChange(i)}
                        className={`px-4 py-2 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {i}
                    </button>
                </li>
            );
        }

        return pageNumbers;
    }, [currentPage, totalPages]);

    return (
        <ul className="inline-flex items-center">
            {/* Previous button */}
            <li className="mx-1">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700'}`}
                    disabled={currentPage === 1}
                >
                    &lt; Trước
                </button>
            </li>

            {/* Page numbers */}
            {pageNumbers}

            {/* Next button */}
            <li className="mx-1">
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700'}`}
                    disabled={currentPage === totalPages}
                >
                    Sau &gt;
                </button>
            </li>
        </ul>
    );
};

const HistoryBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 5;

    useEffect(() => {
        const getBookings = async () => {
            try {
                const data = await fetchBookings();
                setBookings(data);
            } catch (err) {
                setError('Failed to fetch bookings');
            } finally {
                setIsLoading(false);
            }
        };
        getBookings();
    }, []);

    const { currentBookings, totalPages } = useMemo(() => {
        const indexOfLastBooking = currentPage * bookingsPerPage;
        const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
        return {
            currentBookings: bookings.slice(indexOfFirstBooking, indexOfLastBooking),
            totalPages: Math.ceil(bookings.length / bookingsPerPage)
        };
    }, [bookings, currentPage]);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    if (isLoading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600">{error}</p>;
    }

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
                                    <td className="p-4">{(currentPage - 1) * bookingsPerPage + index + 1}</td>
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

            {/* Pagination Controls */}
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
            />
        </div>
    );
};

export default HistoryBooking;
