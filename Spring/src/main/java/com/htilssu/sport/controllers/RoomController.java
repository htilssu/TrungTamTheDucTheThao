package com.htilssu.sport.controllers;

import java.util.List;

import org.hibernate.LazyInitializationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.htilssu.sport.data.dtos.RoomDto;
import com.htilssu.sport.data.models.Room;
import com.htilssu.sport.data.models.RoomType;
import com.htilssu.sport.service.RoomService;


@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody RoomDto roomDto) {
    try {
        Room room = convertToRoom(roomDto);
        Room newRoom = roomService.createRoom(room);
        return ResponseEntity.ok(roomService.convertToRoomDto(newRoom));
    } catch (LazyInitializationException lie) {
        return ResponseEntity.badRequest().body("Lỗi khởi tạo lazy: " + lie.getMessage());
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.badRequest().body("Lỗi khi tạo phòng: " + e.getMessage());
    }
}

    @GetMapping
    public List<RoomDto> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms(); 
        return rooms.stream().map(roomService::convertToRoomDto).toList();
    }

    private Room convertToRoom(RoomDto roomDto) {
        RoomType roomType = new RoomType();
        roomType.setId(roomDto.getRoomType().id());
        roomType.setName(roomDto.getRoomType().name());

        Room room = new Room();
        room.setId(roomDto.getId());
        room.setCapacity(roomDto.getCapacity());
        room.setName(roomDto.getName());
        room.setFloor(roomDto.getFloor());
        room.setBuilding(roomDto.getBuilding());
        room.setIdRoomType(roomType);

        return room;
    }
}
