package com.htilssu.sport.data.dtos;

import com.htilssu.sport.data.models.Coach;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * DTO for {@link com.htilssu.sport.data.models.Course}
 */
// public record CourseDto(
// Long id,
// String name,
// String description,
// Double price,
// String time,
// String startDate,
// String endDate,
// Short slot,
// CoachDto Coach,
// RoomDto Room,
// String thumbnail) implements Serializable {
// }
public record CourseDto(
        Long id,
        String name,
        String description,
        Double price,
        String time,
        String startDate,
        String endDate,
        Short slot,
        Long idCoach, // Chỉ giữ ID của Coach
        Long idRoom, // Chỉ giữ ID của Room
        String thumbnail) implements Serializable {
}
