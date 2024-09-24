
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
];
const PTCard = ({ image, name, experience, rating, strengths }) => (
    <div className="bg-white p-6 shadow-md rounded-lg text-center">
        <img src={image} alt={name} className="rounded-full w-24 h-24 mx-auto mb-4" />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trainersData.map((trainer, index) => (
                    <PTCard
                        key={index}
                        image={trainer.image}
                        name={trainer.name}
                        experience={trainer.experience}
                        rating={trainer.rating}
                        strengths={trainer.strengths}
                    />
                ))}
            </div>
        </div>
    </section>
);
export default TrainerGym;