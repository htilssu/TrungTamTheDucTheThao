package com.htilssu.sport.controllers;

import java.util.List;
import java.util.stream.Collectors; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.htilssu.sport.data.dtos.RoomDto;
import com.htilssu.sport.data.dtos.RoomTypeDto;
import com.htilssu.sport.data.models.Room;
import com.htilssu.sport.data.models.RoomType;
import com.htilssu.sport.repositories.RoomTypeRepository;
import com.htilssu.sport.services.RoomService;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @GetMapping
    public List<RoomDto> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        return rooms.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{roomid}")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable("roomid") Long id) {
        Room room = roomService.getRoomById(id);
        if (room != null) {
            return ResponseEntity.ok(convertToDto(room));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<RoomDto> addRoom(@RequestBody Room room) {
        RoomType roomType = roomTypeRepository.findById(room.getIdRoomType().getId())
                .orElseThrow(() -> new RuntimeException("RoomType not found"));
        room.setIdRoomType(roomType);
        Room addedRoom = roomService.addRoom(room);
        return ResponseEntity.ok(convertToDto(addedRoom));
    }

    @PutMapping("/edit/{roomid}")
    public ResponseEntity<RoomDto> updateRoom(@PathVariable("roomid") Long id, @RequestBody Room roomDetails) {
        Room updatedRoom = roomService.updateRoom(id, roomDetails);
        if (updatedRoom != null) {
            return ResponseEntity.ok(convertToDto(updatedRoom));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{roomid}")
    public ResponseEntity<Void> deleteRoom(@PathVariable("{roomid}") Long id) {
        boolean isDeleted = roomService.deleteRoom(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private RoomDto convertToDto(Room room) {
        RoomType roomType = room.getIdRoomType();
        RoomTypeDto roomTypeDto = roomType != null ? new RoomTypeDto(roomType.getId(), roomType.getName()) : null;
        return new RoomDto(room.getId(), room.getCapacity(), room.getName(), room.getFloor(), room.getBuilding(),
                roomTypeDto);
    }
}
