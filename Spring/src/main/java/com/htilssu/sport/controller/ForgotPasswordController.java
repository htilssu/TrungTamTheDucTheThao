package com.htilssu.sport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.htilssu.sport.data.dtos.ResetPasswordDto;
import com.htilssu.sport.data.models.Account;
import com.htilssu.sport.service.ForgotPasswordService;

@RestController
@RequestMapping("/api/users")
public class ForgotPasswordController {

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ResetPasswordDto request) {
        try {
            String response = forgotPasswordService.sendVerificationCode(request.email());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/verify-code")
    public ResponseEntity<String> verifyCode(@RequestParam String email, @RequestParam String code) {
        try {
            boolean isValid = forgotPasswordService.verifyCode(email, code);
            if (isValid) {
                return ResponseEntity.ok("Mã xác minh thành công. Bạn có thể đổi mật khẩu.");
            } else {
                return ResponseEntity.badRequest().body("Mã xác minh không hợp lệ hoặc đã hết hạn.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordDto request) {
        try {
            Account account = forgotPasswordService.resetPassword(request.email(), request.code(),
                    request.newPassword());
            if (account != null) {
                return ResponseEntity.ok("Mật khẩu đã được cập nhật thành công.");
            } else {
                return ResponseEntity.badRequest().body("Mã xác minh không hợp lệ hoặc đã hết hạn.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}