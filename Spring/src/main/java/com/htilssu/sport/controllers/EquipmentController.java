    package com.htilssu.sport.controllers;

    import java.util.List;
    import java.util.stream.Collectors;

    import com.htilssu.sport.data.dtos.EquipmentDto;
    import com.htilssu.sport.data.dtos.EquipmentTypeDto;
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
                            equipment.getImage()))
                    .collect(Collectors.toList());
        }

        @GetMapping("/{id}")
        public ResponseEntity<EquipmentDto> getEquipmentById(@PathVariable Long id) {
            return equipmentService.findById(id)
                    .map(equipment -> new EquipmentDto(
                            equipment.getId(),
                            new EquipmentTypeDto(equipment.getEquipmentType().getId(), equipment.getEquipmentType().getName(), equipment.getEquipmentType().getAmount()),
                            equipment.getStatus(),
                            equipment.getImage()))
                    .map(ResponseEntity::ok)
                    .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }

        @PostMapping
        public ResponseEntity<EquipmentDto> createEquipment(@RequestBody Equipment equipment) {
            Equipment createdEquipment = equipmentService.save(equipment);
            EquipmentDto equipmentDto = new EquipmentDto(
                    createdEquipment.getId(),
                    new EquipmentTypeDto(createdEquipment.getEquipmentType().getId(), createdEquipment.getEquipmentType().getName(), createdEquipment.getEquipmentType().getAmount()),
                    createdEquipment.getStatus(),
                    createdEquipment.getImage());
            return ResponseEntity.status(HttpStatus.CREATED).body(equipmentDto);
        }

        @PutMapping("/{id}")
        public ResponseEntity<EquipmentDto> updateEquipment(@PathVariable Long id, @RequestBody Equipment equipment) {
            return equipmentService.update(id, equipment)
                    .map(updatedEquipment -> new EquipmentDto(
                            updatedEquipment.getId(),
                            new EquipmentTypeDto(updatedEquipment.getEquipmentType().getId(), updatedEquipment.getEquipmentType().getName(), updatedEquipment.getEquipmentType().getAmount()),
                            updatedEquipment.getStatus(),
                            updatedEquipment.getImage()))
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
