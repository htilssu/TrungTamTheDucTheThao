import { useEffect, useState } from "react";
import { FaFutbol, FaMoneyBillWave } from "react-icons/fa";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import RevenueChart from "./RevenueChart.jsx";

// Helper function để định dạng tiền
const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const BookingStatistics = () => {
    const [statistics, setStatistics] = useState({
        statuses: [],
        revenue: null,
        fields: [],
    });
    const [loading, setLoading] = useState(true);

    const allStatuses = ["PENDING", "ACTING", "COMPLETED", "CANCELLED"];
    const enrichedStatuses = allStatuses.map((status) => {
        const found = statistics.statuses.find((s) => s.status === status);
        return {
            status: status,
            count: found ? found.count : 0,
        };
    });

    useEffect(() => {
        // Fetch dữ liệu từ API
        fetch("http://localhost:8080/v1/booking-field/statistics")
            .then((response) => response.json())
            .then((data) => {
                const statuses = data.filter((item) => item.status !== null);
                const revenue = data.find(
                    (item) => item.paidRevenue !== null || item.unpaidRevenue !== null
                );
                const fields = data.filter((item) => item.fieldId !== null);

                setStatistics({ statuses, revenue, fields });
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching statistics:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <span className="text-lg text-gray-700">Đang tải...</span>
        </div>;
    }

    return (
        <div className="container -mt-8 w-full p-8 min-h-screen bg-gradient-to-tr from-gray-800 via-gray-900 to-black text-white">
            <h1 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">Thống Kê Sân Bóng</h1>

            {/* Thống kê trạng thái */}
            <section className="mb-16">
                <h2 className="text-3xl font-semibold mb-10 text-center">Trạng Thái Booking</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {enrichedStatuses.map((status, index) => (
                        <div key={index} className="p-6 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <p className="text-lg font-medium mb-2">
                                Trạng thái: <strong>{status.status}</strong>
                            </p>
                            <div className="w-16 mx-auto mb-4">
                                <CircularProgressbar value={status.count} maxValue={100} text={`${status.count}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Thống kê doanh thu */}
            {statistics.revenue && (
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold mb-10 text-center">Doanh Thu</h2>
                    <div className="p-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-2xl relative">
                        <FaMoneyBillWave className="absolute top-6 right-6 text-6xl text-teal-200 opacity-20" />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="text-center lg:text-left">
                                <p className="text-xl">Tổng Doanh Thu</p>
                                <p className="text-4xl font-bold mt-2">
                                    {formatCurrency(statistics.revenue.paidRevenue + statistics.revenue.unpaidRevenue)}
                                </p>
                            </div>
                            <div className="text-center lg:text-left">
                                <p className="text-xl">Đã Thanh Toán</p>
                                <p className="text-4xl font-bold mt-2">
                                    {formatCurrency(statistics.revenue.paidRevenue)}
                                </p>
                            </div>
                            <div className="text-center lg:text-left">
                                <p className="text-xl">Chưa Thanh Toán</p>
                                <p className="text-4xl font-bold mt-2">
                                    {formatCurrency(statistics.revenue.unpaidRevenue)}
                                </p>
                            </div>
                        </div>

                        <div className="h-4 mt-8 bg-white rounded-full overflow-hidden">
                            <div
                                className="h-full bg-teal-700 transition-all duration-300"
                                style={{
                                    width: `${(statistics.revenue.paidRevenue /
                                        (statistics.revenue.paidRevenue + statistics.revenue.unpaidRevenue)) * 100}%`,
                                }}
                            ></div>
                        </div>
                        <p className="text-sm mt-2 opacity-80 text-right">Tỉ lệ thanh toán</p>
                    </div>
                </section>
            )}

            {/* Thống kê booking từng sân bóng */}
            <section className="mb-16">
                <h2 className="text-3xl font-semibold mb-10 text-center">Thống Kê Sân Bóng</h2>
                <RevenueChart/>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
                    {statistics.fields.map((field) => (
                        <div
                            key={field.fieldId}
                            className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                            {/* Icon bóng đá */}
                            <FaFutbol className="absolute top-4 right-4 text-6xl text-blue-500 opacity-20"/>

                            {/* Thông tin sân */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-800">Sân Bóng</h3>
                                <p className="text-lg text-gray-600">{field.fieldId}</p>
                            </div>

                            {/* Thông tin lượt đặt và doanh thu */}
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Lượt Đặt Sân</p>
                                    <p className="text-2xl font-bold text-gray-800">{field.fieldBookingCount}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Doanh Thu</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {formatCurrency(field.fieldRevenue)}
                                    </p>
                                </div>
                            </div>

                            {/* Hiệu ứng dưới cùng của card */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BookingStatistics;