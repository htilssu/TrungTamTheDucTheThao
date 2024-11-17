// Fetch function
import BookingItem from "./component/BookingItem.jsx";
import {TextField} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {wGet} from "../../../../utils/request.util.js";
import StatusToggleButtons from "./component/StatusToggleButtons.jsx";

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
    const pendingBookings = data.filter((booking) => booking.bookingStatus === 'PENDING');
    const actingBookings = data.filter((booking) => booking.bookingStatus === 'ACTING' && booking.endTime > currentTime);
    const completedBookings = data.filter((booking) => booking.bookingStatus === 'COMPLETED' && booking.endTime <= currentTime);
    const canceledBookings = data.filter((booking) => booking.bookingStatus === 'CANCELLED');

    // Filter logic
    const filterBookings = (bookings) => {
        return bookings.filter((booking) =>
            booking.customerName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const filteredPendingBookings = filterBookings(pendingBookings);
    const filteredActingBookings = filterBookings(actingBookings);
    const filteredCompletedBookings = filterBookings(completedBookings);
    const filteredCanceledBookings = filterBookings(canceledBookings);

    // Sort by date
    const sortBookingsByDate = (bookings) => {
        return bookings.sort((a, b) => {
            if (sortDate === 'asc') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            } else if (sortDate === 'desc') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return 0;
        });
    };

    const sortedPendingBookings = sortBookingsByDate(filteredPendingBookings);
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

    const finalPendingBookings = filterByFieldType(sortedPendingBookings);
    const finalActingBookings = filterByFieldType(sortedActingBookings);
    const finalCompletedBookings = filterByFieldType(sortedCompletedBookings);
    const finalCanceledBookings = filterByFieldType(sortedCanceledBookings);

    return (
        <div className="min-h-screen w-full px-10">
            <div className={"mb-10"}>
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Danh Sách Lịch Đặt Sân</h2>

                {/* Search and Sort Options */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
                    <TextField
                        type="text"
                        label={"Tìm kiếm Khách Hàng"}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Nhập tên Khách Hàng..."
                        className="w-full md:w-1/2 p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />

                    <div className="flex items-center space-x-6">
                        {/* Sort by Date */}
                        <label className="text-gray-600 font-semibold">Sort by Date:</label>
                        <select
                            value={sortDate}
                            onChange={(e) => setSortDate(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg shadow-md hover:border-blue-500 transition duration-200"
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
                            className="p-3 border border-gray-300 rounded-lg shadow-md hover:border-blue-500 transition duration-200"
                        >
                            <option value="default">Tất cả</option>
                            <option value="5v5">Sân 5</option>
                            <option value="7v7">Sân 7</option>
                            <option value="11v11">Sân 11</option>
                        </select>
                    </div>
                </div>

                {/* Button to toggle between booking statuses */}
                <StatusToggleButtons viewMode={viewMode} setViewMode={setViewMode}/>

                {/* Display bookings based on viewMode */}
                <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                    {viewMode === 'PENDING' ? 'Đang Xử Lý' : viewMode === 'ACTING' ? 'Đang Diễn Ra' : viewMode === 'COMPLETED' ? 'Đã Hoàn Thành' : 'Đã Hủy'}
                </h3>
                <div className="space-y-6">
                    {(viewMode === 'PENDING' ? finalPendingBookings : viewMode === 'ACTING' ? finalActingBookings : viewMode === 'COMPLETED' ? finalCompletedBookings : finalCanceledBookings).length > 0 ? (
                        (viewMode === 'PENDING' ? finalPendingBookings : viewMode === 'ACTING' ? finalActingBookings : viewMode === 'COMPLETED' ? finalCompletedBookings : finalCanceledBookings).map((booking) => (
                            <BookingItem key={booking.bookingId} booking={booking}/>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 font-medium">
                            Không có booking nào trong trạng
                            thái {viewMode === 'PENDING' ? 'đang xử lý' : viewMode === 'ACTING' ? 'đang hoạt động' : viewMode === 'COMPLETED' ? 'đã hoàn thành' : 'đã hủy'}.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HistoryBookingAdmin;
