package com.htilssu.sport.controllers;

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

import com.htilssu.sport.data.models.Account;
import com.htilssu.sport.data.models.AuthData;
import com.htilssu.sport.exceptions.ResponseHandler;
import com.htilssu.sport.reponsitories.AccountRepository;
import com.htilssu.sport.reponsitories.UserRepository;

@RestController
@RequestMapping("/api")
public class SignUpController {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(SignUpController.class);

    public SignUpController(AccountRepository accountRepository, UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signup(@RequestBody AuthData authData) {

        if (accountRepository.existsByEmail(authData.getEmail())) {
            return ResponseHandler.createResponse("Email đã được sử dụng!", HttpStatus.BAD_REQUEST);
        }

        String encodedPassword = passwordEncoder.encode(authData.getPassword());

        try {

            Account newAccount = new Account();
            newAccount.setEmail(authData.getEmail());
            newAccount.setPassword(encodedPassword);
       
            newAccount.setUser(null);

            accountRepository.save(newAccount);

            accountRepository.save(newAccount);

            logger.info("Tài khoản đã được tạo thành công cho email: {}", authData.getEmail());
        } catch (DataIntegrityViolationException e) {
            return ResponseHandler.createResponse("Lỗi: Không thể tạo tài khoản do xung đột dữ liệu.", HttpStatus.CONFLICT);
        } catch (Exception e) {
            logger.error("Đã xảy ra lỗi khi lưu tài khoản mới", e);
            return ResponseHandler.createResponse("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseHandler.createResponse("Đăng kí tài khoản thành công", HttpStatus.OK);
    }
}