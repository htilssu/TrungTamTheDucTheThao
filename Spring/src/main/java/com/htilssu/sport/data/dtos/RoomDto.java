    package com.htilssu.sport.data.dtos;


    import java.io.Serializable;

    /**
     * DTO for {@link com.htilssu.sport.data.models.Room}
     */
    public record RoomDto(Long id, Integer capacity, String name, Integer floor, String building,
                          RoomTypeDto RoomType)
            implements Serializable {

    }