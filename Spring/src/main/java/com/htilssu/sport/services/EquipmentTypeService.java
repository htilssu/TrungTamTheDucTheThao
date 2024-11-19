package com.htilssu.sport.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.htilssu.sport.data.dtos.EquipmentTypeDto;
import jakarta.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.htilssu.sport.data.models.EquipmentType;
import com.htilssu.sport.repositories.EquipmentTypeRepository;

@Service
public class EquipmentTypeService {

    @Autowired
    private EquipmentTypeRepository equipmentTypeRepository;

    public List<EquipmentTypeDto> findAll() {
        return equipmentTypeRepository.findAll()
                .stream()
                .map(equipmentType -> new EquipmentTypeDto(equipmentType.getId(), equipmentType.getName(), equipmentType.getAmount()))
                .collect(Collectors.toList());
    }

    public Optional<EquipmentType> findById(Long id) {
        return equipmentTypeRepository.findById(id);
    }

    public EquipmentType save(EquipmentType equipmentType) {
        validateEquipmentType(equipmentType);
        return equipmentTypeRepository.save(equipmentType);
    }
    // Hàm kiểm tra số lượng
    private void validateEquipmentType(EquipmentType equipmentType) {
        if (equipmentType.getAmount() < 0) {
            throw new IllegalArgumentException("Số lượng không được âm");  // Ném lỗi với thông báo phù hợp
        }
    }

    public Optional<EquipmentType> update(Long id, EquipmentType equipmentType) {
        if (equipmentTypeRepository.existsById(id)) {
            equipmentType.setId(id);
            return Optional.of(equipmentTypeRepository.save(equipmentType));
        } else {
            return Optional.empty();
        }
    }



    public boolean delete(Long id) {
        if (equipmentTypeRepository.existsById(id)) {
            equipmentTypeRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
