package com.htilssu.sport.data.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RoleAssignRequestDto {

    @NotNull(message = "userId is required")
    private Long userId;
    @NotNull(message = "roleId is required")
    private Long roleId;
}
