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

import com.htilssu.sport.data.dtos.RoomTypeDto;
import com.htilssu.sport.data.models.RoomType;
import com.htilssu.sport.services.RoomTypeService;

@RestController
@RequestMapping("/api/room-types")
public class RoomTypeController {

    @Autowired
    private RoomTypeService roomTypeService;

    @GetMapping
    public List<RoomTypeDto> getAllRoomTypes() {
        return roomTypeService.getAllRoomTypes().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{roomTypeId}")
    public ResponseEntity<RoomTypeDto> getRoomTypeById(@PathVariable("roomTypeId") Long id) {
        RoomType roomType = roomTypeService.getRoomTypeById(id);
        if (roomType != null) {
            return ResponseEntity.ok(convertToDto(roomType));
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<RoomTypeDto> createRoomType(@RequestBody RoomType roomType) {
        if (roomType.getName() == null || roomType.getName().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        RoomType newRoomType = roomTypeService.addRoomType(roomType);
        return ResponseEntity.status(201).body(convertToDto(newRoomType));
    }

    @PutMapping("/update/{roomTypeId}")
    public ResponseEntity<RoomTypeDto> updateRoomType(@PathVariable("roomTypeId") Long id,
            @RequestBody RoomType roomTypeDetails) {
        RoomType updatedRoomType = roomTypeService.updateRoomType(id, roomTypeDetails);
        if (updatedRoomType != null) {
            return ResponseEntity.ok(convertToDto(updatedRoomType));
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{roomTypeId}")
    public ResponseEntity<Void> deleteRoomType(@PathVariable("roomTypeId") Long id) {

        if (roomTypeService.deleteRoomType(id)) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    private RoomTypeDto convertToDto(RoomType roomType) {
        return new RoomTypeDto(roomType.getId(), roomType.getName());
    }
}
