package com.htilssu.sport.data.models;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ResetPasswordData {
    @NotBlank
    private String token;

    @NotBlank
    private String newPassword;
}
