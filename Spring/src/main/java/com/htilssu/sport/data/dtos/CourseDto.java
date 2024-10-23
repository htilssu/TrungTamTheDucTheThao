package com.htilssu.sport.data.dtos;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * DTO cho {@link com.htilssu.sport.data.models.Course}
 */
public record CourseDto(Long id, String name, String description, Double price, LocalTime time,
        LocalDate startDate, LocalDate endDate, Short slot,
        CoachDto coach, RoomDto room, String thumbnail)
        implements Serializable {
}
