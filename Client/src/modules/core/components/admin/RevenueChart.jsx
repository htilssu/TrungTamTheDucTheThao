
import { AreaChart } from '@mantine/charts';

export const data = [
    { date: 'Mar 22', "Sân 5": 2890, "Sân 7": 2338, "Sân 11": 2452 },
    { date: 'Mar 23', "Sân 5": 2756, "Sân 7": 2103, "Sân 11": 2402 },
    { date: 'Mar 24', "Sân 5": 3322, "Sân 7": 986, "Sân 11": 1821 },
    { date: 'Mar 25', "Sân 5": 3470, "Sân 7": 2108, "Sân 11": 2809 },
    { date: 'Mar 26', "Sân 5": 3129, "Sân 7": 1726, "Sân 11": 2290 },
];

const RevenueChart = () => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Doanh Thu Các Loại Sân</h2>
            <AreaChart
                h={300}
                data={data}
                dataKey="date"
                series={[
                    { name: 'Sân 5', color: 'indigo.6' },
                    { name: 'Sân 7', color: 'blue.6' },
                    { name: 'Sân 11', color: 'teal.6' },
                ]}
                curveType="linear"
            />
        </div>
    );
}

export default RevenueChart;
