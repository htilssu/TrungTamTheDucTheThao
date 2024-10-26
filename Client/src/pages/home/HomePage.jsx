import ScrollableCardList from './components/ScrollableCardList.jsx';
import FeatureCategory from './components/FeatureCategory.jsx';
import SliderBanner from './components/SliderBanner.jsx';
import Banner from './components/Banner';

const Home = () => {
  return (
      <div className=" sm:p-8 text-center bg-gray-100 ">
        <div>
          <Banner/>
        </div>
        <div>
          <SliderBanner/>
        </div>
        <div>
          <ScrollableCardList/>
        </div>
        <div>
          <FeatureCategory/>
        </div>
      </div>
  );
};

export default Home;
