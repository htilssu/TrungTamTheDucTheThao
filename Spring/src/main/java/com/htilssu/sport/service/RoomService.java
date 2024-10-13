package com.htilssu.sport.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.htilssu.sport.data.models.Room;
import com.htilssu.sport.repositories.RoomRepository;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }
}
