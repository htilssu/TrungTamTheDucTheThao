package com.htilssu.sport.controllers;

import com.htilssu.sport.models.Booking;
import com.htilssu.sport.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/bookings")
@CrossOrigin(origins = "*")  // Đảm bảo rằng frontend (React) có thể gọi API
@PreAuthorize("permitAll()") //(khong bat xac thuc)
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // API để lưu thông tin đặt sân
    //check
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking savedBooking = bookingService.saveBooking(booking);
        return ResponseEntity.ok(savedBooking);
    }

    // API để lấy danh sách các booking
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

/*
    @GetMapping("/${id}")
    public ResponseEntity<Void> getBookingById(@PathVariable("id") int id) {

    }*/
}
