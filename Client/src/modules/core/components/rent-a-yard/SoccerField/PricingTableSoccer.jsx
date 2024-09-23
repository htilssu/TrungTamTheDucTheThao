
const PricingTable = () => {
    return (
        <section className="bg-gray-100 px-8 py-4">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Bảng giá thuê sân</h2>
                <table className="w-full text-left table-auto border-collapse border border-gray-200">
                    <thead className="bg-green-600 text-white">
                    <tr>
                        <th className="p-4 border border-gray-300">Khung giờ</th>
                        <th className="p-4 border border-gray-300">Giá sân 5 người (Thứ 2 - Thứ 6)</th>
                        <th className="p-4 border border-gray-300">Giá sân 5 người (Thứ 7 - CN)</th>
                        <th className="p-4 border border-gray-300">Giá sân 7 người (Thứ 2 - Thứ 6)</th>
                        <th className="p-4 border border-gray-300">Giá sân 7 người (Thứ 7 - CN)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="p-4 border border-gray-300">05:00 - 09:00</td>
                        <td className="p-4 border border-gray-300">100.000</td>
                        <td className="p-4 border border-gray-300">120.000</td>
                        <td className="p-4 border border-gray-300">300.000</td>
                        <td className="p-4 border border-gray-300">360.000</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-gray-300">09:00 - 15:00</td>
                        <td className="p-4 border border-gray-300">120.000</td>
                        <td className="p-4 border border-gray-300">150.000</td>
                        <td className="p-4 border border-gray-300">360.000</td>
                        <td className="p-4 border border-gray-300">420.000</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-gray-300">15:00 - 17:00</td>
                        <td className="p-4 border border-gray-300">150.000</td>
                        <td className="p-4 border border-gray-300">170.000</td>
                        <td className="p-4 border border-gray-300">450.000</td>
                        <td className="p-4 border border-gray-300">510.000</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-gray-300">17:00 - 22:00</td>
                        <td className="p-4 border border-gray-300">200.000</td>
                        <td className="p-4 border border-gray-300">200.000</td>
                        <td className="p-4 border border-gray-300">540.000</td>
                        <td className="p-4 border border-gray-300">600.000</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default PricingTable;