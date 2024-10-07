package com.htilssu.sport.data.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class AuthData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Tùy thuộc vào cơ sở dữ liệu của bạn
    private Long id;

    @NotBlank(message = "Tên người dùng là bắt buộc")
    @Size(min = 3, max = 50, message = "Tên người dùng phải từ 3 đến 50 ký tự")
    private String username;

    @NotBlank(message = "Email là bắt buộc")
    @Email(message = "Email phải hợp lệ")
    private String email;

    @NotBlank(message = "Mật khẩu là bắt buộc")
    @Size(min = 8, message = "Mật khẩu phải có ít nhất 8 ký tự")
    private String password;

    public void clearPassword() {
        this.password = null;
    }

    public AuthData() {

    }
}
