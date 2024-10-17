package com.htilssu.sport.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.htilssu.sport.data.dtos.RoomDto;
import com.htilssu.sport.data.dtos.RoomTypeDto;
import com.htilssu.sport.data.models.Room;
import com.htilssu.sport.data.models.RoomType;
import com.htilssu.sport.reponsitories.RoomRepository;
import com.htilssu.sport.reponsitories.RoomTypeRepository;

import jakarta.transaction.Transactional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;
    
    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Transactional
    public Room createRoom(Room room) {
        if (room.getIdRoomType() != null && room.getIdRoomType().getId() != null) {
            RoomType roomType = roomTypeRepository.findById(room.getIdRoomType().getId())
                .orElseThrow(() -> new RuntimeException("RoomType không tồn tại"));
            room.setIdRoomType(roomType); 
        }
        
        return roomRepository.save(room); 
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public RoomDto convertToRoomDto(Room room) {
        RoomTypeDto roomTypeDto = new RoomTypeDto(room.getIdRoomType().getId(), room.getIdRoomType().getName());
        return new RoomDto(room.getId(), room.getCapacity(), room.getName(), room.getFloor(), room.getBuilding(), roomTypeDto);
    }
}
