package com.htilssu.sport;

import com.htilssu.sport.dto.AuthData;
import com.htilssu.sport.dto.ResetPasswordData;
import com.htilssu.sport.dto.ResponseMessage;
import com.htilssu.sport.entity.User;
import com.htilssu.sport.entity.PasswordResetToken;
import com.htilssu.sport.repository.UserRepository;
import com.htilssu.sport.repository.PasswordResetTokenRepository;
import com.htilssu.sport.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class ForgotPasswordController {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Value("${app.frontend.url}") // Inject the frontend URL
    private String frontendUrl;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody @Valid AuthData authData) {
        // Check email exists
        User user = userRepository.findByEmail(authData.getEmail());
        if (user == null) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Email không tồn tại trong hệ thống!"));
        }

        // Create token
        String token = UUID.randomUUID().toString();

        // Save token to database
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setEmail(authData.getEmail());
        passwordResetToken.setToken(token);
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusMinutes(15)); // Token exp 15m
        passwordResetTokenRepository.save(passwordResetToken);

        // Send token to email
        String resetLink = frontendUrl + "/reset-password?token=" + token; // User URL graphic
        emailService.sendResetLink(authData.getEmail(), resetLink);

        return ResponseEntity.ok()
                .body(new ResponseMessage("Link đặt lại mật khẩu đã được gửi đến email của bạn!"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody @Valid ResetPasswordData resetPasswordData) {
        // Find token into database
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(resetPasswordData.getToken());

        if (passwordResetToken == null || passwordResetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Token không hợp lệ hoặc đã hết hạn!"));
        }

        // Update password
        User user = userRepository.findByEmail(passwordResetToken.getEmail());
        if (user == null) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Người dùng không tồn tại!"));
        }

        String encodedPassword = passwordEncoder.encode(resetPasswordData.getNewPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);

        // Delete token
        passwordResetTokenRepository.delete(passwordResetToken);

        return ResponseEntity.ok()
                .body(new ResponseMessage("Mật khẩu đã được đổi thành công!"));
    }
}
