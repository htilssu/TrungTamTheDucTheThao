// const EmployeeDetail = ({ employee }) => {
//     if (!employee) {
//         return <div className="text-center text-lg text-gray-500">No employee selected.</div>;
//     }

//     return (
//         <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg px-8 py-6 mt-8">
//             <h2 className="text-3xl font-semibold mb-4 text-gray-800">Chi Tiết Huấn Luyện Viên</h2>
//             <div className="flex items-center mb-6">
//                 <img
//                     src={employee.avatar}
//                     alt="Avatar"
//                     className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-md mr-4"
//                 />
//                 <div>
//                     <h3 className="text-2xl font-semibold text-gray-800">{employee.name}</h3>
//                     <p className="text-gray-600">Liên hệ: {employee.phoneNumber}</p>
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-gray-100 p-4 rounded-lg shadow-xl">
//                     <h4 className="font-semibold text-lg text-gray-700">Thông Tin </h4>
//                     <p className="text-gray-600"><strong>Điện thoại:</strong> {employee.phoneNumber}</p>
//                     <p className="text-gray-600"><strong>Thời gian làm việc:</strong> {employee.experience} năm</p>

//                 </div>
//                 <div className="bg-gray-100 p-4 rounded-lg shadow-xl max-h-40 overflow-y-auto">
//                 <strong>Giới thiệu bản thân:</strong>
//                     <p className="text-gray-600 break-words">
//                          {employee.description}
//                     </p>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default EmployeeDetail;
const EmployeeDetail = ({ employee }) => {
    if (!employee) {
        return <div className="text-center text-lg text-gray-500">No employee selected.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg px-8 py-6 mt-8">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Chi Tiết Huấn Luyện Viên</h2>
            <div className="flex items-center mb-6">
                <img
                    src={employee.avatar}
                    alt="Avatar"
                    className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-md mr-4"
                />
                <div>
                    <h3 className="text-2xl font-semibold text-gray-800">{employee.name}</h3>
                    <p className="text-gray-600">Liên hệ: {employee.phoneNumber}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg shadow-xl">
                    <h4 className="font-semibold text-lg text-gray-700">Thông Tin </h4>
                    <p className="text-gray-600"><strong>Điện thoại:</strong> {employee.phoneNumber}</p>
                    <p className="text-gray-600"><strong>Thời gian làm việc:</strong> {employee.experience} năm</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-xl max-h-40 overflow-y-auto">
                    <strong>Giới thiệu bản thân:</strong>
                    <p className="text-gray-600 break-words">
                        {employee.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail
