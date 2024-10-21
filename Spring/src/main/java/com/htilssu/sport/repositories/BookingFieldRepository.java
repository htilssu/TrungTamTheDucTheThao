package com.htilssu.sport.repositories;

import com.htilssu.sport.data.models.BookingField;
import com.htilssu.sport.data.models.FootballField;
import com.htilssu.sport.data.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;

public interface BookingFieldRepository extends JpaRepository<BookingField, Long> {
    List<BookingField> findByFootballFieldAndStartTimeBetween(FootballField field, Timestamp startTime, Timestamp endTime);
    List<BookingField> findByFootballField(FootballField footballField);
    List<BookingField> findByCustomer(User user);
}
