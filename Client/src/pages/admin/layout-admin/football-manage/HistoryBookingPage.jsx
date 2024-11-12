import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import BookingItem from './component/BookingItem.jsx';
import { TextField } from '@mui/material';

// Fetch function
const fetchBookings = async () => {
    const response = await axios.get('http://localhost:8080/v1/booking-field');
    return response.data;
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

    if (isLoading) return <p>Loading bookings...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Filter logic
    const filteredData = data.filter((booking) =>
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort by date
    const sortedData = filteredData.sort((a, b) => {
        if (sortDate === 'asc') {
            return new Date(a.startTime) - new Date(b.startTime);
        } else if (sortDate === 'desc') {
            return new Date(b.startTime) - new Date(a.startTime);
        }
        return 0;
    });

    // Further sort by field type if selected
    const finalData = sortedData.filter((booking) => {
        if (sortFieldType === 'default') return true;
        return booking.footballField.fieldType === sortFieldType;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-10">
            <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Booking List</h2>

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

            {/* Booking List */}
            <div className="space-y-8">
                {finalData.length > 0 ? (
                    finalData.map((booking) => (
                        <BookingItem key={booking.bookingId} booking={booking} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Không tìm thấy Booking nào.</p>
                )}
            </div>
        </div>
    );
}

export default HistoryBookingAdmin;
