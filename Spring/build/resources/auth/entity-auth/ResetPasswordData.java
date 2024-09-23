package com.htilssu.sport.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ResetPasswordData {
    @NotBlank
    private String token;

    @NotBlank
    private String newPassword;
}
