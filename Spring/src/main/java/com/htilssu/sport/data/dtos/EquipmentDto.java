package com.htilssu.sport.data.dtos;

import java.io.Serializable;
/**
 * DTO for {@link com.htilssu.sport.data.models.Equipment}
 */
public record EquipmentDto(Long id,EquipmentTypeDto equipmentType,String status,String image) implements Serializable {
}
