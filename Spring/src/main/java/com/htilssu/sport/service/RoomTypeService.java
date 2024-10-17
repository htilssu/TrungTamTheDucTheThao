package com.htilssu.sport.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.htilssu.sport.data.models.RoomType;
import com.htilssu.sport.reponsitories.RoomTypeRepository;

@Service
public class RoomTypeService {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    public List<RoomType> getAllRoomTypes() {
        return roomTypeRepository.findAll();
    }

    public RoomType createRoomType(RoomType roomType) {
        return roomTypeRepository.save(roomType);
    }
}
