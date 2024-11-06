package com.htilssu.sport.controllers;

import java.util.List;

import com.htilssu.sport.data.dtos.EquipmentTypeDto;
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

import com.htilssu.sport.data.models.EquipmentType;
import com.htilssu.sport.services.EquipmentTypeService;

@RestController
@RequestMapping("/api/equipment-types")
public class EquipmentTypeController {

    @Autowired
    private EquipmentTypeService equipmentTypeService;

    @GetMapping
    public List<EquipmentTypeDto> getAllEquipmentTypes() {
        return equipmentTypeService.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<EquipmentTypeDto> getEquipmentTypeById(@PathVariable Long id) {
        return equipmentTypeService.findById(id)
                .map(equipmentType -> ResponseEntity.ok(new EquipmentTypeDto(equipmentType.getId(), equipmentType.getName(), equipmentType.getAmount())))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @PostMapping
    public ResponseEntity<EquipmentTypeDto> createEquipmentType(@RequestBody EquipmentType equipmentType) {
        EquipmentType createdEquipmentType = equipmentTypeService.save(equipmentType);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new EquipmentTypeDto(createdEquipmentType.getId(), createdEquipmentType.getName(), createdEquipmentType.getAmount()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EquipmentTypeDto> updateEquipmentType(@PathVariable Long id, @RequestBody EquipmentType equipmentType) {
        return equipmentTypeService.update(id, equipmentType)
                .map(updatedEquipmentType -> ResponseEntity.ok(new EquipmentTypeDto(updatedEquipmentType.getId(), updatedEquipmentType.getName(), updatedEquipmentType.getAmount())))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipmentType(@PathVariable Long id) {
        if (equipmentTypeService.delete(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
