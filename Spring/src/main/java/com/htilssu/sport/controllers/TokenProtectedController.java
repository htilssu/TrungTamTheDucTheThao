package com.htilssu.sport.controllers;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.htilssu.sport.data.models.Account;
import com.htilssu.sport.data.util.JwtUtil;
import com.htilssu.sport.repositories.AccountRepository;

public class TokenProtectedController {
    private final AccountRepository accountRepository;

    public TokenProtectedController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @GetMapping("/token-protected")
    public ResponseEntity<?> getProtectedData(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Quên hay sai Auth header.");
        }

        String token = authHeader.substring(7); 
        if (JwtUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token đã hết hạn");
        }

        String email = JwtUtil.getEmailFromToken(token);

        Optional<Account> userOptional = accountRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Người dùng không tồn tại");
        }

        return ResponseEntity.ok(email);
    }
}
