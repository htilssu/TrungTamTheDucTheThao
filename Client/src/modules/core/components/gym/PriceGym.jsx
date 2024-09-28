// Component Bảng giá
const packagesData = [
    {
        title: "Gói 1 tháng",
        price: "800.000 VND",
        promotion: "Giảm ngay 10% khi đăng ký lần thứ 2!",
        buttonText: "Đăng ký ngay",
        buttonAction: () => alert("Đăng ký Gói 1 tháng"),
    },
    {
        title: "Gói 3 tháng",
        price: "2.200.000 VND",
        promotion: "Tặng thêm 1 tuần tập luyện miễn phí!",
        buttonText: "Đăng ký ngay",
        buttonAction: () => alert("Đăng ký Gói 3 tháng"),
    },
    {
        title: "Gói 6 tháng",
        price: "4.000.000 VND",
        promotion: "Giảm 15% và tặng 1 tháng miễn phí!",
        buttonText: "Đăng ký ngay",
        buttonAction: () => alert("Đăng ký Gói 6 tháng"),
    },
    {
        title: "Gói 12 tháng",
        price: "7.000.000 VND",
        promotion: "Giảm 15% và tặng 2 tháng miễn phí!",
        buttonText: "Đăng ký ngay",
        buttonAction: () => alert("Đăng ký Gói 1 năm"),
    },
    {
        title: "Gói 15 tháng",
        price: "9.000.000 VND",
        promotion: "Giảm 20% và tặng 2 tháng miễn phí!",
        buttonText: "Đăng ký ngay",
        buttonAction: () => alert("Đăng ký Gói 6 tháng"),
    },
];
const PackageCard = ({ title, price, promotion, buttonText, buttonAction }) => (
    <div className="bg-[url('/gym2.png')] bg-cover bg-no-repeat rounded-lg h-64 flex items-center justify-center transition-transform transform hover:scale-105 shadow-lg">
        <div className="bg-gray-800 bg-opacity-75 text-white p-6 rounded-lg shadow-md transition-shadow hover:shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">{title}</h3>
            <p className="text-lg mb-2">{price}</p>
            <p className="mb-4">{promotion}</p>
            <div className={"flex justify-center items-center"}>
                <button
                    onClick={buttonAction}
                    className="mt-4 bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500 transition-colors"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    </div>
);

const pricingTableData = [
    { day: "Thứ 2 - Thứ 6", price: "50.000 VND/giờ" },
    { day: "Thứ 7", price: "60.000 VND/giờ" },
    { day: "Chủ Nhật", price: "70.000 VND/giờ" },
];

const PriceGym = () => (
    <section className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Bảng Giá</h2>
            <div className={"mb-10"}>
                <table className="min-w-full bg-white text-gray-900 mb-6 border border-gray-300">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-800 text-white text-center border border-gray-400">Ngày</th>
                        <th className="py-2 px-4 bg-gray-800 text-white text-center border border-gray-400">Giá Giờ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pricingTableData.map(({day, price}, index) => (
                        <tr key={day}>
                            <td className="py-2 px-4 text-center border border-gray-300">{day}</td>
                            <td className="py-2 px-4 text-center border border-gray-300">{price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packagesData.map((pkg) => (
                    <PackageCard
                        key={pkg.title}  // Assuming titles are unique
                        title={pkg.title}
                        price={pkg.price}
                        promotion={pkg.promotion}
                        buttonText={pkg.buttonText}
                        buttonAction={pkg.buttonAction}
                    />
                ))}
            </div>
        </div>
    </section>
);
export default PriceGym;