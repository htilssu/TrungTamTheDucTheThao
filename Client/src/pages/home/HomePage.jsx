import ScrollableCardList from "../../modules/core/components/home/ScrollableCardList.jsx";
import FeatureCategory from "../../modules/core/components/home/FeatureCategory.jsx";
import SliderBanner from "./components/SliderBanner.jsx";

const Home = () => {
  return (
    <div className="p-2 sm:p-8 text-center bg-gray-100 min-h-screen">
        <SliderBanner/>
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
