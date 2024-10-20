// package com.htilssu.sport.controllers;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.htilssu.sport.data.dtos.LoginDto;
// import com.htilssu.sport.service.LoginService;

// import io.swagger.v3.oas.annotations.parameters.RequestBody;

// @RestController
// public class LoginController {

//     private final LoginService loginService;

//     @Autowired
//     public LoginController(LoginService loginService) {
//         this.loginService = loginService;
//     }

//     @PostMapping("/api/login")
//     public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
//         boolean isAuthenticated = loginService.login(loginDto);
//         if (isAuthenticated) {
//             return ResponseEntity.ok("Đăng nhập thành công");
//         } else {
//             return ResponseEntity.status(401).body("Email hoặc mật khẩu không đúng");
//         }
//     }
// }