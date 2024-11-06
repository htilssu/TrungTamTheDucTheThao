package com.htilssu.sport.controllers;

import com.htilssu.sport.data.dtos.RoomDto;
import com.htilssu.sport.data.dtos.RoomTypeDto;
import com.htilssu.sport.data.models.Room;
import com.htilssu.sport.data.models.RoomType;
import com.htilssu.sport.repositories.RoomTypeRepository;
import com.htilssu.sport.services.RoomService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rooms")
@AllArgsConstructor
public class RoomController {

    private RoomService roomService;
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
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<RoomDto> addRoom(@RequestBody Room room) {
        RoomType roomType = roomTypeRepository.findById(room.getRoomType().getId())
                .orElseThrow(() -> new RuntimeException("RoomType not found"));
        room.setRoomType(roomType);
        Room addedRoom = roomService.addRoom(room);
        return ResponseEntity.ok(convertToDto(addedRoom));
    }

    @PutMapping("/edit/{roomid}")
    public ResponseEntity<RoomDto> updateRoom(@PathVariable("roomid") Long id,
            @RequestBody Room roomDetails) {
        Room updatedRoom = roomService.updateRoom(id, roomDetails);
        if (updatedRoom != null) {
            return ResponseEntity.ok(convertToDto(updatedRoom));
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{roomid}")
    public ResponseEntity<Void> deleteRoom(@PathVariable("roomid") Long id) {
        boolean isDeleted = roomService.deleteRoom(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    private RoomDto convertToDto(Room room) {
        RoomType roomType = room.getRoomType();
        RoomTypeDto roomTypeDto = roomType != null ? new RoomTypeDto(roomType.getId(),
                roomType.getName()) : null;
        return new RoomDto(room.getId(), room.getCapacity(), room.getName(), room.getFloor(),
                room.getBuilding(),
                roomTypeDto);
    }
}
