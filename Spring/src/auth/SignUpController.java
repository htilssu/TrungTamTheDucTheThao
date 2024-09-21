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
    public ResponseEntity<?> signup(@RequestBody AuthData authData) {
        // Check username exists
        if (userRepository.existsByUserName(authData.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Tên tài khoản đăng kí đã tồn tại!"));
        }

        // input pass => coding pass
        String codingPassword = passwordEncoder.encode(authData.getPassword());

        // New user
        User newUser = new User();
        newUser.setUserName(authData.getUsername());
        newUser.setPassword(codingPassword);
        ///==<<

        // Save on database
        userRepository.save(newUser);

        //
        return ResponseEntity.ok()
                .body(new ResponseMessage("Đăng kí thành công!"));
    }
}