package com.htilssu.sport.controllers;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.htilssu.sport.data.Util.JwtUtil;
import com.htilssu.sport.data.models.AuthData;
import com.htilssu.sport.exceptions.AuthResponse;
import com.htilssu.sport.exceptions.ResponseHandler;
import com.htilssu.sport.reponsitories.UserRepository;

@RestController
@RequestMapping("/api")
public class SignInController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public SignInController(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> login(@RequestBody AuthData authData) {
        if (authData.getUsername() == null || authData.getPassword() == null) {
            return ResponseHandler.createResponse("Tài khoản hoặc mật khẩu không được để trống!",
                    HttpStatus.BAD_REQUEST);
        }

        Optional<AuthData> userNameAuth = userRepository.findByUserName(authData.getUsername());

        if (!userNameAuth.isPresent()
                || !passwordEncoder.matches(authData.getPassword(), userNameAuth.get().getPassword())) {
            return ResponseHandler.createResponse("Tài khoản hoặc mật khẩu không chính xác", HttpStatus.UNAUTHORIZED);
        }

        authData.clearPassword();

        String token = JwtUtil.generateToken(userNameAuth.get());
        long expirationTimeMillis = JwtUtil.getExpirationTimeMillis(token);

        AuthResponse authResponse = new AuthResponse("Đăng nhập tài khoản thành công!", expirationTimeMillis);

        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + token) // token => client
                .body(authResponse);
    }
}