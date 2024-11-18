package com.htilssu.sport.services;

import com.htilssu.sport.data.dtos.BookingFieldDTO;
import com.htilssu.sport.data.dtos.BookingStatisticsDTO;
import com.htilssu.sport.data.models.BookingField;
import com.htilssu.sport.data.models.FootballField;
import com.htilssu.sport.data.models.PricingField;
import com.htilssu.sport.data.models.User;
import com.htilssu.sport.enums.BookingStatus;
import com.htilssu.sport.repositories.BookingFieldRepository;
import com.htilssu.sport.repositories.FootballFieldRepository;
import com.htilssu.sport.repositories.PricingFieldRepository;
import com.htilssu.sport.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookingFieldService {

    private final BookingFieldRepository bookingFieldRepository;
    private final FootballFieldRepository footballFieldRepository;
    private final PricingFieldRepository pricingFieldRepository;
    private final UserRepository userRepository;

    public BookingField createBooking(BookingFieldDTO bookingFieldDTO) {
        FootballField field = footballFieldRepository.findById(
                        bookingFieldDTO.getFootballField().getId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy sân."));

        if ("maintenance".equals(field.getStatus())) {
            throw new IllegalArgumentException("Sân đang trong thời gian bảo trì.");
        }

        User customer = userRepository.findById(bookingFieldDTO.getCustomer().getId())
                .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại"));

        if (bookingFieldDTO.getStartTime().after(bookingFieldDTO.getEndTime())) {
            throw new IllegalArgumentException("Thời gian bắt đầu và kết thúc không hợp lệ.");
        }

        List<BookingField> overlappingBookings = bookingFieldRepository
                .findByFootballFieldAndStartTimeBetween(field, bookingFieldDTO.getStartTime(),
                        bookingFieldDTO.getEndTime());
        // Lọc các booking không có trạng thái "CANCELLED"
        List<BookingField> activeBookings = overlappingBookings.stream()
                .filter(booking -> !BookingStatus.CANCELLED.equals(booking.getBookingStatus()))
                .collect(Collectors.toList());
        if (!activeBookings.isEmpty()) {
            throw new IllegalArgumentException("Sân đã được đặt trong khoảng thời gian này.");
        }

        BookingField booking = new BookingField();
        booking.setFootballField(field);
        booking.setCustomer(customer);
        booking.setCustomerName(bookingFieldDTO.getCustomerName());
        booking.setCustomerPhone(bookingFieldDTO.getCustomerPhone());
        booking.setStartTime(bookingFieldDTO.getStartTime());
        booking.setEndTime(bookingFieldDTO.getEndTime());
        booking.setBookingStatus(BookingStatus.PENDING);
        booking.setDepositAmount(bookingFieldDTO.getDepositAmount());
//        booking.setTotalAmount(calculateTotalAmount(field, bookingFieldDTO.getStartTime(),
//                bookingFieldDTO.getEndTime()));
        booking.setTotalAmount(bookingFieldDTO.getTotalAmount());

        return bookingFieldRepository.save(booking);
    }

    public BookingField setBookingStatus(Long bookingId, BookingStatus newStatus) {
        BookingField booking = bookingFieldRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy booking với ID: " + bookingId));

        if (newStatus == BookingStatus.ACTING && !BookingStatus.PENDING.equals(booking.getBookingStatus())) {
            throw new IllegalStateException("Chỉ có thể chuyển trạng thái thành ACTING khi trạng thái hiện tại là PENDING.");
        }

        // Cập nhật trạng thái
        booking.setBookingStatus(BookingStatus.ACTING);
        // Cập nhật trạng thái đã thanh toán
        booking.setIsPay(true);
        return bookingFieldRepository.save(booking);
    }

    //tính giá tiền sân
    private Double calculateTotalAmount(FootballField footballField,
            Timestamp startTime,
            Timestamp endTime) {
        List<PricingField> priceFields = pricingFieldRepository.findByFootballField(footballField);

        double totalAmount = 0.0;

        for (PricingField priceField : priceFields) {
            LocalTime bookingStartTime = startTime.toLocalDateTime().toLocalTime();
            LocalTime bookingEndTime = endTime.toLocalDateTime().toLocalTime();

            // Sử dụng isBefore() và isAfter() để so sánh LocalTime
            if (!bookingStartTime.isBefore(priceField.getStartTime()) && !bookingEndTime.isAfter(
                    priceField.getEndTime())) {
                long durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
                totalAmount += durationHours * priceField.getRate();
            }
        }
        return totalAmount;
    }

    //Lấy thông tin booking theo ID
    public BookingField getBookingById(Long bookingId) {
        return bookingFieldRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy booking với ID: " + bookingId));
    }

    // Phương thức lấy tất cả booking của một sân cụ thể
    public List<BookingField> getBookingsByField(Long fieldId) {
        FootballField field = footballFieldRepository.findById(fieldId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy sân."));
        return bookingFieldRepository.findByFootballField(field);
    }

    //Lấy khung giờ đã đặt của 1 sân cụ thể vào 1 ngày cụ thể
    public Map<String, List<String>> getAvailableTimes(Long fieldId, LocalDate date) {
        // Lấy sân theo ID
        FootballField field = footballFieldRepository.findById(fieldId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy sân."));

        // Danh sách khung giờ
        String[] timeSlots = {
                "05:00 - 06:30", "06:31 - 08:00", "08:01 - 09:30",
                "09:31 - 11:00", "11:01 - 12:30", "12:31 - 14:00",
                "14:01 - 15:30", "15:31 - 17:00", "17:01 - 18:30",
                "18:31 - 20:00", "20:01 - 21:30", "21:31 - 23:00",
                "23:01 - 00:30"
        };

        // Chuyển đổi ngày sang Timestamp để kiểm tra
        Timestamp startOfDay = Timestamp.valueOf(date.atStartOfDay());
        Timestamp endOfDay = Timestamp.valueOf(date.plusDays(1).atStartOfDay());

        // Lấy danh sách các đặt sân đã có trong ngày (trừ booking đã hủy)
        List<BookingField> bookings = bookingFieldRepository.findByFootballFieldAndStartTimeBetween(
                field, startOfDay, endOfDay).stream()
                .filter(booking -> !booking.getBookingStatus().equals(BookingStatus.CANCELLED))
                .collect(Collectors.toList());

        // Tạo danh sách các khung giờ đã đặt
        List<String> bookedTimes = new ArrayList<>();
        for (BookingField booking : bookings) {
            LocalTime startTime = booking.getStartTime().toLocalDateTime().toLocalTime();
            LocalTime endTime = booking.getEndTime().toLocalDateTime().toLocalTime();
            for (String slot : timeSlots) {
                String[] times = slot.split(" - ");
                LocalTime slotStart = LocalTime.parse(times[0]);
                LocalTime slotEnd = LocalTime.parse(times[1]);

                if ((startTime.isBefore(slotEnd) && endTime.isAfter(slotStart))) {
                    bookedTimes.add(slot);
                }
            }
        }

        // Tạo danh sách khung giờ khả dụng
        List<String> availableTimes = new ArrayList<>();
        for (String slot : timeSlots) {
            if (!bookedTimes.contains(slot)) {
                availableTimes.add(slot);
            }
        }

        // Tạo và trả về kết quả
        Map<String, List<String>> result = new HashMap<>();
        result.put("bookedTimes", bookedTimes);
        result.put("availableTimes", availableTimes);

        return result;
    }

    // Phương thức lấy tất cả booking của một người dùng cụ thể
    public List<BookingField> getBookingsByUser(Long userId) {
        User customer = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại."));
        return bookingFieldRepository.findByCustomer(customer);
    }

    public List<BookingField> getAllBookings() {
        List<BookingField> bookings = bookingFieldRepository.findAll();
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());

        List<BookingField> bookingsToUpdate = new ArrayList<>();
        for (BookingField booking : bookings) {
            if (booking.getEndTime().before(currentTime) && BookingStatus.ACTING.equals(
                    booking.getBookingStatus())) {
                booking.setBookingStatus(BookingStatus.COMPLETED);
                bookingsToUpdate.add(booking);
            }
        }
        if (!bookingsToUpdate.isEmpty()) {
            bookingFieldRepository.saveAll(bookingsToUpdate);
        }

        return bookings;
    }

    public BookingField updateBooking(Long id, BookingField booking) {
        booking.setId(id);
        return bookingFieldRepository.save(booking);
    }

    public void deleteBooking(Long bookingId) {
        BookingField booking = bookingFieldRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy lịch đặt sân với ID: " + bookingId));

        // Kiểm tra trạng thái booking trước khi xóa
        if (!BookingStatus.PENDING.equals(booking.getBookingStatus())) {
            throw new IllegalStateException("Chỉ có thể xóa lịch đặt sân khi trạng thái là PENDING.");
        }

        bookingFieldRepository.deleteById(bookingId);
    }

    // Phương thức hủy đặt sân
    public BookingField cancelBooking(Long bookingId) {
        BookingField booking = bookingFieldRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy lịch đặt sân với ID: " + bookingId));

        if (!BookingStatus.ACTING.equals(booking.getBookingStatus())
                && !BookingStatus.PENDING.equals(booking.getBookingStatus()))
        {
            throw new IllegalStateException("Không thể hủy lịch trong trạng thái này.");
        }

        booking.setBookingStatus(BookingStatus.CANCELLED);

        return bookingFieldRepository.save(booking);
    }

    // Phương thức chấp nhận đặt sân
    public BookingField acceptBooking(Long bookingId) {
        BookingField booking = bookingFieldRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy lịch đặt sân với ID: " + bookingId));

        if (!BookingStatus.PENDING.equals(booking.getBookingStatus()))
        {
            throw new IllegalStateException("Không thể chấp nhận đặt trong trạng thái này.");
        }

        booking.setBookingStatus(BookingStatus.ACTING);

        return bookingFieldRepository.save(booking);
    }
    // Phương thức cập nhật trạng thái đã thanh toán
    public void isPay(Long bookingId) {
        BookingField booking = bookingFieldRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy lịch đặt sân với ID: " + bookingId));

        if (BookingStatus.CANCELLED.equals(booking.getBookingStatus()) || booking.getIsPay())
        {
            throw new IllegalStateException("Đã thanh toán hoặc trạng thái booking không hợp lệ.");
        }

        booking.setIsPay(true);

        bookingFieldRepository.save(booking);
    }

    //Thống kê
    public List<BookingStatisticsDTO> getBookingStatistics() {
        List<BookingStatisticsDTO> stats = new ArrayList<>();

        // Tổng số lượt đặt sân theo trạng thái
        List<Object[]> statusStats = bookingFieldRepository.countBookingsByStatus();
        for (Object[] row : statusStats) {
            BookingStatisticsDTO dto = new BookingStatisticsDTO();
            dto.setStatus(row[0].toString());
            dto.setCount((Long) row[1]);
            stats.add(dto);
        }

        // Doanh thu
        List<Object[]> revenueStats = bookingFieldRepository.calculateRevenue();
        if (!revenueStats.isEmpty()) {
            Object[] row = revenueStats.get(0);
            Double paidRevenue = row[0] != null ? ((Number) row[0]).doubleValue() : 0.0;
            Double unpaidRevenue = row[1] != null ? ((Number) row[1]).doubleValue() : 0.0;

            BookingStatisticsDTO revenueDto = new BookingStatisticsDTO();
            revenueDto.setPaidRevenue(paidRevenue);
            revenueDto.setUnpaidRevenue(unpaidRevenue);
            stats.add(revenueDto);
        }

        // Số lượng đặt sân và doanh thu theo sân bóng
        List<Object[]> fieldStats = bookingFieldRepository.countBookingsAndRevenueByField();
        for (Object[] row : fieldStats) {
            BookingStatisticsDTO dto = new BookingStatisticsDTO();
            dto.setFieldId((Long) row[0]);
            dto.setFieldBookingCount((Long) row[1]);
            dto.setFieldRevenue((Double) row[2]);
            stats.add(dto);
        }

        return stats;
    }

    //Thống kê doanh thu 7 ngày gần nhất
    public List<BookingField> getRevenueForLast7Days(BookingStatus status) {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        return bookingFieldRepository.findRevenueForLast7Days(sevenDaysAgo, status);
    }
}
