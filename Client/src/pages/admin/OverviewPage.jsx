import { useState} from 'react';

const OverviewPage = () => {
  const allTransactions = [
    { id: 1, service: 'Thuê sân bóng', status: 'Hoàn thành', amount: '100000 VND', date: '2023-09-26', time: '14:30' },
    
  ];

  const [selectedStatus, setSelectedStatus] = useState('Hoàn thành');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Số lượng giao dịch mỗi trang
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Lọc giao dịch theo trạng thái được chọn
  const filteredTransactions = allTransactions
    .filter((transaction) => transaction.status === selectedStatus)
    .sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Lấy các giao dịch của trang hiện tại
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Hàm xử lý chuyển trạng thái và đặt lại trang về 1
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1); // Đặt lại trang về 1 khi thay đổi trạng thái
  };

  // Mở modal với thông tin giao dịch chi tiết
  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  // Hàm xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Xác định khoảng trang hiện tại (tối đa 3 trang)
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="text-2xl font-bold text-gray-800 mb-6">Overview</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Số tiền thu được</h2>
          <p className="text-3xl font-bold text-green-600">50,000,000 VND</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Số người dùng truy cập</h2>
          <p className="text-3xl font-bold text-blue-600">2,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Số đơn đặt hàng</h2>
          <p className="text-3xl font-bold text-purple-600">50</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card Tổng số liệu */}
      </div>

      {/* Lịch sử giao dịch */}
      <div className="text-xl font-bold text-gray-800 mb-5">History Booking</div>
      <div className="flex gap-6">
        {/* Trạng thái giao dịch */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="font-bold text-gray-800 mb-4">Trạng thái giao dịch</h2>
          <ul>
            <li
              onClick={() => handleStatusChange('Hoàn thành')}
              className={`cursor-pointer py-3 px-4 rounded-lg mb-2 text-center transition-all ${
                selectedStatus === 'Hoàn thành'
                  ? 'bg-green-100 text-green-600 font-bold shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Hoàn thành
            </li>
            <li
              onClick={() => handleStatusChange('Đang chờ')}
              className={`cursor-pointer py-3 px-4 rounded-lg mb-2 text-center transition-all ${
                selectedStatus === 'Đang chờ'
                  ? 'bg-yellow-100 text-yellow-600 font-bold shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Đang chờ
            </li>
            <li
              onClick={() => handleStatusChange('Đã hủy')}
              className={`cursor-pointer py-3 px-4 rounded-lg mb-2 text-center transition-all ${
                selectedStatus === 'Đã hủy'
                  ? 'bg-red-100 text-red-600 font-bold shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Đã Hủy
            </li>
          </ul>
        </div>

        {/* Danh sách giao dịch */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="font-bold text-gray-800 mb-4">Danh sách giao dịch ({selectedStatus})</h2>
          <ul>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction) => (
                <li
                  key={transaction.id}
                  onClick={() => handleTransactionClick(transaction)}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm mb-3 border border-gray-300 transition-transform transform hover:scale-105"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-700">ID Đơn: {transaction.id}</span>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        transaction.status === 'Hoàn thành'
                          ? 'bg-green-200 text-green-700'
                          : transaction.status === 'Đang chờ'
                          ? 'bg-yellow-200 text-yellow-700'
                          : 'bg-red-200 text-red-700'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                  <p className="text-gray-600">Dịch vụ: {transaction.service}</p>
                  <p className="text-gray-600">Số tiền: {transaction.amount}</p>
                  <p className="text-gray-600">Ngày: {transaction.date}</p>
                  <p className="text-gray-600">Thời gian: {transaction.time}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-600">Không có giao dịch nào</p>
            )}
          </ul>

          {/* Phân trang */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Trước
            </button>
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 mx-1 rounded-lg ${
                    currentPage === pageNumber
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Sau
            </button>
          </div>
        </div>

        {/* Modal hiển thị chi tiết giao dịch */}
        {selectedTransaction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Chi tiết giao dịch</h2>
                <p>ID Đơn: {selectedTransaction.id}</p>
                <p>Dịch vụ: {selectedTransaction.service}</p>
                <p>Trạng thái: {selectedTransaction.status}</p>
                <p>Số tiền: {selectedTransaction.amount}</p>
                <p>Ngày: {selectedTransaction.date}</p>
                <p>Thời gian: {selectedTransaction.time}</p>
                <button
                onClick={handleCloseModal}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                Đóng
                </button>
            </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default OverviewPage;
