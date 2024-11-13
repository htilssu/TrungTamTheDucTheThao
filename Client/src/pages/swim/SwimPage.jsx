const SwimPage = () => {

    const pools = [
        { 
            name: "Hồ bơi 1", 
            image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7" 
        },
        { 
            name: "Hồ bơi 2", 
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba" 
        },
        { 
            name: "Hồ bơi 3", 
            image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d" 
        },
        { 
            name: "Hồ bơi 4", 
            image: "https://images.unsplash.com/photo-1590785855011-59054669ef0f" 
        },
        { 
            name: "Hồ bơi 5", 
            image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7" 
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <div className="relative mt-20">
                <div className="absolute inset-0 bg-black/50"></div>
                <img
                    src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Swimming Pool"
                    className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div className="text-white">
                        <h1 className="text-5xl font-bold mb-4">Hồ Bơi Cao Cấp</h1>
                        <p className="text-xl mb-8">Trải nghiệm không gian thư giãn tuyệt vời</p>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition">
                            Đặt ngay
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
                            <div className="text-blue-600 text-4xl mb-4">
                                <i className="fas fa-swimming-pool"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Hồ bơi riêng tư</h3>
                            <p className="text-gray-600">Không gian riêng tư, sang trọng dành cho bạn và gia đình</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="text-blue-600 text-4xl mb-4">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">An toàn tuyệt đối</h3>
                            <p className="text-gray-600">Đội ngũ cứu hộ chuyên nghiệp, hệ thống lọc nước hiện đại</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="text-blue-600 text-4xl mb-4">
                                <i className="fas fa-concierge-bell"></i>
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            "",
                            "",
                            "",
                            "",
                        ].map((img, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
                            >
                                <img
                                    src={img}
                                    alt={`Pool Image ${index + 1}`}
                                    className="w-full h-64 object-cover"
                                />
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
                                image: ""
                            },
                            {
                                name: "Trần Thị B",
                                title: "Huấn Luyện Viên Quốc Gia",
                                image: ""
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
            

            <div className="flex justify-center items-center my-[10vmin] transform skew-x-[5deg]">
            {pools.map((pool, index) => (
                <div 
                    key={index} 
                    className={`
                        flex-1 
                        transition-all 
                        duration-1000 
                        ease-in-out 
                        h-[75vmin] 
                        relative 
                        ${index !== pools.length - 1 ? 'mr-4' : ''}
                        hover:flex-grow-[10]
                        group
                    `}
                >
                    <img 
                        src={pool.image} 
                        alt={pool.name}
                        className="
                            w-full 
                            h-full 
                            object-cover 
                            transition-all 
                            duration-1000 
                            ease-in-out 
                            grayscale 
                            group-hover:grayscale-0
                        "
                    />
                    <div 
                        className="
                            absolute 
                            bottom-0 
                            left-0 
                            min-w-full 
                            bg-pink-500 
                            bg-opacity-75 
                            text-black 
                            p-2 
                            -rotate-90 
                            origin-bottom-left 
                            transition-all 
                            duration-500 
                            ease-in-out 
                            text-center 
                            text-base 
                            whitespace-nowrap

                            group-hover:rotate-0 
                            group-hover:top-[calc(100%-2em)] 
                            group-hover:bg-black 
                            group-hover:bg-opacity-50 
                            group-hover:text-white 
                            group-hover:text-2xl 
                            group-hover:-skew-x-[5deg]
                        "
                    >
                        {pool.name}
                    </div>
                </div>
            ))}
        </div>
        </div>

        
    );
}

export default SwimPage;

