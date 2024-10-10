package com.htilssu.sport.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {
    private String message;
    private long expirationTimeMillis; // Thời gian hết hạn token tính bằng mili giây
}
