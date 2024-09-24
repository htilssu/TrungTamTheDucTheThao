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

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody @Valid AuthData authData) {
        // Check email tồn tại
        User user = userRepository.findByEmail(authData.getEmail());
        if (user == null) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Email không tồn tại trong hệ thống!"));
        }

        // Tạo token bảo mật
        String token = UUID.randomUUID().toString();

        // Lưu token vào database
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setEmail(authData.getEmail());
        passwordResetToken.setToken(token);
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusMinutes(15)); // Token hết hạn sau 15 phút
        passwordResetTokenRepository.save(passwordResetToken);

        // Gửi email với đường link chứa token
        String resetLink = "http://yourfrontend.com/reset-password?token=" + token;
        emailService.sendResetLink(authData.getEmail(), resetLink);

        return ResponseEntity.ok()
                .body(new ResponseMessage("Link đặt lại mật khẩu đã được gửi đến email của bạn!"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody @Valid ResetPasswordData resetPasswordData) {
        // Tìm token trong database
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(resetPasswordData.getToken());

        if (passwordResetToken == null || passwordResetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Token không hợp lệ hoặc đã hết hạn!"));
        }

        // Cập nhật mật khẩu
        User user = userRepository.findByEmail(passwordResetToken.getEmail());
        if (user == null) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Người dùng không tồn tại!"));
        }

        String encodedPassword = passwordEncoder.encode(resetPasswordData.getNewPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);

        // Xóa token sau khi dùng
        passwordResetTokenRepository.delete(passwordResetToken);

        return ResponseEntity.ok()
                .body(new ResponseMessage("Mật khẩu đã được đổi thành công!"));
    }
}
