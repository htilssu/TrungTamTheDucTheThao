const ViewCustomerModal = ({ customer, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 space-y-6 transform transition-all scale-105 hover:scale-100 duration-300">
                <div className="flex items-center space-x-4 mb-6">
                    {/* Avatar Section */}
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                            src={customer.avatar || '/avatarH.png'} // Use placeholder if no avatar is provided
                            alt={`${customer.lastName} Avatar`}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Customer Name Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">{customer.lastName}</h2>
                        <p className="text-sm text-gray-600">{customer.email || 'tuananh21@gmail.com'}</p>
                    </div>
                </div>

                {/* Customer Details Section */}
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <p className="font-medium text-gray-700"><strong>Họ và Tên:</strong> {customer.lastName +" "+ customer.firstName}</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="font-medium text-gray-700"><strong>Ngày Sinh:</strong> {customer.dob ? `${customer.dob[2]}/${customer.dob[1]}/${customer.dob[0]}` : 'Chưa có'}</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="font-medium text-gray-700"><strong>Giới Tính:</strong> {customer.gender ? 'Nam' : 'Nữ'}</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="font-medium text-gray-700"><strong>Trạng Thái:</strong> {customer.active ? 'Hoạt động' : 'Không hoạt động'}</p>
                    </div>
                </div>

                {/* Close Button */}
                <div className="mt-6">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors duration-300"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewCustomerModal;
