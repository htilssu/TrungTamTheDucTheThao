package com.htilssu.sport.data.dtos;

import java.io.Serializable;

public record ResetPasswordDto(String email, String code, String newPassword) implements Serializable {
}