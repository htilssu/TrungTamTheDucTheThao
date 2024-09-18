import FeatureCategory from "../modules/core/components/home/FeatureCategory.jsx";
import ScrollableCardList from "../modules/core/components/home/ScrollableCardList.jsx";

const Home = () => {
  return (
    <div className="p-8 text-center bg-gray-100 min-h-screen">
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
