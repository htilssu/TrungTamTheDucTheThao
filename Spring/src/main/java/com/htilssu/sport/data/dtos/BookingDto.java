package com.htilssu.sport.data.dtos;

import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.OffsetDateTime;

/**
 * DTO for {@link com.htilssu.sport.data.models.Booking}
 */
public record BookingDto(Long id, UserDto User, OffsetDateTime createdAt,
                         @NotNull OffsetDateTime bookingFrom, @NotNull OffsetDateTime bookingTo,
                         @NotNull RoomDto Room)
        implements Serializable {

}