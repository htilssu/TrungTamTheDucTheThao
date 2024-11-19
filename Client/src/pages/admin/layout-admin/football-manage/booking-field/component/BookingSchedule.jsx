import { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import axios from 'axios';
import {wGet} from "../../../../../../utils/request.util.js";

const BookingSchedule = ({ selectedField, selectedDate, setSelectedDate, onOpenBookingModal }) => {
    const [availableTimes, setAvailableTimes] = useState([]);  // Trạng thái chứa tất cả các khung giờ
    const [bookedTimes, setBookedTimes] = useState([]);  // Trạng thái chứa các khung giờ đã đặt
    const [error, setError] = useState(null);  // Trạng thái lỗi

    // Lấy dữ liệu khung giờ khi thay đổi sân hoặc ngày
    useEffect(() => {
        const fetchAvailableTimes = async () => {
            if (selectedField && selectedDate) {
                try {
                    const response = await wGet(`/v1/booking-field/available-times/${selectedField}?date=${selectedDate}`);
                    const responseJson = await response.json();
                    const { availableTimes, bookedTimes } = responseJson;

                    setAvailableTimes(availableTimes);  // Cập nhật khung giờ trống
                    setBookedTimes(bookedTimes);  // Cập nhật khung giờ đã đặt
                } catch (error) {
                    console.error("Error fetching available times:", error);
                    setError("Không thể tải thông tin khung giờ.");
                }
            }
        };

        fetchAvailableTimes();
    }, [selectedField, selectedDate]);

    const disabledDate = (current) => {
        // Disable tất cả các ngày trước ngày hiện tại
        return current && current < new Date().setHours(0, 0, 0, 0);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-2 bg-white shadow-lg rounded-lg">
            {/* Component chọn ngày */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Ngày: </h3>
                <DatePicker
                    onChange={(date, dateString) => setSelectedDate(dateString)}
                    className="border rounded p-2"
                    disabledDate={disabledDate}  // Vô hiệu hóa ngày trong quá khứ
                />
            </div>

            {/* Hiển thị khung giờ đã đặt */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Khung giờ đã đặt:</h3>
                <div className="grid grid-cols-3 gap-3">
                    {bookedTimes.map((time, index) => (
                        <div
                            key={index}
                            className="p-4 bg-red-300 text-white text-center rounded-lg cursor-not-allowed opacity-70"
                            title="Khung giờ đã được đặt"
                        >
                            <p>{time}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hiển thị khung giờ còn trống */}
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Khung giờ trống:</h3>
                <div className="grid grid-cols-3 gap-3">
                    {availableTimes.map((time, index) => (
                        <div
                            key={index}
                            onClick={() => onOpenBookingModal(time)}  // Mở modal khi người dùng nhấp vào khung giờ trống
                            className="p-4 bg-green-400 text-white text-center rounded-lg cursor-pointer hover:bg-green-500 transition duration-300"
                            title="Nhấn để đặt"
                        >
                            <p>{time}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hiển thị lỗi nếu có */}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
    );
};

export default BookingSchedule;
