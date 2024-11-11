package com.htilssu.sport.controllers;

import com.htilssu.sport.data.models.BookingField;
import com.htilssu.sport.data.dtos.BookingFieldDTO;
import com.htilssu.sport.data.dtos.ErrorResponse; // Import lớp ErrorResponse
import com.htilssu.sport.services.BookingFieldService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/v1/booking-field")
//@CrossOrigin(origins = "*")  //miền nào sẽ thực hiện yêu cầu đến endpoint này
//@PreAuthorize("isAuthenticated()") //quyền truy cập
public class BookingFieldController {
    @Autowired
    private BookingFieldService bookingFieldService;

    // Tạo booking
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingFieldDTO booking) {
        try {
            BookingField createdBooking = bookingFieldService.createBooking(booking);
            return ResponseEntity.ok(createdBooking);
        } catch (IllegalArgumentException e) {
            // 400 BAD REQUEST: Tham số không hợp lệ
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            // 500 INTERNAL SERVER ERROR: Lỗi không xác định
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllBookings() {
        try {
            List<BookingField> bookings = bookingFieldService.getAllBookings();
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/available-times/{fieldId}")
    public ResponseEntity<?> getAvailableTimes(@PathVariable Long fieldId, @RequestParam("date") String date) {
        try {
            // Kiểm tra định dạng ngày
            LocalDate localDate = LocalDate.parse(date);

            // Gọi service để lấy khung giờ có sẵn
            Map<String, List<String>> availableTimes = bookingFieldService.getAvailableTimes(fieldId, localDate);
            return ResponseEntity.ok(availableTimes);

        } catch (DateTimeParseException e) {
            // 400 BAD REQUEST: Định dạng ngày không hợp lệ
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Định dạng ngày không hợp lệ. Vui lòng sử dụng định dạng yyyy-MM-dd."));
        } catch (IllegalArgumentException e) {
            // 404 NOT FOUND: Sân không tồn tại
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            // 500 INTERNAL SERVER ERROR: Lỗi không xác định
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Có lỗi xảy ra. Vui lòng thử lại sau."));
        }
    }

    // Endpoint lấy tất cả booking của một sân
    @GetMapping("/field/{fieldId}")
    public ResponseEntity<?> getBookingsByField(@PathVariable Long fieldId) {
        try {
            List<BookingField> bookings = bookingFieldService.getBookingsByField(fieldId);
            return ResponseEntity.ok(bookings);
        } catch (IllegalArgumentException e) {
            // 400 BAD REQUEST: Tham số không hợp lệ
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            // 500 INTERNAL SERVER ERROR: Lỗi không xác định
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    // Endpoint lấy tất cả booking của một user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getBookingsByUser(@PathVariable Long userId) {
        try {
            List<BookingField> bookings = bookingFieldService.getBookingsByUser(userId);
            return ResponseEntity.ok(bookings);
        } catch (IllegalArgumentException e) {
            // 400 BAD REQUEST: Tham số không hợp lệ
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            // 500 INTERNAL SERVER ERROR: Lỗi không xác định
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updateBooking(@PathVariable Long id, @RequestBody BookingField booking) {
        try {
            BookingField updatedBooking = bookingFieldService.updateBooking(id, booking);
            return ResponseEntity.ok(updatedBooking);
        } catch (IllegalArgumentException e) {
            // 400 BAD REQUEST: Tham số không hợp lệ
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            // 500 INTERNAL SERVER ERROR: Lỗi không xác định
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        try {
            bookingFieldService.deleteBooking(id);
            return ResponseEntity.noContent().build(); // 204 NO CONTENT
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND) // 404 nếu không tìm thấy booking
                    .body(new ErrorResponse("Không tìm thấy booking với ID: " + id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    // Endpoint để hủy đặt sân
    @PostMapping("/{bookingId}/cancel")
    public ResponseEntity<String> cancelBooking(@PathVariable Long bookingId) {
        try {
            BookingField canceledBooking = bookingFieldService.cancelBooking(bookingId);
            return ResponseEntity.ok("Lịch đặt sân đã được hủy thành công với ID: " + canceledBooking.getId());
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
