package com.htilssu.sport;

import com.htilssu.sport.dto.ResponseMessage;
import com.htilssu.sport.dto.SignUpData;
import com.htilssu.sport.entity.User;
import com.htilssu.sport.repository.UserRepository;
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
public class SignUpController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signup(@RequestBody SignUpData authData) {
        // Check username exists
        if (userRepository.existsByUserName(authData.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Tên tài khoản đã tồn tại!"));
        }

        // Check email exists
        if (userRepository.existsEmail(authData.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Email đã được đăng ký!"));
        }

        // input pass => coding pass
        String codingPassword = passwordEncoder.encode(authData.getPassword());

        // Create new user
        User newUser = new User();
        newUser.setUserName(authData.getUsername());
        newUser.setPassword(codingPassword);
        newUser.setEmail(authData.getEmail());

        try {
            // Save user to database
            userRepository.save(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new ResponseMessage("Đăng ký không thành công!"));
        }
        //Success
        return ResponseEntity.ok()
                .body(new ResponseMessage("Đăng ký thành công!"));
    }
}
