import {useParams} from 'react-router-dom';
import {wGet} from '../../../../utils/request.util.js';
import {useQuery} from '@tanstack/react-query';

const fetchBookingData = async (bookingId) => {
    const response = await wGet(`/v1/booking-field/${bookingId}`);
    const responseJson = await response.json() || [];
    return responseJson;
}

function PaymentSuccessPage() {
    const {bookingId} = useParams();

    // Sử dụng useQuery để fetch dữ liệu bookingData
    const {data: bookingData, error, isLoading} = useQuery({
        queryKey: ['bookingData', bookingId],
        queryFn: fetchBookingData(bookingId),
        staleTime: 300000, // 5 phút
        cacheTime: 600000, // 10 phút
    });

    // Hiển thị trạng thái loading
    if (isLoading) {
        return (<div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-300">
                <p className="text-2xl text-gray-700 font-semibold animate-pulse">Đang tải dữ liệu...</p>
            </div>);
    }

    // Kiểm tra lỗi hoặc dữ liệu rỗng
    if (error || !bookingData) {
        return (<div className="flex items-center justify-center h-screen bg-gradient-to-b from-red-100 to-red-300">
                <p className="text-2xl text-gray-700 font-semibold">Không có dữ liệu đặt sân!</p>
            </div>);
    }

    return (<div className=" bg-gradient-to-b from-cyan-600 to-gray-700 flex items-center justify-center py-12">
            <div className="bg-white shadow-2xl rounded-xl p-6 max-w-xl w-full space-y-2 text-center">
                <h1 className="text-3xl font-bold text-green-500">Thanh toán thành công!</h1>

                <div className="bg-gray-100 p-6 rounded-lg space-y-4 text-left">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Thông tin đặt sân</h2>
                    <div className="flex justify-between items-center py-1">
                        <span className="text-gray-600">Sân:</span>
                        <span className="font-medium text-gray-800">{bookingData.footballField.fieldName}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <span className="text-gray-600">Tên khách hàng:</span>
                        <span className="font-medium text-gray-800">{bookingData.customerName}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <span className="text-gray-600">Số điện thoại:</span>
                        <span className="font-medium text-gray-800">{bookingData.customerPhone}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <span className="text-gray-600">Ngày tạo:</span>
                        <span className="font-medium text-gray-800">
                            {new Date(bookingData.createdAt).toLocaleString("vi-VN", {
                            year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'})}
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <span className="text-gray-600">Trạng thái:</span>
                        <span
                            className="font-medium text-blue-600">{bookingData.bookingStatus}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <span className="text-gray-600">Tổng tiền:</span>
                        <span
                            className="font-medium text-green-600">{bookingData.totalAmount.toLocaleString()} VND</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <span className="text-gray-600">Tiền cọc:</span>
                        <span
                            className="font-medium text-green-600">{bookingData.depositAmount.toLocaleString()} VND</span>
                    </div>
                </div>

                <div className="flex justify-center space-x-4 mt-4">
                    <a
                        href="/soccer"
                        className="px-5 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-100 transition duration-200 font-medium"
                    >
                        Quay lại
                    </a>
                    <a
                        href="/booking"
                        className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 font-medium"
                    >
                        Xem Lịch Đặt Sân
                    </a>
                </div>
            </div>
        </div>);
}

export default PaymentSuccessPage;