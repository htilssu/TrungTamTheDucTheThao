package com.htilssu.sport.data.dtos;

import java.io.Serializable;

/**
 * DTO for {@link com.htilssu.sport.data.models.EquipmentType}
 */
public record EquipmentTypeDto(
        Long id,
        String name
) implements Serializable {
}
