import ScrollableCardList from './components/ScrollableCardList.jsx';
import FeatureCategory from './components/FeatureCategory.jsx';
import SportNews from "./components/SportNews.jsx";

const Home = () => {
    return (
        <div className="w-full text-center bg-gray-100 ">
            <div>
                <ScrollableCardList/>
            </div>
            <div>
                <FeatureCategory/>
            </div>
            <div>
                <SportNews/>
            </div>
        </div>
    );
};

export default Home;
