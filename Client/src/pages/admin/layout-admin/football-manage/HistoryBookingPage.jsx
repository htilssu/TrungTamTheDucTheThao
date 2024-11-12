// Fetch function
import BookingItem from "./component/BookingItem.jsx";
import {TextField} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {wGet} from "../../../../utils/request.util.js";

const fetchBookings = async () => {
    const response = await wGet('/v1/booking-field');
    return response ?? [];
};

function HistoryBookingAdmin() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['admin-bookings'],
        queryFn: fetchBookings,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [sortDate, setSortDate] = useState('default');
    const [sortFieldType, setSortFieldType] = useState('default');
    const [viewMode, setViewMode] = useState('ACTING'); // State lưu chế độ xem theo bookingStatus

    if (isLoading) return <p>Loading bookings...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Lấy thời gian hiện tại
    const currentTime = Date.now();

    // Phân loại lịch booking theo bookingStatus
    const actingBookings = data.filter((booking) => booking.bookingStatus === 'ACTING' && booking.endTime > currentTime);
    const completedBookings = data.filter((booking) => booking.bookingStatus === 'COMPLETED' && booking.endTime <= currentTime);
    const canceledBookings = data.filter((booking) => booking.bookingStatus === 'CANCELLED');

    // Filter logic
    const filterBookings = (bookings) => {
        return bookings.filter((booking) =>
            booking.customerName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const filteredActingBookings = filterBookings(actingBookings);
    const filteredCompletedBookings = filterBookings(completedBookings);
    const filteredCanceledBookings = filterBookings(canceledBookings);

    // Sort by date
    const sortBookingsByDate = (bookings) => {
        return bookings.sort((a, b) => {
            if (sortDate === 'asc') {
                return new Date(a.startTime) - new Date(b.startTime);
            } else if (sortDate === 'desc') {
                return new Date(b.startTime) - new Date(a.startTime);
            }
            return 0;
        });
    };

    const sortedActingBookings = sortBookingsByDate(filteredActingBookings);
    const sortedCompletedBookings = sortBookingsByDate(filteredCompletedBookings);
    const sortedCanceledBookings = sortBookingsByDate(filteredCanceledBookings);

    // Sort by field type if selected
    const filterByFieldType = (bookings) => {
        return bookings.filter((booking) => {
            if (sortFieldType === 'default') return true;
            return booking.footballField.fieldType === sortFieldType;
        });
    };

    const finalActingBookings = filterByFieldType(sortedActingBookings);
    const finalCompletedBookings = filterByFieldType(sortedCompletedBookings);
    const finalCanceledBookings = filterByFieldType(sortedCanceledBookings);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Danh Sách Lịch Đặt Sân</h2>

            {/* Search and Sort Options */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
                <TextField
                    type="text"
                    label={"Tìm kiếm Khách Hàng"}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Nhập tên Khách Hàng..."
                    className="w-full md:w-1/3"
                />

                <div className="flex items-center space-x-4">
                    {/* Sort by Date */}
                    <label className="text-gray-600 font-semibold">Sort by Date:</label>
                    <select
                        value={sortDate}
                        onChange={(e) => setSortDate(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="default">Tất cả</option>
                        <option value="asc">Cũ nhất</option>
                        <option value="desc">Mới Nhất</option>
                    </select>

                    {/* Sort by Field Type */}
                    <label className="text-gray-600 font-semibold">Sort by Field Type:</label>
                    <select
                        value={sortFieldType}
                        onChange={(e) => setSortFieldType(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="default">Tất cả</option>
                        <option value="5v5">Sân 5</option>
                        <option value="7v7">Sân 7</option>
                        <option value="11v11">Sân 11</option>
                    </select>
                </div>
            </div>

            {/* Button to toggle between booking statuses */}
            <div className="mb-6 flex justify-center space-x-8">
                <button
                    onClick={() => setViewMode('ACTING')}
                    className={`px-6 py-3 rounded-lg text-white ${viewMode === 'ACTING' ? 'bg-blue-500' : 'bg-gray-400'} hover:bg-blue-400`}
                >
                    Đang Hoạt Động
                </button>
                <button
                    onClick={() => setViewMode('COMPLETED')}
                    className={`px-6 py-3 rounded-lg text-white ${viewMode === 'COMPLETED' ? 'bg-blue-500' : 'bg-gray-400'} hover:bg-blue-400`}
                >
                    Đã Hoàn Thành
                </button>
                <button
                    onClick={() => setViewMode('CANCEL')}
                    className={`px-6 py-3 rounded-lg text-white ${viewMode === 'CANCEL' ? 'bg-blue-500' : 'bg-gray-400'} hover:bg-blue-400`}
                >
                    Đã Hủy
                </button>
            </div>

            {/* Display bookings based on viewMode */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {viewMode === 'ACTING' ? 'Bookings Active' : viewMode === 'COMPLETED' ? 'Completed Bookings' : 'Canceled Bookings'}
            </h3>
            <div className="space-y-6">
                {(viewMode === 'ACTING' ? finalActingBookings : viewMode === 'COMPLETED' ? finalCompletedBookings : finalCanceledBookings).length > 0 ? (
                    (viewMode === 'ACTING' ? finalActingBookings : viewMode === 'COMPLETED' ? finalCompletedBookings : finalCanceledBookings).map((booking) => (
                        <BookingItem key={booking.bookingId} booking={booking} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        Không có booking nào trong trạng thái {viewMode === 'ACTING' ? 'đang hoạt động' : viewMode === 'COMPLETED' ? 'đã hoàn thành' : 'đã hủy'}.
                    </p>
                )}
            </div>
        </div>
    );
}

export default HistoryBookingAdmin;
