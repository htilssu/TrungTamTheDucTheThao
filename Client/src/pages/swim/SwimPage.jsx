import { FaSwimmingPool, FaShieldAlt, FaConciergeBell } from 'react-icons/fa'; 
import { FaHandHoldingUsd } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './swim.css';

const SwimPage = () => {
    const pools = [
        { 
            name: "Hồ bơi 1", 
            image: "hoboi1.jpg" 
        },
        { 
            name: "Hồ bơi 2", 
            image: "hoboi2.jpg" 
        },
        { 
            name: "Hồ bơi 3", 
            image: "hoboi3.jpg" 
        },
        { 
            name: "Hồ bơi 4", 
            image: "hoboi4.jpg" 
        },
        { 
            name: "Hồ bơi 5", 
            image: "hoboi5.jpg" 
        }
    ];

    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const handleClick = () => {
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            navigate('/booking-swim');
        }, 2000);
    };

    const handleClickBooking = () => {
        navigate('/booking-swim');
    };

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="relative mt-20">
                <div className="absolute inset-0 bg-black/60"></div>
                <img
                    src="hoboi.jpg"
                    alt="Swimming Pool"
                    className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="fixed bottom-9 right-16 z-50">
                    <button
                        onClick={handleClickBooking}
                        className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden text-white bg-gradient-to-r from-blue-500 to-teal-500 rounded-full shadow-lg transition duration-300 group hover:animate-wobble"
                    >
                        <span className="absolute inset-0 w-full h-full bg-blue-400 opacity-50 rounded-full transform scale-0 transition-transform duration-500 ease-out group-hover:scale-150"></span>
                        <span className="relative z-10">Đặt Vé Ngay</span>
                    </button>
                </div>
                    <div className="text-white">
                        <h1 className="text-5xl font-bold mb-4">Hồ Bơi Cao Cấp</h1>
                        <p className="text-xl mb-8">Trải nghiệm không gian thư giãn tuyệt vời</p>
                        <button 
                            className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden text-white bg-blue-600 border border-transparent rounded-full group transition duration-300"
                            onClick={handleClick}
                        >
                            <span className="absolute inset-0 w-full h-full bg-blue-700 transform scale-0 transition-transform duration-300 ease-in-out group-hover:scale-125"></span>
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-300 to-blue-600 opacity-60 blur-md group-hover:opacity-100 group-hover:animate-pulse"></span>

                            <span className="relative z-10 flex items-center">
                                {submitted ? (
                                    <FaHandHoldingUsd className="text-2xl animate-bounce" /> 
                                ) : (
                                    "Đặt ngay"
                                )}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Dịch vụ của chúng tôi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                                <FaSwimmingPool />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Hồ bơi riêng tư</h3>
                            <p className="text-gray-600">Không gian riêng tư, sang trọng dành cho bạn và gia đình</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                                <FaShieldAlt />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">An toàn tuyệt đối</h3>
                            <p className="text-gray-600">Đội ngũ cứu hộ chuyên nghiệp, hệ thống lọc nước hiện đại</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                                <FaConciergeBell />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Tiện nghi đầy đủ</h3>
                            <p className="text-gray-600">Phòng thay đồ, nhà tắm, cafe, đồ ăn nhẹ</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
                        Không Gian Hồ Bơi
                    </h2>
                    <div className="flex justify-center items-center my-[10vmin] transform skew-x-[5deg] px-4 md:px-0 mx-5">
                        {pools.map((pool, index) => (
                            <div 
                                key={index} 
                                className={`w-[200px] transition-all duration-1000 ease-in-out h-[50vmin] relative ${index !== pools.length - 1 ? 'mr-4' : ''} hover:flex-grow-[10] group`}
                            >
                                <img 
                                    src={pool.image} 
                                    alt={pool.name}
                                    className="w-full h-full object-cover transition-all duration-1000 ease-in-out grayscale group-hover:grayscale-0"
                                />
                                <div 
                                    className="absolute bottom-0 left-10 min-w-full bg-blue-400 bg-opacity-75 text-black p-2 -rotate-90 origin-bottom-left transition-all duration-500 ease-in-out text-center text-base whitespace-nowrap
                                        group-hover:rotate-0 group-hover:top-[calc(100%-2em)] group-hover:bg-black group-hover:bg-opacity-50 group-hover:text-white group-hover:text-2xl group-hover:left-0 group-hover:-skew-x-[1deg]"
                                >
                                    {pool.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Bảng giá</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Price Card 1 */}
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold mb-4">Gói Cơ Bản</h3>
                            <div className="text-4xl font-bold mb-4">200.000đ</div>
                            <p className="text-gray-600 mb-6">2 giờ sử dụng</p>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                                Chọn gói
                            </button>
                        </div>

                        {/* Price Card 2 */}
                        <div className="bg-blue-600 text-white p-8 rounded-lg shadow-lg text-center transform scale-105">
                            <h3 className="text-xl font-semibold mb-4">Gói Phổ Biến</h3>
                            <div className="text-4xl font-bold mb-4">500.000đ</div>
                            <p className="mb-6">6 giờ sử dụng</p>
                            <button className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-gray-100 transition">
                                Chọn gói
                            </button>
                        </div>

                        {/* Price Card 3 */}
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold mb-4">Gói VIP</h3>
                            <div className="text-4xl font-bold mb-4">1.000.000đ</div>
                            <p className="text-gray-600 mb-6">Cả ngày</p>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                                Chọn gói
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Huấn Luyện Viên Section */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
                        Đội Ngũ Huấn Luyện Viên
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            {
                                name: "Nguyễn Văn A",
                                title: "Chuyên Gia Bơi Chuyên Nghiệp",
                                image: "https://via.placeholder.com/300"
                            },
                            {
                                name: "Trần Thị B",
                                title: "Huấn Luyện Viên Quốc Gia",
                                image: "https://via.placeholder.com/300"
                            },
                            // Thêm nhiều HLV khác
                        ].map((trainer, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl overflow-hidden shadow-lg text-center"
                            >
                                <img
                                    src={trainer.image}
                                    alt={trainer.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-bold text-xl">{trainer.name}</h3>
                                    <p className="text-gray-600">{trainer.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Khóa Học Bơi Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
                        Khóa Học Bơi
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Bơi Cơ Bản",
                                level: "Dành cho người mới",
                                price: "1.500.000đ",
                                duration: "1 tháng"
                            },
                            {
                                title: "Bơi Nâng Cao",
                                level: "Cho người đã biết bơi",
                                price: "2.000.000đ",
                                duration: "2 tháng"
                            },
                            {
                                title: "Bơi Chuyên Nghiệp",
                                level: "Đào tạo thi đấu",
                                price: "3.000.000đ",
                                duration: "3 tháng"
                            }
                        ].map((course, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition"
                            >
                                <h3 className="text-2xl font-bold mb-4 text-blue-700">
                                    {course.title}
                                </h3>
                                <p className="text-gray-600 mb-2">{course.level}</p>
                                <p className="text-3xl font-bold text-green-600 mb-4">
                                    {course.price}
                                </p>
                                <p className="text-gray-500">Thời gian: {course.duration}</p>
                                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700">
                                    Đăng Ký Ngay
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SwimPage;