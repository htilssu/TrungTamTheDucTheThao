    package com.htilssu.sport.data.models;

    import jakarta.persistence.*;
    import jakarta.validation.constraints.Email;
    import jakarta.validation.constraints.NotBlank;
    import lombok.Getter;
    import lombok.Setter;

    @Getter
    @Setter
    @Entity
    @Table(name = "account", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
    public class Account {

        @Id
        @Column(name = "id", nullable = false)
        private Long id;

        @MapsId
        @OneToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "id", nullable = false)
        private User user;

        @NotBlank(message = "Email không được để trống")
        @Email(message = "Email không đúng định dạng")
        @Column(name = "email", nullable = false, unique = true, updatable = false) // Thêm ràng buộc unique
        private String email;
        
        @NotBlank(message = "Mật khẩu không được để trống")
        @Column(name = "password", nullable = false)
        private String password;

    }