
package com.htilssu.sport.data.models;

import com.htilssu.sport.validations.MinAge;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "\"user\"")
public class User {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_sequence", allocationSize = 1)
    private Long id;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 10, max = 13, message = "Số điện thoại phải có 10 đến 13 chữ số")
    @Pattern(regexp = "\\d+", message = "Số điện thoại chỉ được chứa số")
    @Column(name = "phone_number", length = 10, unique = true)
    private String phoneNumber;

    @NotBlank(message = "Họ không được để trống")
    @Column(name = "first_name")
    private String firstName;

    @NotBlank(message = "Tên không được để trống")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "gender", nullable = true)
    private Boolean gender = false;

    @Past(message = "Ngày sinh phải là một ngày trong quá khứ")
    @MinAge(message = "Người dùng phải từ 16 tuổi trở lên", value = 16)
    @Column(name = "dob", nullable = false)
    private LocalDate dob;

    @Column(name = "avatar")
    private String avatar = "";
}