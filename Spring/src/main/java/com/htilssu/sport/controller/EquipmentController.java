package com.htilssu.sport.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.htilssu.sport.data.dtos.EquipmentDto;
import com.htilssu.sport.data.dtos.EquipmentTypeDto;
import com.htilssu.sport.data.dtos.ErrorResponse;
import com.htilssu.sport.data.models.Equipment;
import com.htilssu.sport.service.EquipmentService;

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
                        new EquipmentTypeDto(
                                equipment.getEquipmentType().getId(),
                                equipment.getEquipmentType().getName()
                        ),
                        equipment.getName(),
                        equipment.getAmount(),
                        equipment.getPrice(),
                        equipment.getStatus(),
                        equipment.getImage()
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EquipmentDto> getEquipmentById(@PathVariable Long id) {
        return equipmentService.findById(id)
                .map(equipment -> new EquipmentDto(
                        equipment.getId(),
                        new EquipmentTypeDto(
                                equipment.getEquipmentType().getId(),
                                equipment.getEquipmentType().getName()
                        ),
                        equipment.getName(),
                        equipment.getAmount(),
                        equipment.getPrice(),
                        equipment.getStatus(),
                        equipment.getImage()
                ))
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<?> createEquipment(@RequestBody Equipment equipment) {
        try {
            Equipment createdEquipment = equipmentService.save(equipment);
            EquipmentDto equipmentDto = new EquipmentDto(
                    createdEquipment.getId(),
                    new EquipmentTypeDto(
                            createdEquipment.getEquipmentType().getId(),
                            createdEquipment.getEquipmentType().getName()
                    ),
                    createdEquipment.getName(),
                    createdEquipment.getAmount(),
                    createdEquipment.getPrice(),
                    createdEquipment.getStatus(),
                    createdEquipment.getImage()
            );
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
                        new EquipmentTypeDto(
                                updatedEquipment.getEquipmentType().getId(),
                                updatedEquipment.getEquipmentType().getName()
                        ),
                        updatedEquipment.getName(),
                        updatedEquipment.getAmount(),
                        updatedEquipment.getPrice(),
                        updatedEquipment.getStatus(),
                        updatedEquipment.getImage()
                ))
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ErrorResponse> deleteEquipment(@PathVariable Long id) {
        boolean isDeleted = equipmentService.delete(id);
        if (isDeleted) {
            return ResponseEntity.ok(new ErrorResponse("Loại thiết bị đã được xóa thành công"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
