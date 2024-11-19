package com.htilssu.sport.repository;

import com.htilssu.sport.data.models.FootballField;
import com.htilssu.sport.data.models.PricingField;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PricingFieldRepository extends JpaRepository<PricingField, Long> {
    List<PricingField> findByFootballField(FootballField footballField);
}
