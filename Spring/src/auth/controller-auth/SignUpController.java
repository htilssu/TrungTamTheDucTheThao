package com.htilssu.sport;

import com.htilssu.sport.dto.ResponseMessage;
import com.htilssu.sport.dto.SignUpData;
import com.htilssu.sport.entity.User;
import com.htilssu.sport.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SignUpController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(SignUpController.class);

    public SignUpController(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signup(@RequestBody SignUpData authData) {
        // Check if username exists
        if (userRepository.existsByUserName(authData.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Tên tài khoản đã tồn tại!"));
        }

        // Check if email exists
        if (userRepository.existsEmail(authData.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Email đã được đăng ký!"));
        }

        // Encode password
        String encodedPassword = passwordEncoder.encode(authData.getPassword());

        // Create a new user
        User newUser = new User();
        newUser.setUserName(authData.getUsername());
        newUser.setPassword(encodedPassword);
        newUser.setEmail(authData.getEmail());

        try {
            // Save user to database
            userRepository.save(newUser);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ResponseMessage("Lỗi: Không thể tạo tài khoản do xung đột dữ liệu."));
        } catch (Exception e) {
            logger.error("Đã xảy ra lỗi khi lưu tài khoản mới", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessage("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau."));
        }

        // Success
        return ResponseEntity.ok()
                .body(new ResponseMessage("Đăng ký thành công!"));
    }
}
