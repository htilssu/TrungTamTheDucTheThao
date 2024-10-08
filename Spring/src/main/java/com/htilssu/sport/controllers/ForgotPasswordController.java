package com.htilssu.sport.controllers;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.htilssu.sport.data.models.Account;
import com.htilssu.sport.data.models.AuthData;
import com.htilssu.sport.data.models.PasswordResetToken;
import com.htilssu.sport.data.models.ResetPasswordData;
import com.htilssu.sport.exceptions.EmailService;
import com.htilssu.sport.exceptions.ResponseHandler;
import com.htilssu.sport.reponsitories.AccountRepository;
import com.htilssu.sport.reponsitories.PasswordResetTokenRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class ForgotPasswordController {

    private final AccountRepository accountRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public ForgotPasswordController(EmailService emailService, PasswordEncoder passwordEncoder,
            PasswordResetTokenRepository passwordResetTokenRepository, AccountRepository accountRepository) {
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.accountRepository = accountRepository;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody @Valid AuthData authData) {
        Optional<Account> userNameAuth = accountRepository.findByEmail(authData.getEmail());
        if (userNameAuth.isEmpty()) {
            return ResponseHandler.createResponse("Email không tồn tại trong hệ thống!", HttpStatus.BAD_REQUEST);
        }

        String token = UUID.randomUUID().toString();

        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setEmail(authData.getEmail());
        passwordResetToken.setToken(token);
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusMinutes(15));
        passwordResetTokenRepository.save(passwordResetToken);

        String resetLink = frontendUrl + "/reset-password?token=" + token;
        emailService.sendResetLink(authData.getEmail(), resetLink);

        return ResponseHandler.createResponse("Link đặt lại mật khẩu đã được gửi đến email của bạn!", HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody @Valid ResetPasswordData resetPasswordData) {
        Optional<PasswordResetToken> optionalPasswordResetToken = passwordResetTokenRepository
                .findByToken(resetPasswordData.getToken());

        if (optionalPasswordResetToken.isEmpty()
                || optionalPasswordResetToken.get().getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseHandler.createResponse("Token không hợp lệ hoặc đã hết hạn!", HttpStatus.BAD_REQUEST);
        }

        PasswordResetToken passwordResetToken = optionalPasswordResetToken.get();

        Optional<Account> userNameAuth = accountRepository.findByEmail(passwordResetToken.getEmail());
        if (userNameAuth.isEmpty()) {
            return ResponseHandler.createResponse("Người dùng không tồn tại!", HttpStatus.BAD_REQUEST);
        }

        Account account  = userNameAuth.get();
        String encodedPassword = passwordEncoder.encode(resetPasswordData.getNewPassword());
        account.setPassword(encodedPassword);
        accountRepository.save(account);

        passwordResetTokenRepository.delete(passwordResetToken);

        return ResponseHandler.createResponse("Mật khẩu đã được đổi thành công!", HttpStatus.OK);
    }
}
