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

import com.htilssu.sport.data.dtos.EquipmentTypeDto;
import com.htilssu.sport.data.dtos.ErrorResponse;
import com.htilssu.sport.data.models.EquipmentType;
import com.htilssu.sport.service.EquipmentTypeService;

@RestController
@RequestMapping("/api/equipment-types")
public class EquipmentTypeController {

    @Autowired
    private EquipmentTypeService equipmentTypeService;

    @GetMapping
    public List<EquipmentTypeDto> getAllEquipmentTypes() {
        return equipmentTypeService.findAll()
                .stream()
                .map(equipmentType -> new EquipmentTypeDto(equipmentType.id(), equipmentType.name()))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EquipmentTypeDto> getEquipmentTypeById(@PathVariable Long id) {
        return equipmentTypeService.findById(id)
                .map(equipmentType -> ResponseEntity.ok(new EquipmentTypeDto(equipmentType.getId(), equipmentType.getName())))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<?> createEquipmentType(@RequestBody EquipmentTypeDto equipmentTypeDto) {
        try {
            var equipmentType = new EquipmentType();
            equipmentType.setName(equipmentTypeDto.name()); 

            var createdEquipmentType = equipmentTypeService.save(equipmentType);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new EquipmentTypeDto(createdEquipmentType.getId(), createdEquipmentType.getName()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Tên loại thiết bị không hợp lệ hoặc đã tồn tại"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEquipmentType(@PathVariable Long id, @RequestBody EquipmentTypeDto equipmentTypeDto) {
        var equipmentType = new EquipmentType();
        equipmentType.setName(equipmentTypeDto.name());

        return equipmentTypeService.update(id, equipmentType)
                .map(updatedEquipmentType -> ResponseEntity.ok(new EquipmentTypeDto(updatedEquipmentType.getId(), updatedEquipmentType.getName())))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEquipmentType(@PathVariable Long id) {
        boolean isDeleted = equipmentTypeService.delete(id);
        if (isDeleted) {
            return ResponseEntity.ok(new ErrorResponse("Loại thiết bị đã được xóa thành công"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Không tìm thấy loại thiết bị với ID " + id + " để xóa"));
        }
    }
}
