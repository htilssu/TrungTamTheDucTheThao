import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './SliderBanner.css';
import {useState} from 'react';

const SliderBanner = () => {
  const [direction, setDirection] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
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
      if (next === 0 && currentSlide === 4 || next === 4 && currentSlide === 0) {
        setDirection(true);
      }
      setCurrentSlide(next);
    },
    rtl: !direction,
  };

  return (
      <div className="slider-container w-[100%] max-w-7xl m-auto  ">
        <Slider {...settings}>
          <div className="slide-item">
            <img src="https://aobongda.net/pic/Images/Module/News/images/t35.jpg" alt="Slide 1"/>
            <div className="slide-caption"></div>
          </div>
          <div className="slide-item">
            <img src="https://aobongda.net/pic/Images/Module/News/images/t21.jpg" alt="Slide 2"/>
            <div className="slide-caption"></div>
          </div>
          <div className="slide-item">
            <img src="https://aobongda.net/pic/Images/Module/News/images/t27.jpg" alt="Slide 3"/>
            <div className="slide-caption"></div>
          </div>
          <div className="slide-item">
            <img src="https://aobongda.net/pic/Images/Module/News/images/t28.jpg" alt="Slide 4"/>
            <div className="slide-caption"></div>
          </div>
          <div className="slide-item">
            <img src="https://aobongda.net/pic/Images/Module/News/images/t26.jpg" alt="Slide 5"/>
            <div className="slide-caption"></div>
          </div>
        </Slider>
      </div>
  );
};

export default SliderBanner;


  
