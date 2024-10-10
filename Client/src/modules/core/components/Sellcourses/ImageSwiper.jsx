// ImageSwiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const ImageSwiper = ({ images, editingMode, handleDeleteImage, sliderSettings }) => {
    return (
        <div className="w-full h-[360px] overflow-hidden rounded-lg mb-4 relative">
            {images.length > 1 ? (
                <Swiper
                    {...sliderSettings}
                    spaceBetween={1}
                    slidesPerView={1}
                    navigation={false}
                    autoplay={{ delay: 3000 }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        300: { slidesPerView: 1, spaceBetween: 16 },
                    }}
                    modules={[Navigation, Pagination, Autoplay]}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index} className="relative flex justify-center items-center h-80">
                            <img
                                src={image}
                                alt={`slide-${index}`}
                                className="w-full h-80 object-contain mb-8"
                            />
                            {editingMode && (
                                <button
                                    type="button"
                                    onClick={() => handleDeleteImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 z-10 flex items-center justify-center w-8 h-8"
                                >
                                    X
                                </button>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="relative">
                    <img
                        src={images[0]}
                        alt="banner"
                        className="w-full h-80 object-contain rounded-lg"
                    />
                    {editingMode && (
                        <button
                            type="button"
                            onClick={() => handleDeleteImage(0)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 z-10"
                        >
                            X
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageSwiper;
