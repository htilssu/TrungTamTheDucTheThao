
import PricingTable from "./PricingTableSoocer.jsx";
import {ScrollRestoration, useNavigate} from "react-router-dom";

// Các ảnh mẫu về sân bóng
const soccerFieldImages = [
    '/sanbong1.png',
    '/sanbong2.png',
    '/sanbong3.png',
    '/sanbong4.png',
    '/sanbong2.png',
    '/sanbong3.png',
];

const SoocerFieldInfo = () => {
    const navigate = useNavigate();

    const handleRentYard = () => {
        // Điều hướng đến trang thuê sân bóng
        navigate('/soocer/rent-yard');
    };

    return (
        <div>
            <div className="relative bg-gray-50 min-h-screen mb-16">
                {/* Banner Image Section */}
                <div className="relative h-96 overflow-hidden bg-gray-800">
                    <img
                        src="/backgroundcr7.png"
                        alt="Sân bóng đá Dốc Sỏi"
                        className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white">
                            Sân bóng đá mini cỏ nhân tạo Tuấn Anh 28
                        </h1>
                    </div>
                </div>

                {/* Giới thiệu về dịch vụ */}
                <section className="bg-white p-8">
                    <div className="container mx-auto">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Giới thiệu về dịch vụ</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-gray-700 leading-7 mb-4">
                                    Sân bóng đá cỏ nhân tạo Dốc Sỏi được QISC đầu tư từ năm 2014 với 03 sân bóng mini 5
                                    người và 1
                                    sân bóng 7 người, được quản lý bởi Xí nghiệp Duy tu bảo dưỡng công trình. Hệ thống
                                    sân bóng đá
                                    được đầu tư xây dựng hiện đại, đáp ứng các tiêu chuẩn công nghệ của Châu Âu. Cỏ nhân
                                    tạo được
                                    nhập khẩu từ Ý và Mỹ với những ưu thế như mềm, độ nẩy thấp, cỏ được trám đều đảm bảo
                                    độ chuẩn
                                    xác của đường chuyền, lăn.
                                </p>
                                <p className="text-gray-700 leading-7 mb-4">
                                    Hệ thống đèn chiếu sáng chuyên dụng, cung cấp đầy đủ ánh sáng cho các trận bóng sôi
                                    động và hào
                                    hứng mỗi đêm. Không gian sân bóng rộng rãi, thoáng đãng. Có bãi đỗ xe ô tô và xe máy
                                    rộng rãi,
                                    mát mẻ, an toàn. Bên cạnh đó còn có căng tin cung cấp dịch vụ phục vụ nước giải
                                    khát, vui chơi
                                    giải trí cho các khách hàng trước và sau khi chơi bóng.
                                </p>
                            </div>
                            {/* Ảnh mẫu sân bóng */}
                            <div className="grid grid-cols-3 gap-4">
                                {soccerFieldImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Sân bóng ${index + 1}`}
                                        className="rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-md mt-8">
                            <p className="font-bold">Sân bóng đá mini cỏ nhân tạo Tuấn Anh 28</p>
                            <p>Đ/c: 28, Đường 28, Phường 1, Quận 1, Tp HCM</p>
                            <p className={"text-red-500"}>Số điện thoại: 0935 453 217</p>
                        </div>
                    </div>
                </section>

                {/* Bảng giá thuê sân */}
                <div className="container mx-auto">
                    <PricingTable/>
                </div>

                {/* Nút đặt sân */}
                <div className="fixed bottom-8 right-16">
                    <button
                        onClick={handleRentYard}
                        className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full shadow-xl
                   hover:from-green-500 hover:to-blue-600 transition-all duration-300 focus:outline-none
                   focus:ring-4 focus:ring-blue-300 focus:ring-offset-2
                   animate-bounce" // Hiệu ứng bật nhảy liên tục
                    >
                        Đặt Sân Ngay
                    </button>
                </div>
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default SoocerFieldInfo;
