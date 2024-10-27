package com.htilssu.sport.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.htilssu.sport.data.models.RoomType;

public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {
}
