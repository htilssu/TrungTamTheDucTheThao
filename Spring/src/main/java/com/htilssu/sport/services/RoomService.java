package com.htilssu.sport.services;

import com.htilssu.sport.data.models.Room;
import com.htilssu.sport.repositories.*;

import lombok.*;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor

@Service
public class RoomService {

    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room getRoomById(Long id) {
        Optional<Room> room = roomRepository.findById(id);
        return room.orElse(null);
    }

    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room room) {
        if (roomRepository.existsById(id)) {
            room.setId(id);
            return roomRepository.save(room);
        }
        return null;
    }

    public boolean deleteRoom(Long id) {
        if (roomRepository.existsById(id)) {
            roomRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
