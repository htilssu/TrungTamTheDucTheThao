package com.htilssu.sport.data.dtos;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link com.htilssu.sport.data.models.User}
 */
public record UserDto(Long id, String phoneNumber, String firstName, String lastName,
                      Boolean gender, LocalDate dob)
        implements Serializable {

}