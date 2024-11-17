import {useLocation, useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import {useEffect, useState} from "react";
import {WoWoWallet} from "@htilssu/wowo";
import Modal from "./components/Modal.jsx";
import {wDelete, wPost} from "../../../../utils/request.util.js";

function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [timer, setTimer] = useState(300);
    const { bookingData, bookingId } = location.state || {};

    const wowoWallet = new WoWoWallet("tuananh21@gmail.com");

    useEffect(() => {
        if (!bookingData) return;

        // Start countdown when the component is mounted
        const countdownInterval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(countdownInterval);
                    handleCancelBooking();
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(countdownInterval);
    }, [bookingData]);

    if (!bookingData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-gray-600">Không có dữ liệu đặt sân!</p>
            </div>
        );
    }

    //Call API update Status Booking
    const successCallbackUrl = `http://localhost:8080/v1/booking-field/${bookingId}/status-acting`;
    const returnCallbackUrl = `http://localhost:5173/payment-success/${bookingId}`;

    const handleConfirmPayment = async () => {
        setLoading(true);
        const orderProps = {
            money: bookingData.depositAmount,
            serviceName: "SportCenter",
            items: [
                {name: "Đặt sân bóng", amount: 1, unitPrice: bookingData.depositAmount}
            ],
            callback: {
                successUrl: successCallbackUrl,
                returnUrl: returnCallbackUrl
            }
        };

        try {
            //giả xử thanh toán thành công và gọi api cập nhật trạng thái booking
            await wPost(`/v1/booking-field/${bookingId}/status-acting`);
            ////
            const orderResponse = await wowoWallet.createOrder(orderProps);
            if (orderResponse && orderResponse.checkoutUrl) {
                window.location.href = orderResponse.checkoutUrl;
            } else {
                toast.error('Không thể tạo đơn hàng thanh toán!');
            }
        } catch (error) {
            console.error('Error creating payment order:', error);
            toast.error('Không thể tạo đơn hàng thanh toán!');
        } finally {
            setLoading(false);
            setShowConfirmModal(false);
        }
    };

    const handleCancelBooking = async () => {
        // Gọi API xóa hoặc hủy booking
        try {
            await wDelete(`/v1/booking-field/${bookingId}`);

            toast.info('Đã hủy đặt sân.');
            navigate('/soccer/rent-yard');

        } catch (error) {
            console.error('Error:', error);
            toast.error('Đã xảy ra lỗi khi hủy booking.');
            setShowCancelModal(false);
        }finally {
            setShowCancelModal(false);
        }
    };

    const InfoRow = ({label, value, className}) => (
        <div className={`flex justify-between items-center py-2 ${className}`}>
            <span className="text-gray-600">{label}:</span>
            <span className={`font-medium ${className}`}>{value}</span>
        </div>
    );

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className=" bg-gradient-to-b from-cyan-500 to-green-800 flex items-center justify-center p-8">
            <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg w-full ">
                <div className="border-b pb-2">
                    <h1 className="text-3xl font-bold text-gray-800">Chi tiết Thanh Toán</h1>
                </div>

                <div className="space-y-2">
                    <div className="bg-gray-50 px-4 py-2 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">Thông tin đặt sân</h2>
                        <InfoRow label="Mã Sân" value={bookingData.footballField.id}/>
                        <InfoRow label="Tên khách hàng" value={bookingData.customerName}/>
                        <InfoRow label="Số điện thoại" value={bookingData.customerPhone}/>
                        <InfoRow
                            label="Thời gian"
                            value={`${new Date(bookingData.startTime).toLocaleTimeString()} - ${new Date(bookingData.endTime).toLocaleTimeString()}`}
                        />
                        <InfoRow
                            label="Tổng số tiền"
                            value={`${bookingData.totalAmount.toLocaleString()} VND`}
                            className="text-green-600"
                        />
                        <InfoRow
                            label="Tiền cọc trước"
                            value={`${bookingData.depositAmount.toLocaleString()} VND`}
                            className="text-green-600 text-lg font-bold"
                        />
                    </div>

                    <div className="bg-gray-50 px-4 py-2 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-700 mb-1">Phương thức thanh toán</h2>
                        <p className="text-gray-700">
                            Ví WoWo Wallet
                        </p>
                        <div className="pt-2">
                            <p className="text-center text-red-500">Thời gian Thanh Toán: {formatTime(timer)}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between space-x-4 pt-2.5">
                    <button
                        onClick={() => setShowCancelModal(true)}
                        className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-200 font-medium"
                        disabled={loading}
                    >
                        Hủy đặt sân
                    </button>
                    <button
                        onClick={() => setShowConfirmModal(true)}
                        className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-200 font-medium"
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
                    </button>
                </div>
                <div className={"mt-4"}>
                    <a
                        href="/booking"
                        className="px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-100 transition duration-200 font-medium"
                    >
                        Trả tiền sau
                    </a>
                </div>
            </div>

            {/* Modal Xác nhận thanh toán */}
            <Modal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                title="Xác nhận thanh toán"
                content="Bạn có chắc chắn muốn thanh toán đơn đặt sân này?"
                onConfirm={handleConfirmPayment}
                confirmText="Xác nhận"
                cancelText="Hủy"
            />

            {/* Modal Hủy đặt sân */}
            <Modal
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                title="Hủy đặt sân"
                content="Bạn có chắc chắn muốn hủy đơn đặt sân này?"
                onConfirm={handleCancelBooking}
                confirmText="Xác nhận hủy"
                cancelText="Đóng"
            />
            <ToastContainer/>
        </div>
    );
}

export default CheckoutPage;