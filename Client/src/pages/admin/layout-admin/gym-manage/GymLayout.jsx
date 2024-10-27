import { useState, useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import '../../../home/components/SliderBanner.css';

const GymLayout = () => {
    const slides = [
        { image: 'gym-thumbnail1.png', name: 'SPORT CENTER', description: 'Tinh ru anh hieu di chay pho, chua kip chay pho thi anhchay mat tieu' },
        { image: 'gym-thumbnail2.png', name: 'SPORT CENTER', description: 'Tinh ru anh toan di chay pho, chua kip chay pho thi anhchay mat tieu' },
        { image: 'sym-thumbnail1.png', name: 'SPORT CENTER', description: 'Tinh ru anh tuan di chay pho, chua kip chay pho thi anhchay mat tieu' },
        { image: 'soccer-thumbnail1.png', name: 'SPORT CENTER', description: 'Tinh ru anh di nghia di chay pho, chua kip chay pho thi anhchay mat tieu' },
        { image: 'soccer-thumbnail2.png', name: 'SPORT CENTER', description: 'Tinh ru anh tai di chay pho, chua kip chay pho thi anhchay mat tieu' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef(null);

    const nextSlide = () => {
        const lists = slideRef.current.children;
        if (lists.length > 0) {
            setCurrentIndex((currentIndex + 1) % slides.length);
            slideRef.current.appendChild(lists[0]);
        }
    };

    const prevSlide = () => {
        const lists = slideRef.current.children;
        if (lists.length > 0) {
            setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
            slideRef.current.prepend(lists[lists.length - 1]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center mt-10">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[600px] p-[50px] bg-[#f5f5f5] shadow-[0_30px_50px_rgba(219,219,219,1)] mt-[38px]">
                <div id="sw-max mt-[50px]" ref={slideRef}>
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`slide-element ${index === currentIndex ? 'visible' : ''}`}
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="slide-info">
                                <div className="slide-title">{slide.name}</div>
                                <div className="slide-detail">{slide.description}</div>
                                <button className="bg-transparent text-white border-2 border-white hover:text-black hover:bg-white transition duration-300">
                                    See more
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-8 z-50 text-center w-full">
                    <button 
                        className="group flex items-center justify-center w-12 h-12 rounded-full border border-white bg-transparent transition duration-500 hover:bg-white cursor-pointer" 
                        id="prev" 
                        onClick={prevSlide}
                    >
                        <FaAngleLeft className="text-white text-xl group-hover:text-black transition duration-500" />
                    </button>
                    <button 
                        className="group flex items-center justify-center w-12 h-12 rounded-full border border-white bg-transparent transition duration-500 hover:bg-white cursor-pointer" 
                        id="next" 
                        onClick={nextSlide}
                    >
                        <FaAngleRight className="text-white text-xl group-hover:text-black transition duration-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GymLayout;
