package com.htilssu.sport.service;

import com.htilssu.sport.data.models.RoomType;
import com.htilssu.sport.repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomTypeService {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    public List<RoomType> getAllRoomTypes() {
        return roomTypeRepository.findAll();
    }

    public RoomType getRoomTypeById(Long id) {
        Optional<RoomType> roomType = roomTypeRepository.findById(id);
        return roomType.orElse(null);
    }

    public RoomType addRoomType(RoomType roomType) {
        return roomTypeRepository.save(roomType);
    }

    public RoomType updateRoomType(Long id, RoomType roomTypeDetails) {
        RoomType roomType = getRoomTypeById(id);
        if (roomType != null) {
            roomType.setName(roomTypeDetails.getName());
            return roomTypeRepository.save(roomType);
        }
        return null;
    }

    public boolean deleteRoomType(Long id) {
        RoomType roomType = getRoomTypeById(id);
        if (roomType != null) {
            roomTypeRepository.delete(roomType);
            return true;
        }
        return false;
    }
}
