package com.htilssu.sport.service;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.htilssu.sport.data.dtos.AccountDto;
import com.htilssu.sport.data.dtos.RegistrationDto;
import com.htilssu.sport.data.mappers.AccountMapper;
import com.htilssu.sport.data.models.Account;
import com.htilssu.sport.data.models.User;
import com.htilssu.sport.repositories.AccountRepository;
import com.htilssu.sport.repositories.UserRepository;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountMapper accountMapper;

    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
    private static final String PASSWORD_REGEX = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$";



    public AccountDto registerUser(RegistrationDto registrationDto) {
        Optional<Account> existingAccount = accountRepository.findByEmail(registrationDto.email());
        if (existingAccount.isPresent()) {
            throw new IllegalArgumentException("Email đã được sử dụng");
        }

        if (!isValidEmail(registrationDto.email())) {
            throw new IllegalArgumentException("Định dạng email không hợp lệ");
        }

        if (registrationDto.password() == null || registrationDto.password().isEmpty()) {
            throw new IllegalArgumentException("Mật khẩu không được để trống");
        }

        if (!isValidPassword(registrationDto.password())) {
            throw new IllegalArgumentException("Mật khẩu phải có ít nhất 6 ký tự, bao gồm ít nhất một chữ in hoa, một số, và một ký tự đặc biệt");
        }

        if (!registrationDto.password().equals(registrationDto.confirmPassword())) {
            throw new IllegalArgumentException("Mật khẩu và xác nhận mật khẩu không khớp");
        }

        User user = new User();
        user.setId(generateUserId());
        user.setPhoneNumber(registrationDto.user().phoneNumber());
        user.setFirstName(registrationDto.user().firstName());
        user.setLastName(registrationDto.user().lastName());
        user.setGender(registrationDto.user().gender());
        user.setDob(LocalDate.parse(registrationDto.user().dob()));

        User savedUser = userRepository.save(user);

        Account account = new Account();
        account.setUser(savedUser);
        account.setEmail(registrationDto.email());
        account.setPassword(passwordEncoder.encode(registrationDto.password()));

        Account savedAccount = accountRepository.save(account);

        return accountMapper.toDto(savedAccount);
    }

    private Long generateUserId() {
        return UUID.randomUUID().getMostSignificantBits();
    }

    private boolean isValidEmail(String email) {
        return Pattern.compile(EMAIL_REGEX).matcher(email).matches();
    }

    private boolean isValidPassword(String password) {
        return Pattern.compile(PASSWORD_REGEX).matcher(password).matches();
    }
}
