package com.htilssu.sport.reponsitories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.htilssu.sport.data.models.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, UUID> {
}
