package com.htilssu.sport.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.htilssu.sport.data.models.EquipmentType;

public interface EquipmentTypeRepository extends JpaRepository<EquipmentType, Long> {
}
