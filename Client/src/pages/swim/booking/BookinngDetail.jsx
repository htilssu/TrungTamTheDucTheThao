import { useLocation, useNavigate } from 'react-router-dom';

const BookingDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, phone, swimType, selectedSlots, totalCost } = location.state || {};

    const swimOptions = {
        children: {
            label: "Hồ bơi trẻ em",
            dimensions: {
                length: "50 m",
                width: "30 m",
                depth: "50cm - 1m"
            }
        },
        adult: {
            label: "Hồ bơi người lớn",
            dimensions: {
                length: "100 m",
                width: "50 m",
                depth: "1.5m - 2m"
            }
        },
        professional: {
            label: "Hồ bơi chuyên nghiệp",
            dimensions: {
                length: "200 m",
                width: "100 m",
                depth: "3m"
            }
        }
    };

    const handlePayment = () => {

        navigate('/payment', { state: { name, phone, swimType, selectedSlots, totalCost } });
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-100 to-gray-100 rounded-xl shadow-2xl mt-10">
            <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">Chi Tiết Đặt Vé</h1>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Thông Tin Người Đặt</h2>
                <p><strong>Tên:</strong> {name}</p>
                <p><strong>Số Điện Thoại:</strong> {phone}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Thông Tin Hồ Bơi</h2>
                <p><strong>Loại Hồ Bơi:</strong> {swimOptions[swimType].label}</p>
                <p><strong>Chiều dài:</strong> {swimOptions[swimType].dimensions.length}</p>
                <p><strong>Chiều rộng:</strong> {swimOptions[swimType].dimensions.width}</p>
                <p><strong>Độ sâu:</strong> {swimOptions[swimType].dimensions.depth}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Khung Giờ Đặt</h2>
                <ul>
                    {selectedSlots.map(slot => (
                        <li key={slot} className="text-lg">{slot}</li>
                    ))}
                </ul>
            </div>
            <div className="mb-4 text-lg font-semibold">
                <p>Tổng Chi Phí: <strong className="text-green-600">{totalCost.toLocaleString()} VND</strong></p>
            </div>

            <div className="text-center">
                <button 
                    onClick={handlePayment}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
                >
                    Thanh Toán
                </button>
            </div>
        </div>
    );
}

export default BookingDetail;