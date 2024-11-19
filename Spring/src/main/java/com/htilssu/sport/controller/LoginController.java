package com.htilssu.sport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.htilssu.sport.data.dtos.LoginDto;
import com.htilssu.sport.response.ApiResponse;
import com.htilssu.sport.service.LoginService;

@RestController
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/api/login")
    public ResponseEntity<ApiResponse> login(@RequestBody @Validated LoginDto loginDto) {
        String token = loginService.login(loginDto);
        if (token != null) {
            return ResponseEntity.ok(new ApiResponse("Đăng nhập thành công", token));
        } else {
            return ResponseEntity.status(401).body(new ApiResponse("Email hoặc mật khẩu không đúng", null));
        }
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(new ApiResponse(ex.getMessage(), null));
    }
}