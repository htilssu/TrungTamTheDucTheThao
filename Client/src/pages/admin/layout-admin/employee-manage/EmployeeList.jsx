
import { useEffect, useState } from "react";
import axios from "axios";
import { TiEye, TiEdit, TiDelete, TiDeleteOutline } from "react-icons/ti";

const EmployeeList = ({ editEmployee, viewEmployee,deleteEmployee }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/coach");
                setEmployees(response.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách huấn luyện viên:", error);
            }
        };

        fetchCoaches();
        const intervalId = setInterval(fetchCoaches, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Danh sách huấn luyện viên</h2>
            {employees.length === 0 ? (
                <div className="py-2 text-center text-gray-500">
                    Danh sách huấn luyện viên trống!
                </div>
            ) : (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-xl">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left border">Tên</th>
                            <th className="py-2 px-4 text-left border">Số điện thoại</th>
                            <th className="py-2 px-4 text-left border">Kinh Nghiệm(Năm)</th>
                            <th className="py-2 px-4 text-center border">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr
                                key={employee.id}
                                className="border-b hover:bg-gray-50 transition duration-200"
                            >
                                <td className="py-2 px-4 border">{employee.name}</td>
                                <td className="py-2 px-4 border">{employee.phoneNumber}</td>
                                <td className="py-2 px-4 border">{employee.experience}</td>
                                <td className="py-2 text-center border">
                                    <div className="flex flex-row justify-center items-center">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center justify-center mr-2"
                                            onClick={() => viewEmployee(employee.id)}
                                        >
                                            <TiEye className="mr-1" size={18} />
                                            Xem
                                        </button>
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center justify-center"
                                            onClick={() => editEmployee(employee.id)}
                                        >
                                            <TiEdit className="mr-1" size={18} />
                                            Sửa
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center justify-center ml-2"
                                            onClick={() => deleteEmployee(employee.id)}
                                        >
                                            <TiDeleteOutline className="mr-1" size={18} />
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EmployeeList;
