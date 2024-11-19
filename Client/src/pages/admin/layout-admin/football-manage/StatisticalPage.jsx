import BookingStatistics from "./component/BookingStatistics.jsx";
import RevenueChart1 from "./component/RevenueChart1.jsx";

const StatisticalPage = () => {
    return (
        <div className={"max-w-7xl mx-auto"}>
            <div>
                <BookingStatistics/>
            </div>
            <div>
                <RevenueChart1/>
            </div>
        </div>
    );
}

export default StatisticalPage;
