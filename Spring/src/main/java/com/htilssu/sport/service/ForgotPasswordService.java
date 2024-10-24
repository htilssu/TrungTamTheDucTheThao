package com.htilssu.sport.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.htilssu.sport.data.models.Account;
import com.htilssu.sport.repositories.AccountRepository;

@Service
public class ForgotPasswordService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final Map<String, String> verificationCodes = new HashMap<>();
    private final Map<String, Long> lastSentTimes = new HashMap<>();
    private static final long RESEND_TIMEOUT = 60000;
    private static final long CODE_EXPIRY_TIMEOUT = 300000; 

    public String sendVerificationCode(String email) {
        if (accountRepository.existsByEmail(email)) {
            Long lastSentTime = lastSentTimes.get(email);
            if (lastSentTime != null && System.currentTimeMillis() - lastSentTime < RESEND_TIMEOUT) {
                return "Vui lòng đợi trước khi yêu cầu mã xác minh mới.";
            }

            String code = String.format("%05d", new Random().nextInt(100000));
            verificationCodes.put(email, code);
            lastSentTimes.put(email, System.currentTimeMillis());

            try {
                emailService.sendEmail(email, "Mã xác minh của bạn", "Mã xác minh của bạn là: " + code);
                return "Mã xác minh đã được gửi tới " + email;
            } catch (Exception e) {
                return "Đã xảy ra lỗi khi gửi email. Vui lòng thử lại.";
            }
        } else {
            return "Email không tồn tại.";
        }
    }

    public boolean verifyCode(String email, String code) {
        cleanUpExpiredCodes();
        String expectedCode = verificationCodes.get(email);
        return expectedCode != null && expectedCode.equals(code);
    }

    public Account resetPassword(String email, String code, String newPassword) {
        if (verifyCode(email, code)) {
            Account account = accountRepository.findByEmail(email).orElse(null);
            if (account != null) {
                account.setPassword(passwordEncoder.encode(newPassword));
                accountRepository.save(account);
                verificationCodes.remove(email);
                lastSentTimes.remove(email);
                return account;
            }
        }
        return null;
    }

    private void cleanUpExpiredCodes() {
        long currentTime = System.currentTimeMillis();
        verificationCodes.keySet().removeIf(email -> {
            Long sentTime = lastSentTimes.get(email);
            return sentTime != null && (currentTime - sentTime > CODE_EXPIRY_TIMEOUT);
        });
    }
}