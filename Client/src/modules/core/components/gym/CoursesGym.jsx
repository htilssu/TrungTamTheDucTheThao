const coursesData = [
    {
        title: "Khóa Tăng Cơ",
        description: "Chương trình 3 tháng giúp bạn tăng cường cơ bắp với lộ trình tập luyện chuyên nghiệp.",
        originalPrice: "3,000,000đ",
        discountedPrice: "2,500,000đ",
        duration: "3 tháng",
        backgroundImage: "url('/gym6.png')", // Thay bằng đường dẫn ảnh thực tế
        buttonText: "Tham gia ngay",
        buttonAction: () => alert("Đăng ký khóa Tăng Cơ"),
    },
    {
        title: "Khóa Giảm Cân",
        description: "Khóa tập luyện 2 tháng kết hợp chế độ ăn uống lành mạnh và tập cardio.",
        originalPrice: "2,500,000đ",
        discountedPrice: "2,000,000đ",
        duration: "2 tháng",
        backgroundImage: "url('/gym7.png')",
        buttonText: "Tham gia ngay",
        buttonAction: () => alert("Đăng ký khóa Giảm Cân"),
    },
    {
        title: "Khóa Yoga",
        description: "Khóa yoga giúp cải thiện tinh thần và cơ thể với giáo viên chuyên nghiệp.",
        originalPrice: "2,200,000đ",
        discountedPrice: "1,800,000đ",
        duration: "1 tháng",
        backgroundImage: "url('/gym1.png')",
        buttonText: "Tham gia ngay",
        buttonAction: () => alert("Đăng ký khóa Yoga"),
    },
];

const CourseCard = ({ title, description, originalPrice, discountedPrice, duration, backgroundImage, buttonText, buttonAction }) => (
    <div
        className="relative bg-cover bg-center text-gray-900 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105"
        style={{ backgroundImage }}
    >
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
            <div className={"flex justify-center items-center"}>
                <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
            </div>
            <p className="mb-4 text-white">{description}</p>
            <div className="text-white mb-4">
                <p className="line-through text-red-300">{originalPrice}</p>
                <p className="font-bold">{discountedPrice}</p>
                <p className="italic">Thời gian: {duration}</p>
            </div>
            <div className={"flex justify-center items-center w-full"}>
                <button
                    onClick={buttonAction}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    </div>
);

const CoursesGym = () => (
    <section className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Các Khóa Tập Luyện</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coursesData.map((course, index) => (
                    <CourseCard
                        key={index}
                        title={course.title}
                        description={course.description}
                        originalPrice={course.originalPrice}
                        discountedPrice={course.discountedPrice}
                        duration={course.duration}
                        backgroundImage={course.backgroundImage}
                        buttonText={course.buttonText}
                        buttonAction={course.buttonAction}
                    />
                ))}
            </div>
        </div>
    </section>
);

export default CoursesGym;
