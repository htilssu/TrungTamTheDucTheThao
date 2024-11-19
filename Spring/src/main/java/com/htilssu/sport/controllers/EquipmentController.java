package com.htilssu.sport.controllers;

import java.util.List;
import java.util.stream.Collectors;

import com.htilssu.sport.data.dtos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.htilssu.sport.data.models.Equipment;
import com.htilssu.sport.services.EquipmentService;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {

    @Autowired
    private EquipmentService equipmentService;

    @GetMapping
    public List<EquipmentDto> getAllEquipment() {
        return equipmentService.findAll()
                .stream()
                .map(equipment -> new EquipmentDto(
                        equipment.getId(),
                        new EquipmentTypeDto(equipment.getEquipmentType().getId(), equipment.getEquipmentType().getName(), equipment.getEquipmentType().getAmount()),
                        equipment.getStatus(),
                        equipment.getImage(),
                        new RoomDto(
                                equipment.getRoom().getId(),
                                equipment.getRoom().getCapacity(),
                                equipment.getRoom().getName(),
                                equipment.getRoom().getFloor(),
                                equipment.getRoom().getBuilding(),
                                new RoomTypeDto(equipment.getRoom().getRoomType().getId(), equipment.getRoom().getRoomType().getName())
                        )))
                .collect(Collectors.toList());
    }
    @GetMapping("/{id}")
    public ResponseEntity<EquipmentDto> getEquipmentById(@PathVariable Long id) {
        return equipmentService.findById(id)
                .map(equipment -> {
                    return new EquipmentDto(
                            equipment.getId(),
                            new EquipmentTypeDto(equipment.getEquipmentType().getId(), equipment.getEquipmentType().getName(), equipment.getEquipmentType().getAmount()),
                            equipment.getStatus(),
                            equipment.getImage(),
                            new RoomDto(
                                    equipment.getRoom().getId(),
                                    equipment.getRoom().getCapacity(),
                                    equipment.getRoom().getName(),
                                    equipment.getRoom().getFloor(),
                                    equipment.getRoom().getBuilding(),
                                    new RoomTypeDto(equipment.getRoom().getRoomType().getId(), equipment.getRoom().getRoomType().getName())
                            )
                    );
                })
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }



    @PostMapping
    public ResponseEntity<?> createEquipment(@RequestBody Equipment equipment) {
        try {
            Equipment createdEquipment = equipmentService.save(equipment);
            EquipmentDto equipmentDto = new EquipmentDto(
                    createdEquipment.getId(),
                    new EquipmentTypeDto(createdEquipment.getEquipmentType().getId(), createdEquipment.getEquipmentType().getName(), createdEquipment.getEquipmentType().getAmount()),
                    createdEquipment.getStatus(),
                    createdEquipment.getImage(),
                    new RoomDto(
                            createdEquipment.getRoom().getId(),
                            createdEquipment.getRoom().getCapacity(),
                            createdEquipment.getRoom().getName(),
                            createdEquipment.getRoom().getFloor(),
                            createdEquipment.getRoom().getBuilding(),
                            new RoomTypeDto(
                                    createdEquipment.getRoom().getRoomType().getId(),
                                    createdEquipment.getRoom().getRoomType().getName()
                            )
            ));
            return ResponseEntity.status(HttpStatus.CREATED).body(equipmentDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<EquipmentDto> updateEquipment(@PathVariable Long id, @RequestBody Equipment equipment) {
        return equipmentService.update(id, equipment)
                .map(updatedEquipment -> new EquipmentDto(
                        updatedEquipment.getId(),
                        new EquipmentTypeDto(updatedEquipment.getEquipmentType().getId(), updatedEquipment.getEquipmentType().getName(), updatedEquipment.getEquipmentType().getAmount()),
                        updatedEquipment.getStatus(),
                        updatedEquipment.getImage(),
                        new RoomDto(
                                updatedEquipment.getRoom().getId(),
                                updatedEquipment.getRoom().getCapacity(),
                                updatedEquipment.getRoom().getName(),
                                updatedEquipment.getRoom().getFloor(),
                                updatedEquipment.getRoom().getBuilding(),
                                new RoomTypeDto(
                                        updatedEquipment.getRoom().getRoomType().getId(),
                                        updatedEquipment.getRoom().getRoomType().getName()
                                ))))
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
        if (equipmentService.delete(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
