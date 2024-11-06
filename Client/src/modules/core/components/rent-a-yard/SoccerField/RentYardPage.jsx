import {useState} from 'react';
import {ScrollRestoration, useNavigate} from "react-router-dom";
import {DatePicker} from 'antd';
import dayjs from 'dayjs';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DotLoader from "react-spinners/DotLoader";
import {TextField} from "@mui/material";
import axios from "axios";
import {MdLocationPin} from "react-icons/md";
import {queryClient} from "../../../../cache.js";

const RentYardPage = () => {
    const [fields, setFields] = useState([]);
    const [fieldType, setFieldType] = useState(null);
    const [selectedField, setSelectedField] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDay, setSelectedDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedTime, setSelectedTime] = useState(null);
    const [customerId, setCustomerId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [depositAmount, setDepositAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Thông báo lỗi
    const [fieldTypeError, setFieldTypeError] = useState('');
    const [selectedFieldError, setSelectedFieldError] = useState('');
    const [selectedDateError, setSelectedDateError] = useState('');
    const [selectedTimeError, setSelectedTimeError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const fetchFields = async (fieldType) => {
        try {
            const response = await axios.get(`http://localhost:8080/v1/fields/type/${fieldType}`);
            if (response && response.data && response.data.length > 0) {
                setFields(response.data);
            } else {
                setFields([]);
                setError("Không có sân nào cho loại này.");
            }
        } catch (err) {
            setFields([]);
            console.error("Error fetching fields:", err);
            setError("Không có sân nào cho loại này.");
        }
    };

    const [availableTimes, setAvailableTimes] = useState([
        {time: "05:00 - 06:30", isBooked: false},
        {time: "06:31 - 08:00", isBooked: false},
        {time: "08:01 - 09:30", isBooked: false},
        {time: "09:31 - 11:00", isBooked: false},
        {time: "11:01 - 12:30", isBooked: false},
        {time: "12:31 - 14:00", isBooked: false},
        {time: "14:01 - 15:30", isBooked: false},
        {time: "15:31 - 17:00", isBooked: false},
        {time: "17:01 - 18:30", isBooked: false},
        {time: "18:31 - 20:00", isBooked: false},
        {time: "20:01 - 21:30", isBooked: false},
        {time: "21:31 - 23:00", isBooked: false},
        {time: "23:01 - 00:30", isBooked: false},
    ]);

    // Lấy khung giờ đã đặt cho một sân cụ thể vào một ngày cụ thể
    const fetchBookedTimes = async (id, date) => {
        try {
            const response = await axios.get(`http://localhost:8080/v1/booking-field/available-times/${id}?date=${date}`);
            const bookedTimes = response.data.bookedTimes;

            // Sử dụng bookedTimes để cập nhật trạng thái "isBooked"
            setAvailableTimes(prevAvailableTimes =>
                prevAvailableTimes.map((timeSlot) => ({
                    ...timeSlot,
                    isBooked: bookedTimes.includes(timeSlot.time),
                }))
            );
        } catch (error) {
            console.error("Error fetching booked times:", error);
            setError("Failed to load booked times.");
        }
    };

    // Xử lý khi chọn ngày và sân
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedDay(getDayOfWeek(date));
        if (selectedField) {
            // Gọi API để lấy các khung giờ đã đặt của sân vào ngày được chọn
            fetchBookedTimes(selectedField, date.format('YYYY-MM-DD'));
        }
    };
    const handleFieldSelection = (id) => {
        setSelectedField(id);
        if (selectedDate) {
            // Gọi API để lấy các khung giờ đã đặt của sân vào ngày được chọn
            fetchBookedTimes(id, selectedDate.format('YYYY-MM-DD'));
        }
    };


    const getDayOfWeek = (date) => {
        if (!date) return '';
        const daysOfWeek = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        return daysOfWeek[date.day()];
    };

    // Không cho phép chọn ngày quá khứ
    const disabledDate = (current) => {
        return current && current < dayjs().startOf('day');
    };

    // Xử lý việc chọn khung giờ
    const handleSelectTime = (time) => {
        // Check if the selected time is booked
        const selectedSlot = availableTimes.find(slot => slot.time === time);

        if (selectedSlot && !selectedSlot.isBooked) {
            setStartTime(time.split(" - ")[0]);
            setEndTime(time.split(" - ")[1]);
            setSelectedTime(time);
            setSelectedTimeError('');
        } else {
            setSelectedTimeError('Khung giờ đã được đặt. Vui lòng chọn khung giờ khác.');
        }
    };

    // Xử lý khi chọn loại sân
    const handleFieldTypeSelection = (fieldType) => {
        fetchFields(fieldType);
        setFieldType(fieldType);
        setSelectedField(null);
        setSelectedDate(null);
        setStartTime('');
        setEndTime('');
        setSelectedTime('');

        // Xác định tiền đặt cọc dựa trên loại sân
        switch (fieldType) {
            case '5v5':
                setDepositAmount(100000);
                break;
            case '7v7':
                setDepositAmount(150000);
                break;
            case '11v11':
                setDepositAmount(500000);
                break;
            default:
                setDepositAmount(0);
        }
    };

    const validateForm = () => {
        let isValid = true;

        // Reset tất cả các lỗi
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
        if (!startTime || !endTime) {
            setSelectedTimeError('Vui lòng chọn khung giờ.');
            isValid = false;
        }
        if (!customerName) {
            setNameError('Vui lòng nhập tên.');
            isValid = false;
        }
        if (!customerPhone || customerPhone.length < 10) {
            setPhoneError('Vui lòng nhập số điện thoại hợp lệ.');
            isValid = false;
        }

        return isValid;
    };

    // Xử lý việc đặt sân
    const handleSubmit = async () => {
        const isValid = validateForm();
        if (isValid) {
            setLoading(true);

            // Parse startTime and endTime to a Day.js object
            const startDateTime = dayjs(selectedDate)
                .hour(parseInt(startTime.split(':')[0]))
                .minute(parseInt(startTime.split(':')[1]))
                .second(0);

            const endDateTime = dayjs(selectedDate)
                .hour(parseInt(endTime.split(':')[0]))
                .minute(parseInt(endTime.split(':')[1]))
                .second(0);

            // Tạo object chứa dữ liệu cần gửi
            const bookingData = {
                footballField: {id: selectedField},
                customer: {id: 1},
                customerName: customerName,
                customerPhone: customerPhone,
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
                depositAmount: depositAmount,
                totalAmount: totalAmount / 100000,
                paymentMethod: paymentMethod
            };

            try {
                const response = await axios.post('http://localhost:8080/v1/booking-field', bookingData);

                const timeoutId = setTimeout(() => {
                    if (response.status === 200) {
                        toast.success('Đặt sân thành công!');
                        resetForm();
                        // navigate('/');
                    } else {
                        toast.error('Có lỗi xảy ra khi đặt sân!');
                    }
                    queryClient.invalidateQueries({queryKey: ['fields']});
                    setLoading(false);
                }, 3000);

                return () => clearTimeout(timeoutId);

            } catch (error) {
                setLoading(false);
                console.error('Error creating booking:', error);
                toast.error('Không thể đặt sân!');
            }
        }
    };

    const resetForm = () => {
        setSelectedField(null);
        setCustomerName('');
        setCustomerPhone('');
        setStartTime('');
        setEndTime('');
        setSelectedTime('');
        setDepositAmount(0);
        setTotalAmount(0);
        setPaymentMethod('cash');
    };

    return (
        <div>
            <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
                {/* Tiêu đề */}
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-blue-700">Đặt sân bóng đá</h2>

                {/* Chọn loại sân */}
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-4">Chọn loại sân</h3>
                    <div className="flex space-x-4 sm:justify-start justify-between">
                        <button
                            className={`p-4 rounded-lg shadow-lg ${fieldType === '5v5' ? 'bg-green-500 text-white' : 'bg-gray-200'} hover:bg-green-400 transition-all duration-300`}
                            onClick={() => handleFieldTypeSelection('5v5')}
                        >
                            Sân 5 người
                        </button>
                        <button
                            className={`p-4 rounded-lg shadow-lg ${fieldType === '7v7' ? 'bg-green-500 text-white' : 'bg-gray-200'} hover:bg-green-400 transition-all duration-300`}
                            onClick={() => handleFieldTypeSelection('7v7')}
                        >
                            Sân 7 người
                        </button>
                        <button
                            className={`p-4 rounded-lg shadow-lg ${fieldType === '11v11' ? 'bg-green-500 text-white' : 'bg-gray-200'} hover:bg-green-400 transition-all duration-300`}
                            onClick={() => handleFieldTypeSelection('11v11')}
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
                        {fields?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {fields?.map((field) => (
                                    <div
                                        key={field.id}
                                        className={`transition-transform duration-300 transform hover:scale-105 p-3 rounded-lg shadow-lg text-center ${selectedField === field.id ? 'border-4 border-green-600' : 'border border-green-200'} cursor-pointer hover:border-green-400`}
                                        onClick={() => handleFieldSelection(field.id)}
                                    >
                                        <img
                                            src={field.imageUrl || "/sanbong2.png"}
                                            alt={field.fieldName}
                                            className="w-full h-40 object-cover rounded-lg mb-3 shadow-md"
                                        />
                                        <p className="text-lg font-semibold text-gray-800">{field.fieldName}</p>
                                        <div className="text-sm flex items-start justify-center p-1">
                                            <MdLocationPin className="text-blue-600 mr-1"/>
                                            <span className="text-gray-600">{field.location}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-red-600 text-lg font-semibold text-center">{error}</div>
                        )}
                        {selectedFieldError &&
                            <p className="text-red-600 text-sm mt-2 text-center">{selectedFieldError}</p>}
                    </div>
                )}

                {/* Chọn ngày */}
                {selectedField && (
                    <div className="mb-8">
                        <div className="flex flex-row gap-4 items-center mb-3">
                            <h3 className="text-2xl font-semibold text-gray-800">Chọn ngày</h3>
                        </div>
                        <div className={"flex flex-row gap-4 items-center"}>
                            <DatePicker
                                onChange={(date) => {
                                    handleDateChange(date)
                                }}
                                disabledDate={disabledDate}
                            />
                            {selectedDate && (
                                <p className="mr-4 text-gray-600">
                                    {selectedDay}, Ngày {selectedDate.format('DD/MM/YYYY')}.
                                </p>
                            )}
                        </div>
                        {selectedDateError && <p className="text-red-500 text-sm mt-2">{selectedDateError}</p>}
                    </div>
                )}

                {/* Chọn khung giờ */}
                {selectedDate && (
                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Chọn khung giờ</h3>
                        <div className="flex justify-center mb-6">
                            <div className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-white border border-gray-500"></div>
                                    <span>Sân trống</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 border border-gray-500 bg-gray-300"></div>
                                    <span>Đã đặt</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 border border-gray-500 bg-green-500"></div>
                                    <span>Đang chọn</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {availableTimes.map((timeSlot, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 rounded ${timeSlot.isBooked
                                        ? 'bg-gray-300 text-black cursor-not-allowed'  
                                        : selectedTime === timeSlot.time
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-white text-black border border-gray-500' 
                                    }`}
                                    onClick={() => handleSelectTime(timeSlot.time)}
                                    disabled={timeSlot.isBooked}
                                >
                                    {timeSlot.time}
                                </button>
                            ))}
                        </div>
                        {selectedTimeError && <p className="text-red-500 text-sm mt-2">{selectedTimeError}</p>}
                    </div>
                )}

                {/* Thông tin người đặt */}
                <div className="mb-6 bg-gray-100 p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-3 text-gray-800">Thông tin người đặt</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center">
                        {/* Field: Tên người đặt */}
                        <div className="w-full">
                            <label className="block text-lg font-medium text-gray-700">
                                Tên người đặt
                            </label>
                            <TextField
                                autoFocus
                                margin="dense"
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-full bg-white border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập tên của bạn"
                            />
                            {nameError && <p className="text-red-500 text-sm mt-2">{nameError}</p>}
                        </div>

                        {/* Field: Số điện thoại */}
                        <div className="w-full">
                            <label className="block text-lg font-medium text-gray-700">
                                Số điện thoại
                            </label>
                            <TextField
                                type="tel"
                                value={customerPhone}
                                onChange={(e) => {
                                    const phoneNumber = e.target.value.replace(/\D/, '');
                                    setCustomerPhone(phoneNumber);
                                }}
                                className="w-full bg-white border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập số điện thoại"
                                pattern="[0-9]{10,11}"
                                maxLength={11}
                            />
                            {phoneError && <p className="text-red-500 text-sm mt-2">{phoneError}</p>}
                        </div>
                    </div>
                </div>

                {/* Thanh toán đặt cọc */}
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-3">Thanh toán</h3>
                    <p className="text-lg flex flex-col sm:flex-row gap-2">
                        <div>Số tiền cần phải đặt cọc :</div>
                        <div className="font-medium text-green-500">
                            <span>{depositAmount.toLocaleString()} VNĐ</span>
                        </div>
                    </p>
                </div>

                {/* Xác nhận đặt sân */}
                <div className="flex justify-center">
                    {loading ? (
                        <DotLoader color="#3bd773" size={40}/>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300"
                        >
                            Xác nhận đặt sân
                        </button>
                )}
            </div>
        </div>
    <ToastContainer stacked/>
    <ScrollRestoration/>
</div>
)
    ;
};

export default RentYardPage;
