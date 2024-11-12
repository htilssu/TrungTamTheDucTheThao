import CoursesGym from "./CoursesGym.jsx";
import TrainerGym from "./TrainerGym.jsx";
import PriceGym from "./PriceGym.jsx";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa"; // Import icon để dùng cho số điện thoại và địa chỉ

// Component Giới thiệu
const Introduction = () => (
    <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-10 text-center">Giới Thiệu Về Phòng Tập GYM</h2>
            <div className="flex flex-col md:flex-row gap-10">
                {/* Phần giới thiệu văn bản */}
                <div className="md:w-1/2">
                    <p className="text-lg mb-4 leading-relaxed">
                        Phòng tập Gym XYZ là nơi lý tưởng để bạn rèn luyện sức khỏe và thể lực với hệ thống trang thiết bị hiện đại, không gian thoáng mát và đội ngũ PT giàu kinh nghiệm.
                    </p>
                    <p className="text-lg mb-6 leading-relaxed">
                        Chúng tôi cung cấp các dịch vụ chất lượng với môi trường thân thiện, sạch sẽ và đạt chuẩn quốc tế, giúp bạn đạt được mục tiêu thể hình mong muốn.
                    </p>

                    {/* Thông tin liên hệ */}
                    <div className="mt-6">
                        <div className="flex items-center mb-4">
                            <FaPhoneAlt className="text-blue-400 mr-3" />
                            <span className="text-lg font-semibold">Liên hệ: <a href="tel:+84987654321" className="hover:underline">+84 987 654 321</a></span>
                        </div>
                        <div className="flex items-center">
                            <FaMapMarkerAlt className="text-red-400 mr-3" />
                            <span className="text-lg font-semibold">Địa chỉ: 123 Đường ABC, Phường XYZ, Quận 1, TP. HCM</span>
                        </div>
                    </div>
                </div>

                {/* Hình ảnh phòng tập */}
                <div className="md:w-1/2">
                    <img
                        src="/gym2.png"
                        alt="Phòng tập"
                        className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </div>
        </div>
    </section>
);
// Component Cơ sở vật chất
const Facilities = () => (
    <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Cơ Sở Vật Chất</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <img
                        src="/gym3.png"
                        alt="Thiết bị hiện đại"
                        className="rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">Thiết bị hiện đại</h3>
                    <p>Phòng tập trang bị máy móc tân tiến, giúp bạn có thể tập luyện đầy đủ các nhóm cơ và bài tập.</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <img
                        src="/gym1.png"
                        alt="Không gian rộng rãi"
                        className="rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">Không gian rộng rãi</h3>
                    <p>Không gian rộng, sạch sẽ và thoáng mát, tạo cảm giác thoải mái khi tập luyện.</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <img
                        src="/gym5.png"
                        alt="Phòng tắm và tủ đồ"
                        className="rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">Phòng tắm và tủ đồ</h3>
                    <p>Có phòng tắm, khu vực thay đồ và tủ đồ an toàn cho tất cả hội viên.</p>
                </div>
            </div>
        </div>
    </section>
);

// Component chính
const GymPage = () => (
    <div>
        <Introduction />
        <Facilities />
        <PriceGym />
        <TrainerGym />
        <CoursesGym />
    </div>
);

export default GymPage;