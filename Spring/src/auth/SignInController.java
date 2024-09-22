package com.htilssu.sport;

import com.htilssu.sport.dto.AuthData;
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

    @PostMapping("/sign-in")
    public ResponseEntity<?> signin(@RequestBody AuthData authData) {
        // Check null input
        if (authData.getUsername() == null || authData.getPassword() == null) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Tài khoản mật khẩu không được để trống!"));
        }

        // Find user
        User user = userRepository.findByUserName(authData.getUsername());

        // Check user exists
        if (user == null) {
            return ResponseEntity.status(401)
                    .body(new ResponseMessage("Tài khoản không tồn tại. Vui lòng nhập lại!"));
        }

        // Check password
        if (passwordEncoder.matches(authData.getPassword(), user.getPassword())) {  //input pass == coding pass(database)
            // token
            String token = JwtUtil.generateToken(user); 
            return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + token) //token => client
                    .body(new ResponseMessage("Đăng nhập tài khoản thành công!"));
        } else {
            return ResponseEntity.status(401)
                    .body(new ResponseMessage("Mật khẩu nhập không đúng"));
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Đăng xuất thành công!");
    }
}
