package com.htilssu.sport.data.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

public record LoginDto(@NotNull(message = "Không được để trống") @Email(
        message = "Email không đúng định dạng") String email,
                       @NotNull(message = "Không được để trống password") String password)
        implements Serializable {

}