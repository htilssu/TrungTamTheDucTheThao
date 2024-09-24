package com.htilssu.sport;

import com.htilssu.sport.dto.AuthData;
import com.htilssu.sport.dto.AuthResponse; 
import com.htilssu.sport.dto.ResponseMessage;
import com.htilssu.sport.entity.User;
import com.htilssu.sport.repository.UserRepository;
import com.htilssu.sport.security.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
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
        // Check input null
        if (authData.getUsername() == null || authData.getPassword() == null) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Tài khoản hoặc mật khẩu không được để trống!"));
        }

        // Find user
        User user = userRepository.findByUserName(authData.getUsername());

        // Check user and password
        if (user == null || !passwordEncoder.matches(authData.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401)
                    .body(new ResponseMessage("Tài khoản hoặc mật khẩu không chính xác"));
        }

        // Clear password into memories
        authData.clearPassword();

        // Create token
        String token = JwtUtil.generateToken(user);
        long expirationTimeMillis = JwtUtil.getExpirationTimeMillis(token); // Take exp time token

        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + token) // token => client
                .body(new AuthResponse("Đăng nhập tài khoản thành công!", expirationTimeMillis));
    }
}
