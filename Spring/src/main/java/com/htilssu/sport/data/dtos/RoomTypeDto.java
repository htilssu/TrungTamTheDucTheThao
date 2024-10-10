package com.htilssu.sport.data.dtos;

import java.io.Serializable;

/**
 * DTO for {@link com.htilssu.sport.data.models.RoomType}
 */
public record RoomTypeDto(Long id, String name) implements Serializable {

}