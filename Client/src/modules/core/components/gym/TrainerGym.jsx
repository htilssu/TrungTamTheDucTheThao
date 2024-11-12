import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination} from 'swiper/modules';

const trainersData = [
    {
        image: "avatarT.png",
        name: "Nguyễn Anh Tuấn",
        experience: "5 năm kinh nghiệm",
        rating: 5,
        strengths: "Tăng cơ, giảm mỡ",
    },
    {
        image: "avatarH.png",
        name: "Trần Thị B",
        experience: "3 năm kinh nghiệm",
        rating: 4,
        strengths: "Yoga, thể hình nữ",
    },
    {
        image: "avatarH.png",
        name: "Lê Hoàng C",
        experience: "8 năm kinh nghiệm",
        rating: 5,
        strengths: "Thể hình, dinh dưỡng",
    },
    {
        image: "avatarT.png",
        name: "Lê Hoàng C",
        experience: "8 năm kinh nghiệm",
        rating: 5,
        strengths: "Thể hình, dinh dưỡng",
    },
    {
        image: "avatarH.png",
        name: "Lê Hoàng C",
        experience: "8 năm kinh nghiệm",
        rating: 5,
        strengths: "Thể hình, dinh dưỡng",
    },
];

const PTCard = ({ image, name, experience, rating, strengths }) => (
    <div className="bg-white p-6 shadow-md rounded-lg text-center">
        <img src={image} alt={`Portrait of ${name}, personal trainer`} className="rounded-full w-24 h-24 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p>{experience}</p>
        <div className="flex justify-center mt-2">
            <span className="text-yellow-400">{'★'.repeat(rating)}</span>
            <span className="text-gray-400">{'★'.repeat(5 - rating)}</span>
        </div>
        <p className="mt-4">Điểm mạnh: {strengths}</p>
    </div>
);

const TrainerGym = () => (
    <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Đội Ngũ Huấn Luyện Viên (PT)</h2>

            {/* Swiper Component */}
            <Swiper
                spaceBetween={24}
                slidesPerView={1} // Hiển thị 1 thẻ trên màn hình nhỏ
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4, // Hiển thị 3 thẻ trên màn hình lớn
                    },
                }}
                pagination={{ clickable: true }} // Bật chế độ phân trang
                navigation // Thêm nút điều hướng
                modules={[Navigation, Pagination]}
            >
                {trainersData.map((trainer, index) => (
                    <SwiperSlide key={index}>
                        <PTCard
                            image={trainer.image}
                            name={trainer.name}
                            experience={trainer.experience}
                            rating={trainer.rating}
                            strengths={trainer.strengths}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </section>
);

export default TrainerGym;
