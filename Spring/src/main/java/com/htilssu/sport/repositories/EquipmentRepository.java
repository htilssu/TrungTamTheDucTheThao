package com.htilssu.sport.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.htilssu.sport.data.models.Equipment;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
}
