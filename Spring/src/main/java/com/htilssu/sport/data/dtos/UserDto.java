package com.htilssu.sport.data.dtos;

import java.io.Serializable;

/**
 * DTO for {@link com.htilssu.sport.data.models.User}
 */

public record UserDto(Long id, String phoneNumber, String firstName, String lastName,
                      Boolean gender, String dob, String avatar) // Thêm avatar nếu cần
        implements Serializable {

}
