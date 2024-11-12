import React from 'react';

const CustomerDetail = ({ customer }) => {
    if (!customer) {
        return <div className="text-center text-lg text-gray-500">Không có khách hàng nào được chọn.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg px-8 py-6 mt-8">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Chi Tiết Khách Hàng</h2>
            <div className="flex items-center mb-6">
                <img
                    src={customer.user.avatar || 'default-avatar-link'} // Link avatar mặc định nếu không có
                    alt="Avatar"
                    className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-md mr-4"
                />
                <div>
                    <h3 className="text-2xl font-semibold text-gray-800">
                        {customer.user.firstName ? `${customer.user.firstName} ${customer.user.lastName}` : customer.user.lastName}
                    </h3>
                    <p className="text-gray-600"><strong>Email:</strong> {customer.email}</p>
                    <p className="text-gray-600"><strong>Giới Tính:</strong> {customer.user.gender ? 'Nam' : 'Nữ'}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg shadow-xl">
                    <h4 className="font-semibold text-lg text-gray-700">Thông Tin Cá Nhân</h4>
                    <p className="text-gray-600"><strong>Ngày Sinh:</strong> {customer.user.dob}</p>
                    <p className="text-gray-600"><strong>Số Điện Thoại:</strong> {customer.user.phoneNumber || 'Không có'}</p>
                    <p className="text-gray-600"><strong>Mật Khẩu:</strong> Đã được mã hóa</p> {/* Không hiển thị mật khẩu rõ */}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-xl md:col-span-2">
                    <h4 className="font-semibold text-lg text-gray-700">Trạng Thái</h4>
                    <p className={`text-lg ${customer.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                        {customer.status || 'Không xác định'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetail;
