package com.htilssu.sport.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.htilssu.sport.data.models.Equipment;
import com.htilssu.sport.data.models.EquipmentType;
import com.htilssu.sport.repository.EquipmentRepository;
import com.htilssu.sport.repository.EquipmentTypeRepository;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private EquipmentTypeRepository equipmentTypeRepository;

    public List<Equipment> findAll() {
        return equipmentRepository.findAll();
    }

    public Optional<Equipment> findById(Long id) {
        return equipmentRepository.findById(id);
    }

    public Equipment save(Equipment equipment) {
        EquipmentType equipmentType = equipmentTypeRepository.findById(equipment.getEquipmentType().getId())
                .orElseThrow(() -> new IllegalArgumentException("Loại thiết bị không tồn tại"));
        return equipmentRepository.save(equipment);
    }

    public Optional<Equipment> update(Long id, Equipment equipment) {
        if (equipmentRepository.existsById(id)) {
            equipment.setId(id);
            return Optional.of(equipmentRepository.save(equipment));
        } else {
            return Optional.empty();
        }
    }

    public boolean delete(Long id) {
        if (equipmentRepository.existsById(id)) {
            equipmentRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
