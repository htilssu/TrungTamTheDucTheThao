import ScrollableCardList from './components/ScrollableCardList.jsx';
import FeatureCategory from './components/FeatureCategory.jsx';
import GymLayout from '../admin/layout-admin/gym-manage/GymLayout.jsx';

const Home = () => {
  return (
      <div className="w-full text-center bg-gray-100 ">
        <div>
          <GymLayout/>
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
