package com.htilssu.sport.data.dtos;

import java.io.Serializable;

/**
 * DTO for {@link com.htilssu.sport.data.models.Account}
 */
public record AccountDto(Long id, UserDto user, String email, String password)
        implements Serializable {
}
