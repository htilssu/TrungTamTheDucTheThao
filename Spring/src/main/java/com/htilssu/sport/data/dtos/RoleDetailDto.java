package com.htilssu.sport.data.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Collection;

/**
 * DTO for {@link com.htilssu.sport.data.models.Role}
 */
public record RoleDetailDto(Long id, String name, Collection<UserNotRoleDto> users)
        implements Serializable {

    /**
     * DTO for {@link com.htilssu.sport.data.models.User}
     */
    public record UserNotRoleDto(Long id,
                                 @Size(message = "Số điện thoại phải có 10 đến 13 chữ số", min = 10,
                                       max = 13) @Pattern(
                                         message = "Số điện thoại chỉ được chứa số",
                                         regexp = "\\d+") @NotBlank(
                                         message = "Số điện thoại không được để trống") String phoneNumber,
                                 @NotBlank(message = "Họ không được để trống") String firstName,
                                 @NotBlank(message = "Tên không được để trống") String lastName,
                                 Boolean gender,
                                 @Past(message = "Ngày sinh phải là một ngày trong quá khứ") String dob,
                                 String avatar)
            implements Serializable {

    }
}