import { useEffect } from "react";
import { wGet } from "../../../../../utils/request.util.js";

const RevenueChart1 = () => {


    useEffect(() => {
        // Fetch dữ liệu từ API
        wGet("/v1/booking-field/statistics/last7days?status=COMPLETED")


            .catch((error) => {
                console.error("Error fetching revenue data:", error);

            });
    }, []);



    // Render biểu đồ nếu dữ liệu hợp lệ
    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-6">Revenue for Last 7 Days</h2>

        </div>
    );
};

export default RevenueChart1;
