package com.htilssu.sport.data.dtos;

import java.io.Serializable;

/**
 * DTO for {@link com.htilssu.sport.data.models.Coach}
 */
public record CoachDto(Long id, String name, String description, Integer experience,
        String phoneNumber) implements Serializable {

    // Các phương thức tùy chỉnh có thể thêm vào nếu cần, ví dụ phương thức để
    // chuyển đổi từ Entity sang DTO
}
