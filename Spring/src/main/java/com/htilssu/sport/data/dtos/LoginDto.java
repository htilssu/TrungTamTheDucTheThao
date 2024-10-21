package com.htilssu.sport.data.dtos;

import java.io.Serializable;

public record LoginDto(String email, String password) implements Serializable {
}