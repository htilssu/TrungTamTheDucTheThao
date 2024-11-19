package com.htilssu.sport.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.htilssu.sport.data.models.Room;
public interface RoomRepository extends JpaRepository<Room, Long> {
}
