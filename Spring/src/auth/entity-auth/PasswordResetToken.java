package com.htilssu.sport.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
@ToString(exclude = "token")
public class PasswordResetToken {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "Email không đúng định dạng")
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true, length = 36)
    private String token;

    @Column(nullable = false)
    private LocalDateTime expiryDate;

    // Static method to create a token with a default expiry time
    public static PasswordResetToken createToken(String email, String token, int expiryTimeInMinutes) {
        return PasswordResetToken.builder()
                .email(email)
                .token(token)
                .expiryDate(LocalDateTime.now().plusMinutes(expiryTimeInMinutes))
                .build();
    }

    // Method to check if the token has expired
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(this.expiryDate);
    }
}
