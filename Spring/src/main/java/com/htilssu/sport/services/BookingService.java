package com.htilssu.sport.services;

import com.htilssu.sport.models.Booking;
import com.htilssu.sport.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // Lưu thông tin đặt sân
    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    // Lấy tất cả các booking
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

}
