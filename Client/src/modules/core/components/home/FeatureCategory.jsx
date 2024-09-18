
const categories = [
    { name: 'Khuyến mãi', imgSrc: 'sale.png' },
    { name: 'Cỏ nhân tạo', imgSrc: 'co-nhan-tao-san-bong.webp' },
    { name: 'Thảm Cầu lông', imgSrc: 'tham-cau-long.webp' },
    { name: 'Dụng cụ cầu lông', imgSrc: 'vot_cau_long.webp' },
    { name: 'Dụng cụ bóng rổ', imgSrc: 'tru-bong-ro.webp' },
    { name: 'Dụng cụ bóng bàn', imgSrc: 'dung-cu-bong-ban.webp' },
    { name: 'Dụng cụ bóng đá', imgSrc: 'bong-da.webp' },
    { name: 'Dụng cụ tennis', imgSrc: 'tenit.webp' },
    { name: 'Giàn tạ đa năng', imgSrc: 'gian-ta-da-nang.webp' },
    { name: 'Dụng cụ võ thuật', imgSrc: 'dung-cu-vo-thuat.webp' },
    { name: 'Máy chạy bộ', imgSrc: 'may-chay-bo.webp' },
    { name: 'Thiết bị dạy học', imgSrc: 'thiet-bi-day-hoc.webp' },
];

const FeaturedCategories = () => {
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Danh Mục Nổi Bật</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                src={category.imgSrc}
                                alt={category.name}
                                className="w-full h-40 object-cover transition-opacity duration-300 group-hover:opacity-80"
                            />
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;
