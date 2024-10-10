import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './SliderBanner.css';
import { useState, useRef } from 'react';

const SliderBanner = () => {
  const [direction, setDirection] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null); // Thêm useRef để lấy tham chiếu của slider

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fade: true,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
    rtl: !direction,
  };

  // Hàm để chuyển slide trước và sau
  const goToPrevious = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className="slider-container relative">
      <button className="prev-button" onClick={goToPrevious}>
        &#8592;
      </button>
      <button className="next-button" onClick={goToNext}>
        &#8594;
      </button>
      <Slider ref={sliderRef} {...settings}>
        <div className="slide-item">
          <img src="" alt="Slide 1" />
          <div className="slide-caption">
            <h2 className="slide-text">I am ...</h2>
          </div>
        </div>
        <div className="slide-item">
          <img src="" alt="Slide 2" />
          <div className="slide-caption">
            <h2 className="slide-text">Cristiano Ronaldo...</h2>
          </div>
        </div>
        <div className="slide-item">
          <img src="" alt="Slide 3" />
          <div className="slide-caption">
            <h2 className="slide-text">Siuuuuuuuuuuuuuuuuuu....</h2>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default SliderBanner;
