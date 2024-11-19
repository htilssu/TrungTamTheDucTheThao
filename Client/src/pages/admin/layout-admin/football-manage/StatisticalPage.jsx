import BookingStatistics from "./component/BookingStatistics.jsx";
import RevenueChart1 from "./component/RevenueChart1.jsx";

const StatisticalPage = () => {
    return (
        <>
            <div>
                <BookingStatistics/>
            </div>
            <div>
                <RevenueChart1/>
            </div>
        </>
    );
}

export default StatisticalPage;
