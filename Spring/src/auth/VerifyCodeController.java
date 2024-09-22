package com.htilssu.sport;

import com.htilssu.sport.dto.ResponseMessage;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class VerifyCodeController {

    private final Map<String, String> verificationCodes; //<key, value> <=> <email, verify code>

    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestParam String email, @RequestParam String code) {
        // Check verify code
        String savedCode = verificationCodes.get(email);

        if (savedCode != null && savedCode.equals(code)) { //input code == sent code
            return ResponseEntity.ok()
                    .body(new ResponseMessage("Mã xác thực chính xác, bạn có thể đổi mật khẩu!"));
        } else {
            return ResponseEntity.badRequest()
                    .body(new ResponseMessage("Mã xác thực không đúng!"));
        }
    }
}
