package com.htilssu.sport.data.dtos;

import java.io.Serializable;

public record RegistrationDto(UserDto user, String email, String password, String confirmPassword)
        implements Serializable {
}