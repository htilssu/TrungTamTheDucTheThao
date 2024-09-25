import { useState } from 'react';
import {ScrollRestoration, useNavigate} from "react-router-dom";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DotLoader from "react-spinners/DotLoader";

const RentYardPage = () => {
    const navigate = useNavigate();

    // State lưu trữ loại sân, ngày, giờ, thông tin người đặt
    const [fieldType, setFieldType] = useState(null);
    const [selectedField, setSelectedField] = useState(null); // Sân được chọn
    const [selectedDate, setSelectedDate] = useState(null); // Ngày chọn
    const [selectedTime, setSelectedTime] = useState(null); // Giờ chọn
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [deposit, setDeposit] = useState(''); // Số tiền đặt cọc
    const [loading, setLoading] = useState(false);

    const [fieldTypeError, setFieldTypeError] = useState('');
    const [selectedFieldError, setSelectedFieldError] = useState('');
    const [selectedDateError, setSelectedDateError] = useState('');
    const [selectedTimeError, setSelectedTimeError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    // Danh sách sân 5 người, sân 7 người và sân 11 người
    const fields = {
        '5': [
            { id: 'field-5-1', name: 'Sân 5 - Số 1', img: '/sanbong1.png' },
            { id: 'field-5-2', name: 'Sân 5 - Số 2', img: '/sanbong2.png' },
            { id: 'field-5-3', name: 'Sân 5 - Số 3', img: '/sanbong3.png' },
        ],
        '7': [
            { id: 'field-7-1', name: 'Sân 7 - Số 1', img: '/sanbong1.png' },
            { id: 'field-7-2', name: 'Sân 7 - Số 2', img: '/sanbong2.png' },
        ]
        ,
        '11': [
            { id: 'field-11-1', name: 'Sân 11 - Số 1', img: '/san11.png' },
        ]
    };

    const availableTimes = [
        { time: "05:00 - 06:30", isBooked: false },
        { time: "06:30 - 08:00", isBooked: true },
        { time: "08:00 - 09:30", isBooked: false },
        { time: "09:30 - 11:00", isBooked: false },
        { time: "11:00 - 12:30", isBooked: false },
        { time: "12:30 - 14:00", isBooked: false },
        { time: "14:00 - 15:30", isBooked: false },
        { time: "15:30 - 17:00", isBooked: true },
        { time: "17:00 - 18:30", isBooked: false },
        { time: "18:30 - 20:00", isBooked: true },
        { time: "20:00 - 21:30", isBooked: false },
        { time: "21:30 - 23:00", isBooked: true },
        { time: "23:00 - 00:30", isBooked: false },
    ];

    // Không cho phép chọn ngày quá khứ
    const disabledDate = (current) => {
        return current && current < dayjs().startOf('day');
    };

    // Xử lý việc chọn khung giờ
    const handleSelectTime = (time) => {
        setSelectedTime(time);
    };

    // Tự động đặt số tiền đặt cọc dựa trên loại sân
    const handleFieldTypeSelection = (type) => {
        setFieldType(type);
        setSelectedField(null); // Reset sân khi đổi loại sân
        if (type === '5') {
            setDeposit(100000); // Đặt cọc mặc định sân 5 người
        } else if (type === '7') {
            setDeposit(150000); // Đặt cọc mặc định sân 7 người
        }
        else if (type === '11') {
            setDeposit(500000); // Đặt cọc mặc định sân 7 người
        }
    };

    const validateForm = () => {
        let isValid = true;

        // Reset all errors
        setFieldTypeError('');
        setSelectedFieldError('');
        setSelectedDateError('');
        setSelectedTimeError('');
        setNameError('');
        setPhoneError('');

        // Validate each field
        if (!fieldType) {
            setFieldTypeError('Vui lòng chọn loại sân.');
            isValid = false;
        }
        if (!selectedField) {
            setSelectedFieldError('Vui lòng chọn sân cụ thể.');
            isValid = false;
        }
        if (!selectedDate) {
            setSelectedDateError('Vui lòng chọn ngày đặt.');
            isValid = false;
        }
        if (!selectedTime) {
            setSelectedTimeError('Vui lòng chọn khung giờ.');
            isValid = false;
        }
        if (!name) {
            setNameError('Vui lòng nhập tên.');
            isValid = false;
        }
        if (!phone || phone.length < 10) {
            setPhoneError('Vui lòng nhập số điện thoại hợp lệ.');
            isValid = false;
        }

        return isValid;
    };

    // Xử lý việc đặt sân
    const handleSubmit = async () => {
        let isValid = validateForm();

        if (isValid) {
            setLoading(true);

            // Tạo object chứa dữ liệu cần gửi
            const bookingData = {
                fieldType,      // Loại sân (5, 7, 11)
                fieldId: selectedField,   // Sân cụ thể
                date: selectedDate.format('YYYY-MM-DD'), // Ngày đặt (định dạng lại date)
                timeSlot: selectedTime,    // Khung giờ
                customerName: name,  // Tên người đặt
                phoneNumber: phone,  // Số điện thoại
                deposit: deposit     // Số tiền đặt cọc
            };

            try {
                // Gửi yêu cầu POST tới API backend
                const response = await fetch('http://localhost:8080/v1/bookings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookingData),  // Chuyển object thành JSON
                });

                if (response.ok) {
                    // Xử lý khi đặt sân thành công
                    setLoading(false);
                    toast.success('Đặt sân thành công!');
                    navigate('/');
                } else {
                    // Xử lý khi có lỗi
                    setLoading(false);
                    toast.error('Có lỗi xảy ra khi đặt sân!');
                }
            } catch (error) {
                // Xử lý lỗi kết nối
                setLoading(false);
                toast.error('Không thể kết nối đến server!');
            }
        }
    };

    return (
        <div>
            <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
                {/* Tiêu đề */}
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-blue-700">Đặt sân bóng đá</h2>

                {/* Chọn loại sân */}
                <div className="mb-6 ">
                    <h3 className="text-2xl font-semibold mb-4">Chọn loại sân</h3>
                    <div className="flex space-x-4 sm:justify-start justify-between">
                        <button
                            className={`p-4 rounded-lg shadow-lg ${fieldType === '5' ? 'bg-green-500 text-white' : 'bg-gray-200'} hover:bg-green-400 transition-all duration-300`}
                            onClick={() => handleFieldTypeSelection('5')}
                        >
                            Sân 5 người
                        </button>
                        <button
                            className={`p-4 rounded-lg shadow-lg ${fieldType === '7' ? 'bg-green-500 text-white' : 'bg-gray-200'} hover:bg-green-400 transition-all duration-300`}
                            onClick={() => handleFieldTypeSelection('7')}
                        >
                            Sân 7 người
                        </button>
                        <button
                            className={`p-4 rounded-lg shadow-lg ${fieldType === '11' ? 'bg-green-500 text-white' : 'bg-gray-200'} hover:bg-green-400 transition-all duration-300`}
                            onClick={() => handleFieldTypeSelection('11')}
                        >
                            Sân 11 người
                        </button>
                    </div>
                    {fieldTypeError && <p className="text-red-500 text-sm mt-2">{fieldTypeError}</p>}
                </div>

                {/* Chọn sân cụ thể */}
                {fieldType && (
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold mb-4">Chọn sân cụ thể</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {fields[fieldType].map((field) => (
                                <div
                                    key={field.id}
                                    className={`p-4 rounded-lg shadow-md text-center ${selectedField === field.id ? 'border-4 border-blue-500' : 'border-2 border-gray-300'} cursor-pointer`}
                                    onClick={() => setSelectedField(field.id)}
                                >
                                    <img src={field.img} alt={field.name}
                                         className="w-full h-40 object-cover rounded-md mb-2"/>
                                    <p className="text-lg font-semibold">{field.name}</p>
                                </div>
                            ))}
                        </div>
                        {selectedFieldError && <p className="text-red-500 text-sm mt-2">{selectedFieldError}</p>}
                    </div>
                )}

                {/* Chọn ngày */}
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-4">Chọn ngày</h3>
                    <DatePicker
                        onChange={(date) => setSelectedDate(date)}
                        disabledDate={disabledDate}
                        className="p-2 border border-gray-300 rounded-lg w-full"
                        placeholder="Chọn ngày"
                        showToday={false}
                    />
                    {selectedDateError && <p className="text-red-500 text-sm mt-2">{selectedDateError}</p>}
                </div>

                {/* Hiển thị khung giờ chỉ khi đã chọn ngày */}
                {selectedDate && (
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold mb-4">Chọn khung giờ</h3>
                        <div className={"mb-4"}>
                            <div className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-white border border-gray-500"></div>
                                    <span>Sân trống</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gray-300"></div>
                                    <span>Đã đặt</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-green-500"></div>
                                    <span>Đang chọn</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                            {availableTimes.map((slot, index) => (
                                <button
                                    key={index}
                                    disabled={slot.isBooked}
                                    className={`p-4 rounded-lg text-center shadow-md ${
                                        slot.isBooked
                                            ? 'bg-gray-300 text-white cursor-not-allowed'
                                            : selectedTime === slot.time
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-200 hover:bg-green-400 hover:text-white transition-all duration-300'
                                    }`}
                                    onClick={() => !slot.isBooked && handleSelectTime(slot.time)}
                                >
                                    {slot.time}
                                </button>
                            ))}
                        </div>
                        {selectedTimeError && <p className="text-red-500 text-sm mt-2">{selectedTimeError}</p>}
                    </div>
                )}

                {/* Thông tin người đặt */}
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-4">Thông tin người đặt</h3>
                    <div className="flex flex-col gap-4">
                        <div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Tên người đặt"
                                className="p-2 border border-gray-300 rounded-lg w-full"
                            />
                            {nameError && <p className="text-red-500 text-sm mt-2">{nameError}</p>}
                        </div>
                        <div>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                    // Chỉ cho phép nhập số
                                    const phoneNumber = e.target.value.replace(/\D/, '');
                                    setPhone(phoneNumber);
                                }}
                                placeholder="Số điện thoại"
                                className="p-2 border border-gray-300 rounded-lg w-full"
                                pattern="[0-9]{10,11}"  // Ràng buộc số điện thoại từ 10-11 chữ số
                                maxLength={11}          // Giới hạn số ký tự là 11
                            />
                            {phoneError && <p className="text-red-500 text-sm mt-2">{phoneError}</p>}
                        </div>
                    </div>
                </div>

                {/* Thanh toán đặt cọc */}
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-4">Thanh toán</h3>
                    <p className="text-lg flex flex-col sm:flex-row gap-2">
                        <div>Số tiền cần phải đặt cọc :</div>
                        <div className="font-medium text-green-500">
                            <span
                            >{deposit ? deposit.toLocaleString() : 'Chọn loại sân'}
                            </span> VNĐ
                        </div>
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    {/* Hiển thị nút hoặc loader dựa trên trạng thái loading */}
                    {!loading ? (
                        <button
                            onClick={handleSubmit}
                            className="bg-green-500 text-white px-8 py-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
                        >
                            Xác nhận đặt sân
                        </button>
                    ) : (
                        <div className="mt-4">
                            <DotLoader color="#3bd773" size={40}/>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer stacked/>
            <ScrollRestoration/>
        </div>
    );
};

export default RentYardPage;