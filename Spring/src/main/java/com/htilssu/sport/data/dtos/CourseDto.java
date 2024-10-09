package com.htilssu.sport.data.dtos;

import com.htilssu.sport.data.models.Coach;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * DTO for {@link com.htilssu.sport.data.models.Course}
 */
public record CourseDto(Long id, String name, String description, Double price, LocalTime time,
                        LocalDate startDate, LocalDate endDate, Short slot,
                        com.htilssu.sport.data.models.Coach Coach, RoomDto Room, String thumbnail)
        implements Serializable {

}