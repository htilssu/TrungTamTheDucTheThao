package com.htilssu.sport;

import com.htilssu.sport.dto.ResponseMessage;
import com.htilssu.sport.entity.User;
import com.htilssu.sport.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class ForgotPasswordController {

    private final UserRepository userRepository;
    private final EmailService emailService;

    private final Map<String, String> verificationCodes = new HashMap<>(); //<key, value> <email, verify code>

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody AuthData authData) {
        // Check email exists
        User user = userRepository.findByEmail(authData.getEmail());
        if (user == null) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Email không tồn tại trong hệ thống!"));
        }
        //Create verify code
        String verificationCode = String.format("%5d", new Random().nextInt(99999));
        //Save code to email
        userRepository.put(authData.getEmail(), verificationCode);
        //Send code
        emailService.sendVerificationCode(authData.getEmail(), verificationCode);
        //Success
        return userRepository.ok()
                .body(new ResponseMessage("Mã xác thực đã được gửi tới email của bạn!"));
    }

    //service
    @Service
    public class EmailService {
        public void sendVerificationCode(String email, String code) {
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Mã xác thực đặt lại mật khẩu của bạn");
            message.setText("Mã xác thực của bạn là: " + code);
            mailSender.send(message);
        }
    }
}
