package com.htilssu.sport.services;

import com.htilssu.sport.data.models.BookingField;
import com.htilssu.sport.repositories.BookingFieldRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BookingFieldService {

    private BookingFieldRepository repository;

    public List<BookingField> getAllBookings() {
        return repository.findAll();
    }
    //tao lich dat san
    public BookingField createBooking(BookingField booking) {
        return repository.save(booking);
    }
}

