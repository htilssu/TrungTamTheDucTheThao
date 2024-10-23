import SocialLinks from './SocialLinks';

const ContactInfo = () => {
    return (
        <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 mb-8 rounded-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Thông Tin Liên Lạc</h2>
            <div className="flex flex-col md:flex-row items-start justify-between">
                <div className="w-full md:w-3/4 space-y-3">
                    <p>
                        <strong className="font-semibold">Tên công ty:</strong> Thể Dục Thể Thao Ngộ Không
                    </p>
                    <p>
                        <strong className="font-semibold">Địa chỉ:</strong> 806 QL22, ấp Mỹ Hoà 3, Hóc Môn, Hồ Chí Minh, Việt Nam
                    </p>
                    <p>
                        <strong className="font-semibold">Số điện thoại:</strong>
                        <a href="tel:+84909123456" className="text-blue-600 hover:text-blue-800 transition-colors"> 0909 123 8386</a>
                    </p>
                    <p>
                        <strong className="font-semibold">Email:</strong>
                        <a href="mailto:tuananh28@theduc.com" className="text-blue-600 hover:text-blue-800 transition-colors"> tuananh28@theduc.com</a>
                    </p>
                    <p className="flex items-center mt-6">
                        <strong className="font-semibold">Giờ làm việc:</strong>
                        <span className="text-gray-600 ml-2">Thứ 2 - Thứ 6</span>
                        <span className="text-neutral-950 ml-2">9:00 AM - 6:00 PM</span>
                    </p>
                </div>
                <div className="w-full md:w-1/4 flex justify-center md:ml-4">
                    <img src="/contactus.png" alt="logo" className="rounded-full w-40 h-40 md:w-60 md:h-40 shadow-md" />
                </div>
            </div>
            <div className="bg-green-50 rounded-lg p-6 mt-6">
                <p className="text-gray-800">
                    <SocialLinks />
                </p>
            </div>
        </div>
    );
};

export default ContactInfo;
