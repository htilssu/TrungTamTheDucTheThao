package com.htilssu.sport.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.htilssu.sport.data.dtos.EquipmentTypeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.htilssu.sport.data.models.EquipmentType;
import com.htilssu.sport.repository.EquipmentTypeRepository;

@Service
public class EquipmentTypeService {

    @Autowired
    private EquipmentTypeRepository equipmentTypeRepository;

    public List<EquipmentTypeDto> findAll() {
        return equipmentTypeRepository.findAll()
                .stream()
                .map(equipmentType -> new EquipmentTypeDto(equipmentType.getId(), equipmentType.getName()))
                .collect(Collectors.toList());
    }

    public Optional<EquipmentType> findById(Long id) {
        return equipmentTypeRepository.findById(id);
    }

    public EquipmentType save(EquipmentType equipmentType) {
        return equipmentTypeRepository.save(equipmentType);
    }

    public Optional<EquipmentType> update(Long id, EquipmentType equipmentType) {
        if (equipmentTypeRepository.existsById(id)) {
            equipmentType.setId(id);
            return Optional.of(equipmentTypeRepository.save(equipmentType));
        } else {
            return Optional.empty();
        }
    }

    // Xóa loại thiết bị
    public boolean delete(Long id) {
        if (equipmentTypeRepository.existsById(id)) {
            equipmentTypeRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
