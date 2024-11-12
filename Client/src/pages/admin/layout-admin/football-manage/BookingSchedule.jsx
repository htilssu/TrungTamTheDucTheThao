
import React, {useState} from 'react';
import {DatePicker} from 'antd';

const BookingSchedule = () => {
  // Khởi tạo biến hôm nay
  const today = new Date();

  // Dữ liệu giả lập cho lịch đặt sân
  const [bookings, setBookings] = useState([
    {id: 1, date: '2024-10-31', time: '05:00 - 06:30', field: '5-1', name: 'Nguyễn Văn A', phone: '0123456789'},
    {id: 2, date: '2024-10-31', time: '06:30 - 08:00', field: '5-2', name: 'Trần Thị B', phone: '0987654321'},
    {id: 3, date: '2024-10-31', time: '08:00 - 09:30', field: '7-1', name: 'Lê Văn C', phone: '0912345678'},
    {id: 4, date: '2024-10-31', time: '09:30 - 11:00', field: '11-1', name: 'Phạm Thị D', phone: '0934567890'},
    {id: 5, date: '2024-10-31', time: '15:00 - 16:30', field: '11-1', name: 'Nguyễn Văn E', phone: '0123456788'},
    // Thêm các đặt sân khác ở đây...
  ]);

  // Trạng thái cho chọn ngày và loại sân
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]); // Ngày mặc định là hôm nay
  const [selectedField, setSelectedField] = useState('5'); // Sân mặc định là sân 5

  // Trạng thái cho modal đặt sân
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBooking, setModalBooking] = useState(null); // Dữ liệu cho đặt lịch hiện tại

  // Sân sẽ có nhiều sân 5, 7, 11.
  const fields = {
    '5': [1, 2, 3, 4], // Sân 5 có 4 sân
    '7': [1, 2], // Sân 7 có 2 sân
    '11': [1], // Sân 11 có 1 sân
  };

  // Tạo khung giờ cho sân
  const createTimesForField = (fieldType) => {
    if (fieldType === '11') {
      return ['07:00 - 09:00', '15:00 - 17:00', '18:00 - 20:00']; // Khung giờ cho sân 11
    }

    // Khung giờ cho sân 5 và 7 từ 5h đến 24h, chia đều
    const timeSlots = [];
    const startHour = 5; // Bắt đầu từ 5h sáng
    const endHour = 24; // Kết thúc lúc 24h

    for (let hour = startHour; hour <= endHour; hour++) {
      const startTime = `${String(hour).padStart(2, '0')}:00`;
      const endTime = `${String(hour + 1).padStart(2, '0')}:30`;
      timeSlots.push(`${startTime} - ${endTime}`);
    }

    return timeSlots;
  };

  const times = createTimesForField(selectedField); // Khung giờ cho sân đã chọn

  const daysToShow = 7; // Số ngày để hiển thị
  const dates = Array.from({length: daysToShow}, (_, i) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + i);
    const options = {weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric'};
    return {date: date.toISOString().split('T')[0], display: date.toLocaleDateString('vi-VN', options)}; // Lưu ngày và thứ
  });

  // Hàm mở modal để đặt lịch
  const openBookingModal = (date, time, field) => {
    setModalBooking({date, time, field}); // Thiết lập thông tin cho booking mới
    setModalOpen(true);
  };

  // Hàm mở modal cho đặt lịch
  const openEditModal = (booking) => {
    setModalBooking(booking); // Thiết lập thông tin booking hiện tại
    setModalOpen(true);
  };

  // Hàm thực hiện đặt lịch
  const handleBooking = (name, phone) => {
    setBookings([...bookings, {id: bookings.length + 1, ...modalBooking, name, phone}]);
    setModalOpen(false);
    setModalBooking(null);
  };

  // Hàm hủy đặt lịch
  const handleCancelBooking = () => {
    setBookings(bookings.filter(
        b => !(b.date === modalBooking.date && b.time === modalBooking.time && b.field === modalBooking.field)));
    setModalOpen(false);
    setModalBooking(null);
  };

  // Hàm hủy modal
  const cancelModal = () => {
    setModalOpen(false);
    setModalBooking(null);
  };

  return (
      <div className="max-w-6xl mx-auto ">
        <h1 className="text-2xl font-bold mb-5">Lịch Sân Bóng</h1>

        {/* Chọn ngày xem */}
        <div className="mb-2">
          <label className="mr-2">Chọn ngày xem:</label>
          <DatePicker
              onChange={(e) => {
                setSelectedDate(e.target.value);
              }}
              className="border rounded p-2"
          />
        </div>

        {/* Chọn loại sân */}
        <div className="">
          <label className="mr-2">Chọn loại sân:</label>
          <select
              value={selectedField}
              onChange={(e) => {
                setSelectedField(e.target.value);
              }}
              className="border rounded p-2"
          >
            <option value="5">Sân 5</option>
            <option value="7">Sân 7</option>
            <option value="11">Sân 11</option>
          </select>
        </div>

        <table className="min-w-full border border-gray-300">
          <thead>
          <tr>
            <th style={{position: 'sticky', top: 65, backgroundColor: 'slategray', zIndex: 10}}
                className="border border-gray-300 p-2 text-white">Khung giờ
            </th>
            {dates.map(({date, display}) => (
                <th key={date} style={{position: 'sticky', top: 65, backgroundColor: 'slategray', zIndex: 10}}
                    className="border border-gray-300 p-2 text-white">
                  {display}
                </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {/* Chỉ hiển thị sân được chọn */}
          {fields[selectedField].map(s => (
              <React.Fragment key={`${selectedField}-${s}`}>
                <tr>
                  <td colSpan={dates.length}
                      className="border border-gray-300 p-2 font-semibold text-lg bg-gray-200">
                    Sân {selectedField}-{s}
                  </td>
                </tr>
                {times.map((time, index) => (
                    <tr key={`${selectedField}-${s}-${index}`}>
                      <td className="border border-gray-300 p-2">{time}</td>
                      {dates.map(({date}) => {
                        // Lọc các đặt sân cho ngày và giờ cụ thể
                        const booking = bookings.find(
                            booking => booking.date === date && booking.time === time && booking.field ===
                                `${selectedField}-${s}`);
                        return (
                            <td
                                key={`${date}-${time}`}
                                className={`border border-gray-300 p-2 ${booking
                                                                         ? 'bg-green-200 cursor-pointer'
                                                                         : 'cursor-pointer hover:bg-blue-100'}`}
                                onClick={() => booking ? openEditModal(booking) : openBookingModal(date, time,
                                    `${selectedField}-${s}`)} // Mở modal đặt lịch hoặc chỉnh sửa
                            >
                              {booking ? (
                                  <div>
                                    <p className="font-semibold">{booking.name}</p>
                                    <p>{booking.phone}</p>
                                  </div>
                              ) : (
                                   <p className="text-gray-500">Chưa đặt</p>
                               )}
                            </td>
                        );
                      })}
                    </tr>
                ))}
              </React.Fragment>
          ))}
          </tbody>
        </table>

        {/* Modal đặt lịch */}
        {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white w-1/3 p-5 rounded shadow-lg">
                <h2 className="text-xl mb-4">{modalBooking.id ? 'Chỉnh sửa đặt lịch' : 'Đặt lịch mới'}</h2>
                <div className="mb-4">
                  <label className="block mb-1">Tên:</label>
                  <input
                      type="text"
                      onChange={(e) => setModalBooking({...modalBooking, name: e.target.value})}
                      className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Số điện thoại:</label>
                  <input
                      type="text"
                      onChange={(e) => setModalBooking({...modalBooking, phone: e.target.value})}
                      className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Thông tin:</p>
                  <p>{`Ngày: ${modalBooking.date}`}</p>
                  <p>{`Thời gian: ${modalBooking.time}`}</p>
                  <p>{`Sân: ${modalBooking.field}`}</p>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => handleBooking(modalBooking.name, modalBooking.phone)}
                          className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                    {modalBooking.id ? 'Cập nhật' : 'Đặt'}
                  </button>
                  <button onClick={handleCancelBooking} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
                    Hủy đặt
                  </button>
                  <button onClick={cancelModal} className="bg-gray-300 text-black px-4 py-2 rounded">Hủy</button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default BookingSchedule;
