package com.htilssu.sport.repositories;

import com.htilssu.sport.data.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Các phương thức truy vấn cơ bản đã được cung cấp bởi JpaRepository
}
