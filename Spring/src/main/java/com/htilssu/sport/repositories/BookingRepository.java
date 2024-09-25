package com.htilssu.sport.repositories;

import com.htilssu.sport.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Các phương thức truy vấn cơ bản đã được cung cấp bởi JpaRepository
}
