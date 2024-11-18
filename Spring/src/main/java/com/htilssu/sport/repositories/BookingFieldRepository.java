package com.htilssu.sport.repositories;

import com.htilssu.sport.data.models.BookingField;
import com.htilssu.sport.data.models.FootballField;
import com.htilssu.sport.data.models.User;
import com.htilssu.sport.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public interface BookingFieldRepository extends JpaRepository<BookingField, Long> {
    List<BookingField> findByFootballFieldAndStartTimeBetween(FootballField field, Timestamp startTime, Timestamp endTime);
    List<BookingField> findByFootballField(FootballField footballField);
    List<BookingField> findByCustomer(User user);

    // Thống kê tổng số lượng đặt sân theo trạng thái
    @Query("SELECT b.bookingStatus, COUNT(b) FROM BookingField b GROUP BY b.bookingStatus")
    List<Object[]> countBookingsByStatus();

    // Thống kê tổng doanh thu (đã thanh toán và chưa thanh toán)
    @Query("SELECT " +
            "SUM(CASE WHEN b.isPay = TRUE THEN b.totalAmount ELSE 0 END) AS paidRevenue, " +
            "SUM(CASE WHEN b.isPay = FALSE THEN b.totalAmount ELSE 0 END) AS unpaidRevenue " +
            "FROM BookingField b")
    List<Object[]> calculateRevenue();

    // Thống kê tổng số lượt đặt sân và doanh thu theo sân bóng
    @Query("SELECT b.footballField.id, COUNT(b), SUM(b.totalAmount) FROM BookingField b GROUP BY b.footballField.id")
    List<Object[]> countBookingsAndRevenueByField();

    // Thống kê số lượng đặt sân theo ngày
    @Query("SELECT DATE(b.createdAt), COUNT(b), SUM(b.totalAmount) FROM BookingField b GROUP BY DATE(b.createdAt)")
    List<Object[]> countBookingsByDate();

    // Thống kê doanh thu 7 ngày gần nhất
    @Query("SELECT b FROM BookingField b WHERE b.startTime >= :sevenDaysAgo AND b.bookingStatus = :status")
    List<BookingField> findRevenueForLast7Days(@Param("sevenDaysAgo") LocalDateTime sevenDaysAgo, @Param("status") BookingStatus status);

}
