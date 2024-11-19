package com.htilssu.sport.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.htilssu.sport.data.models.Room;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    public Optional<Room> findById(Long id);
}
