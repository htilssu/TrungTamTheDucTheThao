import OverviewPage from "./OverviewPage.jsx";
import SoccerChart from "../layout-admin/statistics-manage/SoccerChart.jsx";

const HomeAdminLayout = () => {
    return (
        <div>
            <div className="min-h-screen bg-gray-100 p-6">
                <div>
                    {/*Chia nhỏ Component rồi vào đây để dễ quản lý không code quá nhiều trong Layout này.*/}
                    <OverviewPage/>
                    <SoccerChart/>
                </div>
            </div>
        </div>
    );
};

export default HomeAdminLayout;