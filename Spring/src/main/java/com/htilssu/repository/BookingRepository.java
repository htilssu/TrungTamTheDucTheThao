package com.htilssu.repository;

import com.htilssu.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Các phương thức truy vấn cơ bản đã được cung cấp bởi JpaRepository
}
