package com.htilssu.sport;

import com.htilssu.sport.dto.AuthData;
import com.htilssu.sport.dto.ResetPasswordData;
import com.htilssu.sport.dto.ResponseMessage;
import com.htilssu.sport.entity.User;
import com.htilssu.sport.entity.VerificationCode;
import com.htilssu.sport.repository.UserRepository;
import com.htilssu.sport.repository.VerificationCodeRepository;
import com.htilssu.sport.service.EmailService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class ForgotPasswordController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final VerificationCodeRepository verificationCodeRepository;

    private final Map<String, Long> verificationTimestamps = new HashMap<>(); //<email, timestamp>
    private final Map<String, Integer> failedAttempts = new HashMap<>(); // <email, failed fill>

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody @Valid AuthData authData) {
        //Check email exists
        User user = userRepository.findByEmail(authData.getEmail());
        if (user == null) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Email không tồn tại trong hệ thống!"));
        }

        long currentTime = System.currentTimeMillis();
        // Delay send to new code
        if (verificationTimestamps.containsKey(authData.getEmail())) {
            long lastRequestTime = verificationTimestamps.get(authData.getEmail());
            if ((currentTime - lastRequestTime) < 60000) {
                return ResponseEntity.badRequest()
                        .body(new ResponseMessage("Bạn phải chờ ít nhất 1 phút trước khi yêu cầu mã mới!"));
            }
        }

        // Create new verify code
        String verificationCode = String.format("%05d", new SecureRandom().nextInt(100000));

        // Save
        VerificationCode code = new VerificationCode();
        code.setEmail(authData.getEmail());
        code.setCode(verificationCode);
        code.setCreatedAt(LocalDateTime.now());
        verificationCodeRepository.save(code);

        verificationTimestamps.put(authData.getEmail(), currentTime);

        // Send code to email
        emailService.sendVerificationCode(authData.getEmail(), verificationCode);

        //Success
        return ResponseEntity.ok()
                .body(new ResponseMessage("Mã xác thực đã được gửi tới email của bạn!"));
    }

    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestParam String email, @RequestParam String code) {
        // Find code
        VerificationCode savedCode = verificationCodeRepository.findByEmailAndCode(email, code);

        // Check expired code (1p)
        if (savedCode != null) { 
            if (savedCode.getCreatedAt().isBefore(LocalDateTime.now().minusMinutes(1))) {
                return ResponseEntity.badRequest()
                        .body(new ResponseMessage("Mã xác thực đã hết hạn!"));
            }
            return ResponseEntity.ok()
                    .body(new ResponseMessage("Mã xác thực chính xác, bạn có thể đổi mật khẩu!"));
        } else { // No more 3 times
            failedAttempts.put(email, failedAttempts.getOrDefault(email, 0) + 1);
            if (failedAttempts.get(email) >= 3) {
                return ResponseEntity.badRequest()
                        .body(new ResponseMessage("Bạn đã nhập sai mã xác thực quá nhiều lần. Vui lòng thử lại sau."));
            }
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Mã xác thực không đúng!"));
        }
    }

    
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody @Valid ResetPasswordData resetPasswordData) {
        String email = resetPasswordData.getEmail();
        String code = resetPasswordData.getCode();
        
        // Check verify code
        VerificationCode verificationCode = verificationCodeRepository.findByEmailAndCode(email, code);
        User user = userRepository.findByEmail(email);
        
        if (user == null || verificationCode == null) {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Mã xác thực không hợp lệ!"));
        }

        //  Update new pass
        String codingPassword = passwordEncoder.encode(resetPasswordData.getNewPassword());
        user.setPassword(codingPassword);
        userRepository.save(user);

        return ResponseEntity.ok()
                .body(new ResponseMessage("Mật khẩu đã được đổi thành công!"));
    }
}
