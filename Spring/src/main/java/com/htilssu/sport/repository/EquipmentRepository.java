package com.htilssu.sport.repository;

import com.htilssu.sport.data.models.EquipmentType;
import org.springframework.data.jpa.repository.JpaRepository;

import com.htilssu.sport.data.models.Equipment;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    long countByEquipmentType(EquipmentType equipmentType);
}
