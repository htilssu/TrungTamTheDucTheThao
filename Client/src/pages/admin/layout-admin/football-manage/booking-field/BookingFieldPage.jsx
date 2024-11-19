import { useState, useEffect } from 'react';
import FieldList from "./component/FieldList.jsx";
import BookingSchedule from "./component/BookingSchedule.jsx";
import BookingModal from "./component/BookingModal.jsx";
import {toast} from "react-toastify";
import {wGet, wPost} from "../../../../../utils/request.util.js";

const BookingFieldPage = () => {
    const [fields, setFields] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const response = await wGet('/v1/fields');
                const responseJson = await response.json();
                setFields(responseJson);
            } catch (error) {
                console.error('Failed to load fields:', error);
            }
        };
        fetchFields();
    }, []);

    const openBookingModal = (time) => {
        setCurrentBooking({ fieldId: selectedField, date: selectedDate, time });
        setModalOpen(true);
    };

    const confirmBooking = async (booking) => {
        try {
            await wPost('/v1/booking-field', booking);
            toast.success("Đặt lịch thành công!");
        } catch (error) {
            console.error("Error booking time:", error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 mb-8 px-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">Đặt lịch sân bóng</h1>
                <p className="text-lg text-gray-600">Chọn sân và khung giờ phù hợp để đặt lịch.</p>
            </div>

            {/* Danh sách các sân */}
            <FieldList fields={fields} selectedField={selectedField} onSelectField={setSelectedField} />

            {/* Chọn lịch cho sân */}
            {selectedField && (
                <BookingSchedule
                    selectedField={selectedField}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    onOpenBookingModal={openBookingModal}
                />
            )}

            {/* Modal đặt lịch */}
            <BookingModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirmBooking={confirmBooking}
                initialBooking={currentBooking}
            />
        </div>
    );
};

export default BookingFieldPage;
