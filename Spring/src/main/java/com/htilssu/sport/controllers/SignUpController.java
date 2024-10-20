package com.htilssu.sport.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.htilssu.sport.data.dtos.AccountDto;
import com.htilssu.sport.data.models.Account;
import com.htilssu.sport.repositories.AccountRepository;

@RestController
@RequestMapping("/api")
public class SignUpController {

    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(SignUpController.class);

    public SignUpController(AccountRepository accountRepository, BCryptPasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signup(@RequestBody AccountDto accountDto) {
        if (accountRepository.existsByEmail(accountDto.email())) {
            logger.warn("Email {} already exists", accountDto.email());
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Create Account
        Account account = new Account();
        account.setEmail(accountDto.email());
        account.setPassword(passwordEncoder.encode(accountDto.password()));
        account = accountRepository.save(account);

        logger.info("Account {} created successfully", account.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body("Account created successfully");
    }
}