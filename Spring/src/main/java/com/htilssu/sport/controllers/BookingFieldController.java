package com.htilssu.sport.controllers;

import com.htilssu.sport.data.models.BookingField;
import com.htilssu.sport.services.BookingFieldService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/v1/bookings")
@CrossOrigin(origins = "*")  // Đảm bảo rằng frontend (React) có thể gọi API
@PreAuthorize("permitAll()")
public class BookingFieldController {

    private final BookingFieldService service;

    @GetMapping
    public ResponseEntity<List<BookingField>> getAllBookings() {
        List<BookingField> bookings = service.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    @PostMapping
    public ResponseEntity<BookingField> createBooking(@RequestBody BookingField booking) {
        BookingField result = service.createBooking(booking);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}