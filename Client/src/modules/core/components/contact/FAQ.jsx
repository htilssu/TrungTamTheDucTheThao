import { Link } from "react-router-dom";

const FAQ = () => {
    return (
        <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 mb-8 rounded-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Câu Hỏi Thường Gặp (FAQ)</h2>
            <div className="flex flex-col md:flex-row items-start">
                <div className="w-full md:w-1/4 flex justify-center">
                    <img src="/question.png" alt="FAQ" className="rounded-full w-40 h-40 md:w-52 md:h-52 shadow-md"/>
                </div>
                <div className="w-full md:w-3/4">
                    <div className="bg-gray-100 p-4 rounded-lg mb-4 transition-transform transform hover:scale-105">
                        <h3 className="font-semibold text-lg text-gray-900">1. Làm sao để đăng ký thành viên?</h3>
                        <p className="text-gray-700">
                            Bạn có thể đăng ký thành viên trực tiếp ngay
                            <Link to="/sign-up"
                                  className="text-green-500 hover:text-green-600 font-semibold transition-colors ml-1">
                                "Đăng ký"
                            </Link>.
                        </p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mb-4 transition-transform transform hover:scale-105">
                        <h3 className="font-semibold text-lg text-gray-900">2. Tôi có thể thay đổi giờ tập luyện
                            không?</h3>
                        <p className="text-gray-700">
                            Chúng tôi luôn hỗ trợ khách hàng thay đổi giờ tập phù hợp với nhu cầu của mình.
                        </p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mb-4 transition-transform transform hover:scale-105">
                        <h3 className="font-semibold text-lg text-gray-900">4. Tôi có thể hợp tác với bạn không?</h3>
                        <p className="text-gray-700">
                            Bạn có thể đăng ký CTV trực tiếp trên trang web của chúng tôi bằng cách nhấn vào nút
                            <Link to="/sign-up"
                                  className="text-green-500 hover:text-green-600 font-semibold transition-colors ml-1">
                                "Đăng ký"
                            </Link>.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FAQ;
