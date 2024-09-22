package com.htilssu.sport.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ResetPasswordData {
    @Email
    private String email;
    
    @NotBlank
    private String code;
    
    @NotBlank
    private String newPassword;
}
