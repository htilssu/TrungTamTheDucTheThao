import { useState } from 'react';

const OverviewPage = () => {
  const allTransactions = [
    { id: 1, service: 'Thuê sân bóng', status: 'Hoàn thành', amount: '100000 VND', date: '2023-09-26', time: '14:30' },
    { id: 2, service: 'Thuê phòng gym', status: 'Đang chờ', amount: '200000 VND', date: '2023-09-25', time: '10:00' },
    { id: 3, service: 'Thuê sân bóng', status: 'Đã hủy', amount: '300000 VND', date: '2023-09-24', time: '16:00' },
    { id: 4, service: 'Thuê phòng gym', status: 'Hoàn thành', amount: '500000 VND', date: '2023-09-23', time: '12:00' },
    { id: 5, service: 'Thuê sân bóng', status: 'Đang chờ', amount: '700000 VND', date: '2023-09-22', time: '18:00' },
  ];

  const [selectedStatus, setSelectedStatus] = useState('Hoàn thành');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filteredTransactions = allTransactions
    .filter((transaction) => transaction.status === selectedStatus)
    .sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  return (
    <div className="p-6 bg-gray-100 mb-6">
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

      <div className="mb-4">
        <button
          className={`px-4 py-2 rounded ${selectedStatus === 'Hoàn thành' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`}
          onClick={() => handleStatusChange('Hoàn thành')}
        >
          Hoàn thành
        </button>
        <button
          className={`ml-2 px-4 py-2 rounded ${selectedStatus === 'Đang chờ' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`}
          onClick={() => handleStatusChange('Đang chờ')}
        >
          Đang chờ
        </button>
        <button
          className={`ml-2 px-4 py-2 rounded ${selectedStatus === 'Đã hủy' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`}
          onClick={() => handleStatusChange('Đã hủy')}
        >
          Đã hủy
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-left text-sm uppercase font-semibold">
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Dịch vụ</th>
            <th className="px-6 py-4">Trạng thái</th>
            <th className="px-6 py-4">Số tiền</th>
            <th className="px-6 py-4">Ngày</th>
            <th className="px-6 py-4">Giờ</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {paginatedTransactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b border-gray-200 hover:bg-gray-100 transition duration-300"
              onClick={() => handleTransactionClick(transaction)}
            >
              <td className="px-6 py-4">{transaction.id}</td>
              <td className="px-6 py-4">{transaction.service}</td>
              <td className="px-6 py-4">{transaction.status}</td>
              <td className="px-6 py-4">{transaction.amount}</td>
              <td className="px-6 py-4">{transaction.date}</td>
              <td className="px-6 py-4">{transaction.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="mt-4">
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-4 py-2 mx-1 rounded ${currentPage === pageNumber ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      )}

      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Chi tiết giao dịch</h2>
            <p>ID: {selectedTransaction.id}</p>
            <p>Dịch vụ: {selectedTransaction.service}</p>
            <p>Trạng thái: {selectedTransaction.status}</p>
            <p>Số tiền: {selectedTransaction.amount}</p>
            <p>Ngày: {selectedTransaction.date}</p>
            <p>Giờ: {selectedTransaction.time}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleCloseModal}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewPage;
