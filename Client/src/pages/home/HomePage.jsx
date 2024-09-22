import ScrollableCardList from '../../modules/core/components/home/ScrollableCardList.jsx';
import FeatureCategory from '../../modules/core/components/home/FeatureCategory.jsx';
import SliderBanner from './components/SliderBanner.jsx';

const Home = () => {
  return (
      <div className=" sm:p-8 text-center bg-gray-100 ">
        <div>
          <SliderBanner/>
        </div>
        {/* <div>
          <ScrollableCardList/>
        </div>
        <div>
          <FeatureCategory/>
        </div> */}
      </div>
  );
};

export default Home;
