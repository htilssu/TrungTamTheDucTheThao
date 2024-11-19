package com.htilssu.sport.repository;

import com.htilssu.sport.data.models.FootballField;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FootballFieldRepository extends JpaRepository<FootballField, Long> {
    List<FootballField> findByFieldType(String fieldType);
}
