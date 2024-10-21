package com.htilssu.sport.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.htilssu.sport.service.ForgotPasswordService;

@RestController
@RequestMapping("/api/users")
public class ForgotPasswordController {

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody String email) {
        String response = forgotPasswordService.requestVerificationCode(email);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-code")
    public ResponseEntity<String> verifyCode(@RequestParam String email, @RequestParam String code) {
        boolean isValid = forgotPasswordService.verifyCode(email, code);
        if (isValid) {
            return ResponseEntity.ok("Mã xác minh thành công. Bạn có thể đổi mật khẩu.");
        } else {
            return ResponseEntity.badRequest().body("Mã xác minh không hợp lệ hoặc đã hết hạn.");
        }
    }
}